import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, 
  X, 
  Palette, 
  Sliders, 
  FileText, 
  Layers, 
  Briefcase, 
  Database, 
  Sparkles,
  CheckCircle2,
  Inbox,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  ExternalLink,
  ShieldCheck,
  Command,
  ChevronRight,
  Activity
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import AuthModal from './AuthModal';

import DashboardOverview from './tabs/DashboardOverview';
import ThemeEditor from './tabs/ThemeEditor';
import GeneralEditor from './tabs/GeneralEditor';
import HeroAboutEditor from './tabs/HeroAboutEditor';
import SkillsProjectsEditor from './tabs/SkillsProjectsEditor';
import ExperienceContactEditor from './tabs/ExperienceContactEditor';
import ConfigManager from './tabs/ConfigManager';
import MessagesTab from './tabs/MessagesTab';

const navCategories = [
  {
    title: 'Overview & Brand',
    items: [
      { id: 'overview', label: 'Dashboard Home', icon: LayoutDashboard },
      { id: 'theme', label: 'Theme & Styling', icon: Palette },
    ]
  },
  {
    title: 'Content & Sections',
    items: [
      { id: 'general', label: 'General & Navigation', icon: Sliders },
      { id: 'heroAbout', label: 'Hero & About Bio', icon: FileText },
      { id: 'skillsProjects', label: 'Skills & Projects', icon: Layers },
      { id: 'expContact', label: 'Experience & Contact', icon: Briefcase },
    ]
  },
  {
    title: 'System & Logs',
    items: [
      { id: 'messages', label: 'Contact Inbox', icon: Inbox },
      { id: 'config', label: 'Backup & Reset', icon: Database },
    ]
  }
];

