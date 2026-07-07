import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Sun, Moon, Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { data, updateData } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { header, theme } = data;

  const toggleDarkMode = () => {
    updateData('theme', (prev) => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  };

  const visibleLinks = (header?.navLinks || []).filter((link) => link.visible);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-heading font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
            {header?.logoAccent || '</>'}
          </div>
          <span className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-text-main group-hover:text-primary transition-colors">
            {header?.logoText || 'Portfolio'}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-bg-base/50 p-1.5 rounded-full border border-border-color">
          {visibleLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="px-4 py-2 rounded-full text-sm font-medium text-text-muted hover:text-text-main hover:bg-bg-card transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (Dark Mode Toggle + Hire Me CTA) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2.5 rounded-xl bg-bg-card border border-border-color text-text-muted hover:text-primary hover:border-primary transition-all duration-200 shadow-sm"
          >
            {theme?.darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>

          {header?.ctaText && (
            <a
              href={header?.ctaLink || '#contact'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm shadow-md hover:shadow-lg hover:opacity-95 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>{header?.ctaText}</span>
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-lg bg-bg-card border border-border-color text-text-muted"
          >
            {theme?.darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className="p-2.5 rounded-lg bg-bg-card border border-border-color text-text-main hover:text-primary"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-border-color animate-fadeIn">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {visibleLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl font-medium text-text-muted hover:text-text-main hover:bg-bg-base/80 transition-colors"
              >
                {link.label}
              </a>
            ))}

            {header?.ctaText && (
              <div className="pt-3">
                <a
                  href={header?.ctaLink || '#contact'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{header?.ctaText}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
