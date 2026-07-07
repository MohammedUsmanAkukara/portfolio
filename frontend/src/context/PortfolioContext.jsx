import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { initialPortfolioData, colorPresets } from '../data/initialPortfolioData';
import api from '../services/api';

const PortfolioContext = createContext();

const STORAGE_KEY = 'custom_portfolio_config_v1';

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load configuration from localStorage:', e);
    }
    return initialPortfolioData;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const isInitialMount = useRef(true);

  // Auth State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('admin_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('admin_token'));

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const loginAdminUser = (authToken, userData) => {
    localStorage.setItem('admin_token', authToken);
    localStorage.setItem('admin_user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
    setIsAuthenticated(true);
    showToast(`Welcome back, ${userData?.name || 'Admin'}!`);
  };

  const logoutAdminUser = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    showToast('Logged out successfully.');
  };

  // Fetch initial portfolio configuration & verify auth token on mount
  useEffect(() => {
    const loadFromBackend = async () => {
      try {
        const res = await api.fetchPortfolioConfig();
        if (res.success && res.data) {
          setData(res.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
        }
      } catch (err) {
        console.warn('Backend API unreachable or offline. Using local storage / fallback data:', err.message);
      }
    };
    loadFromBackend();

    const verifyAuth = async () => {
      if (token) {
        try {
          const res = await api.fetchCurrentUser();
          if (res.success && res.data) {
            setUser(res.data);
            setIsAuthenticated(true);
          } else {
            logoutAdminUser();
          }
        } catch {
          // Silent fail or token invalid
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_user');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    };
    verifyAuth();
  }, []);

  // Sync state to localStorage & MongoDB whenever data changes (debounced)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        api.savePortfolioConfig(data).catch((err) => {
          console.warn('Failed to sync changes to MongoDB backend:', err.message);
        });
      }
    }, 1000); // 1s debounce to prevent API spam while typing

    return () => clearTimeout(timer);
  }, [data, isAuthenticated]);

  // Dynamically inject theme CSS variables & dark mode class
  useEffect(() => {
    const root = document.documentElement;
    const { primary, primaryHover, secondary, accent, darkMode, fontMain, fontHeading } = data.theme || {};

    if (primary) root.style.setProperty('--color-primary', primary);
    if (primaryHover) root.style.setProperty('--color-primary-hover', primaryHover);
    if (secondary) root.style.setProperty('--color-secondary', secondary);
    if (accent) root.style.setProperty('--color-accent', accent);
    if (fontMain) root.style.setProperty('--font-main', fontMain);
    if (fontHeading) root.style.setProperty('--font-heading', fontHeading);

    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [data.theme]);

  // General update function
  const updateData = (section, newSectionData) => {
    setData((prev) => ({
      ...prev,
      [section]: typeof newSectionData === 'function' ? newSectionData(prev[section]) : newSectionData,
    }));
  };

  // Preset theme color selector
  const applyColorPreset = (presetId) => {
    const preset = colorPresets.find((p) => p.id === presetId);
    if (preset) {
      setData((prev) => ({
        ...prev,
        theme: {
          ...prev.theme,
          preset: preset.id,
          primary: preset.primary,
          primaryHover: preset.primaryHover,
          secondary: preset.secondary,
          accent: preset.accent,
        },
      }));
      showToast(`Applied ${preset.name} theme!`);
    }
  };

  // Reset to default factory configuration
  const resetToDefault = async () => {
    if (window.confirm('Are you sure you want to reset all customizations to default? This cannot be undone unless you exported a backup.')) {
      try {
        await api.resetPortfolioConfig();
      } catch (e) {
        console.warn('Backend reset failed, resetting locally.');
      }
      setData(initialPortfolioData);
      localStorage.removeItem(STORAGE_KEY);
      showToast('All settings reset to default.');
    }
  };

  // Export current configuration as a JSON file
  const exportConfig = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-config-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Configuration exported successfully!');
  };

  // Import configuration from JSON string
  const importConfig = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.theme || !parsed.hero || !parsed.header) {
        throw new Error('Invalid portfolio configuration format.');
      }
      setData(parsed);
      showToast('Configuration imported successfully!');
      return true;
    } catch (e) {
      showToast(e.message || 'Failed to parse JSON file.', 'error');
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        applyColorPreset,
        resetToDefault,
        exportConfig,
        importConfig,
        isAdminOpen,
        setIsAdminOpen,
        showToast,
        notification,
        user,
        token,
        isAuthenticated,
        loginAdminUser,
        logoutAdminUser,
      }}
    >
      {children}
      {/* Global Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 animate-bounce ${
            notification.type === 'error'
              ? 'bg-rose-500/90 text-white border-rose-400'
              : 'bg-primary/90 text-white border-indigo-400'
          }`}
        >
          <span className="font-medium text-sm">{notification.message}</span>
        </div>
      )}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