const AdminModal = () => {
  const { isAdminOpen: isOpen, setIsAdminOpen: setIsOpen, isAuthenticated, user, logoutAdminUser } = usePortfolio();
  const [activeTab, setActiveTab] = useState('overview');
  const mainScrollRef = useRef(null);

  const toggleModal = () => setIsOpen(!isOpen);

  // Scroll back to top whenever activeTab changes
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // Keyboard shortcut listener: Ctrl+K / Cmd+K or Alt+S or Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Find current tab label & category for breadcrumbs
  let currentTabLabel = 'Dashboard Home';
  let currentCategoryTitle = 'Overview & Brand';
  navCategories.forEach((cat) => {
    const found = cat.items.find((item) => item.id === activeTab);
    if (found) {
      currentTabLabel = found.label;
      currentCategoryTitle = cat.title;
    }
  });

  return (
    <>
      {/* Floating Wise-Inspired Trigger Command Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleModal}
          className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-bold shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 border-2 border-white/20 animate-bounce-subtle"
          aria-label="Open Full-Page Wise Studio"
        >
          <div className="p-1 rounded-full bg-white/20 text-white">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
          </div>
          <span className="text-sm tracking-wide font-heading">Wise Portfolio Studio</span>
          
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/30 border border-white/15 text-[11px] font-mono font-normal">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>

          <span className="flex h-2.5 w-2.5 relative ml-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
        </button>
      </div>

      {/* Modal / Full-Page Panel Backdrop */}
      {isOpen && !isAuthenticated && <AuthModal />}
      
      {isOpen && isAuthenticated && (
        <div className="fixed inset-0 z-50 w-screen h-screen bg-bg-base flex flex-col md:flex-row overflow-hidden animate-fadeIn">
          
          {/* Wise Studio Sidebar */}
          <div className="w-full md:w-72 bg-bg-card/95 border-b md:border-b-0 md:border-r border-border-color flex flex-col justify-between shrink-0 shadow-xl relative z-20">
            
            {/* Sidebar Header */}
            <div className="p-5 border-b border-border-color flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h2 className="font-extrabold font-heading text-base text-text-main tracking-tight flex items-center gap-1.5">
                    <span>Wise Studio</span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Pro</span>
                  </h2>
                  <div className="text-[11px] font-semibold text-text-muted flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live Architecture</span>
                  </div>
                </div>
              </div>

              {/* Mobile Close Button */}
              <button
                onClick={toggleModal}
                className="md:hidden p-2 rounded-xl text-text-muted hover:text-text-main hover:bg-bg-base transition-colors"
                title="Close Studio"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Grouped Sidebar Navigation */}
            <nav className="p-4 space-y-6 overflow-y-auto max-h-[35vh] md:max-h-none md:flex-1">
              {navCategories.map((cat, catIndex) => (
                <div key={catIndex} className="space-y-1.5">
                  <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-text-muted/80 font-mono">
                    {cat.title}
                  </div>
                  
                  <div className="space-y-1">
                    {cat.items.map((tab) => {
                      const IconComp = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all text-left group ${
                            isActive
                              ? 'bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-transparent text-emerald-500 border-l-4 border-emerald-500 font-bold shadow-sm'
                              : 'text-text-muted hover:text-text-main hover:bg-bg-base'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <IconComp className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-500' : 'text-text-muted group-hover:text-primary'}`} />
                            <span className="truncate">{tab.label}</span>
                          </div>
                          {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Sidebar Footer / User Profile Card */}
            <div className="p-4 border-t border-border-color bg-bg-base/50">
              <div className="p-3.5 rounded-2xl bg-bg-card border border-border-color shadow-sm space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold text-xs flex items-center justify-center shrink-0 shadow">
                      {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-text-main truncate">
                        {user?.name || 'Administrator'}
                      </div>
                      <div className="text-[10px] text-text-muted truncate font-mono">
                        {user?.email || 'admin@portfolio.local'}
                      </div>
                    </div>
                  </div>

                  <span className="p-1 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0" title="Admin Verified">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                </div>

                <div className="pt-2 border-t border-border-color/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-500 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Auto-Save Active</span>
                  </div>

                  <button
                    onClick={logoutAdminUser}
                    title="Sign Out of Studio"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors text-[11px] font-bold"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Full-Page Main Content Area */}
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-bg-base/60 relative">
            
            {/* Topbar Header */}
            <header className="px-6 py-4 border-b border-border-color flex flex-wrap items-center justify-between gap-4 bg-bg-card/90 backdrop-blur-md shrink-0 shadow-sm z-10">
              
              {/* Breadcrumbs & Active Title */}
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="font-semibold text-text-muted hidden sm:inline">Wise Studio</span>
                <ChevronRight className="w-3.5 h-3.5 text-text-muted hidden sm:inline" />
                <span className="font-semibold text-text-muted">{currentCategoryTitle}</span>
                <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
                <span className="font-bold font-heading text-text-main text-base text-gradient">
                  {currentTabLabel}
                </span>
              </div>

              {/* Center Status Pill */}
              <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold shadow-inner">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>Zero-Latency Live Sync Active</span>
              </div>

              {/* Topbar Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    activeTab === 'overview'
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-bg-base border-border-color text-text-muted hover:text-text-main'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={toggleModal}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-emerald-500/30 flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>Exit Studio & Preview Live Site</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Scrollable Workspace Container */}
            <main ref={mainScrollRef} className="flex-1 overflow-y-auto p-6 sm:p-10">
              <div className="max-w-7xl mx-auto w-full">
                {activeTab === 'overview' && <DashboardOverview setActiveTab={setActiveTab} />}
                {activeTab === 'theme' && <ThemeEditor />}
                {activeTab === 'general' && <GeneralEditor />}
                {activeTab === 'heroAbout' && <HeroAboutEditor />}
                {activeTab === 'skillsProjects' && <SkillsProjectsEditor />}
                {activeTab === 'expContact' && <ExperienceContactEditor />}
                {activeTab === 'messages' && <MessagesTab />}
                {activeTab === 'config' && <ConfigManager />}
              </div>
            </main>

          </div>

        </div>
      )}
    </>
  );
};

export default AdminModal;
