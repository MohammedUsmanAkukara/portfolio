import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Layout, Eye, EyeOff, Plus, Trash2, Globe, Sparkles, Navigation, ShieldCheck, CheckCircle2 } from 'lucide-react';

const GeneralEditor = () => {
  const { data, updateData } = usePortfolio();
  const { header, footer, sectionVisibility } = data || {};

  // Header Handlers
  const handleHeaderChange = (key, val) => {
    updateData('header', (prev) => ({ ...prev, [key]: val }));
  };

  const toggleNavLink = (id) => {
    updateData('header', (prev) => ({
      ...prev,
      navLinks: prev.navLinks.map((link) =>
        link.id === id ? { ...link, visible: !link.visible } : link
      ),
    }));
  };

  const updateNavLink = (id, field, val) => {
    updateData('header', (prev) => ({
      ...prev,
      navLinks: prev.navLinks.map((link) =>
        link.id === id ? { ...link, [field]: val } : link
      ),
    }));
  };

  const addNavLink = () => {
    const newId = `link-${Date.now()}`;
    updateData('header', (prev) => ({
      ...prev,
      navLinks: [
        ...prev.navLinks,
        { id: newId, label: 'New Link', href: '#section', visible: true },
      ],
    }));
  };

  const deleteNavLink = (id) => {
    updateData('header', (prev) => ({
      ...prev,
      navLinks: prev.navLinks.filter((link) => link.id !== id),
    }));
  };

  // Section Visibility Handlers
  const toggleSection = (sectionKey) => {
    updateData('sectionVisibility', (prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  // Footer Handlers
  const handleFooterChange = (key, val) => {
    updateData('footer', (prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      
      {/* Top Banner Guide */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-500 font-bold font-heading text-sm">
            <Navigation className="w-4 h-4" />
            <span>Navigation Architecture & Page Structure</span>
          </div>
          <p className="text-xs text-text-muted max-w-xl">
            Configure your brand identity, manage top bar menu links, and toggle visibility for core website sections.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-card border border-border-color text-xs font-mono font-semibold self-start sm:self-center shrink-0 shadow-sm text-text-main">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Real-Time Structure</span>
        </div>
      </div>

      {/* Header & Brand Settings */}
      <div className="p-6 sm:p-8 rounded-3xl bg-bg-card border border-border-color space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-heading text-text-main flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>Header Branding & Call-to-Action</span>
            </h3>
            <span className="text-xs text-text-muted">Set the logo name and main action button displayed in the navigation bar</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-text-main block">Logo Brand Name</span>
            <input
              type="text"
              value={header?.logoText || ''}
              onChange={(e) => handleHeaderChange('logoText', e.target.value)}
              placeholder="e.g. Alex Rivera"
              className="w-full px-4 py-3 rounded-2xl bg-bg-base border border-border-color text-text-main text-xs focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-text-main block">Logo Accent Highlight</span>
            <input
              type="text"
              value={header?.logoAccent || ''}
              onChange={(e) => handleHeaderChange('logoAccent', e.target.value)}
              placeholder="e.g. .DEV"
              className="w-full px-4 py-3 rounded-2xl bg-bg-base border border-border-color text-emerald-500 text-xs font-bold font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-text-main block">Navbar CTA Button Label</span>
            <input
              type="text"
              value={header?.ctaText || ''}
              onChange={(e) => handleHeaderChange('ctaText', e.target.value)}
              placeholder="e.g. Hire Me"
              className="w-full px-4 py-3 rounded-2xl bg-bg-base border border-border-color text-text-main text-xs focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-text-main block">CTA Button Target URL</span>
            <input
              type="text"
              value={header?.ctaLink || ''}
              onChange={(e) => handleHeaderChange('ctaLink', e.target.value)}
              placeholder="#contact or https://..."
              className="w-full px-4 py-3 rounded-2xl bg-bg-base border border-border-color text-text-main text-xs font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Navigation Links Manager */}
      <div className="p-6 sm:p-8 rounded-3xl bg-bg-card border border-border-color space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold font-heading text-text-main flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-500" />
              <span>Navigation Menu Links</span>
            </h3>
            <span className="text-xs text-text-muted">Reorder, rename, or toggle visibility of header navigation links</span>
          </div>

          <button
            onClick={addNavLink}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all text-xs font-bold shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Link</span>
          </button>
        </div>

        <div className="space-y-3">
          {(header?.navLinks || []).map((link) => (
            <div
              key={link.id}
              className={`p-4 rounded-2xl border transition-all flex flex-wrap items-center justify-between gap-3 ${
                link.visible
                  ? 'bg-bg-base border-border-color shadow-sm hover:border-primary/40'
                  : 'bg-bg-base/40 border-border-color/50 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                <button
                  onClick={() => toggleNavLink(link.id)}
                  title={link.visible ? 'Hide Link from Navbar' : 'Show Link in Navbar'}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    link.visible
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-500 shadow-sm'
                      : 'bg-bg-card border-border-color text-text-muted'
                  }`}
                >
                  {link.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => updateNavLink(link.id, 'label', e.target.value)}
                    placeholder="Link Name"
                    className="w-full px-3.5 py-2 rounded-xl bg-bg-card border border-border-color text-text-main text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />

                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => updateNavLink(link.id, 'href', e.target.value)}
                    placeholder="#section or URL"
                    className="w-full px-3.5 py-2 rounded-xl bg-bg-card border border-border-color text-text-main text-xs font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className={`text-[10px] font-mono px-2 py-1 rounded-lg uppercase font-bold ${link.visible ? 'bg-emerald-500/10 text-emerald-500' : 'bg-bg-card text-text-muted'}`}>
                  {link.visible ? 'Visible' : 'Hidden'}
                </span>
                
                <button
                  onClick={() => deleteNavLink(link.id)}
                  className="p-2.5 rounded-xl text-text-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                  title="Remove Link"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Visibility Switches */}
      <div className="p-6 sm:p-8 rounded-3xl bg-bg-card border border-border-color space-y-6 shadow-sm">
        <div>
          <h3 className="text-base font-bold font-heading text-text-main flex items-center gap-2">
            <Layout className="w-4 h-4 text-primary" />
            <span>Toggle Website Section Modules</span>
          </h3>
          <span className="text-xs text-text-muted">Turn entire page sections on or off dynamically</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            { id: 'hero', label: 'Hero Section', desc: 'Main intro & bio' },
            { id: 'about', label: 'About Me', desc: 'Detailed background' },
            { id: 'skills', label: 'Skills & Tech Stack', desc: 'Categorized badges' },
            { id: 'projects', label: 'Projects Showcase', desc: 'Portfolio cards' },
            { id: 'experience', label: 'Career Timeline', desc: 'Work history' },
            { id: 'testimonials', label: 'Client Testimonials', desc: 'Social proof' },
            { id: 'contact', label: 'Contact Form', desc: 'Direct message box' },
          ].map((sec) => {
            const isVisible = sectionVisibility?.[sec.id] !== false;
            return (
              <button
                key={sec.id}
                onClick={() => toggleSection(sec.id)}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all h-24 group ${
                  isVisible
                    ? 'bg-gradient-to-br from-emerald-500/10 via-bg-base to-bg-base border-emerald-500/50 text-text-main shadow-sm scale-[1.01]'
                    : 'bg-bg-base/50 border-border-color text-text-muted opacity-60 hover:opacity-80'
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <span className="font-bold text-xs group-hover:text-emerald-500 transition-colors">
                    {sec.label}
                  </span>
                  {isVisible ? (
                    <span className="p-1 rounded-lg bg-emerald-500 text-white">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="p-1 rounded-lg bg-bg-card text-text-muted border border-border-color">
                      <EyeOff className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-[11px] font-mono mt-auto pt-2 border-t border-border-color/50">
                  <span className="text-text-muted truncate pr-2">{sec.desc}</span>
                  <span className={isVisible ? 'text-emerald-500 font-bold' : 'text-text-muted'}>
                    {isVisible ? 'ON' : 'OFF'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Customization */}
      <div className="p-6 sm:p-8 rounded-3xl bg-bg-card border border-border-color space-y-6 shadow-sm">
        <div>
          <h3 className="text-base font-bold font-heading text-text-main">
            Footer Content & Notice
          </h3>
          <span className="text-xs text-text-muted">Customize bottom page text and social media links</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-text-main block">Copyright Notice</span>
            <input
              type="text"
              value={footer?.copyright || ''}
              onChange={(e) => handleFooterChange('copyright', e.target.value)}
              placeholder="© 2026 Alex Rivera. All rights reserved."
              className="w-full px-4 py-3 rounded-2xl bg-bg-base border border-border-color text-text-main text-xs font-semibold focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-text-main block">Tagline Subtitle</span>
            <input
              type="text"
              value={footer?.tagline || ''}
              onChange={(e) => handleFooterChange('tagline', e.target.value)}
              placeholder="Crafted with React & Tailwind CSS"
              className="w-full px-4 py-3 rounded-2xl bg-bg-base border border-border-color text-text-main text-xs font-semibold focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-5 rounded-2xl bg-bg-base border border-border-color">
          <div>
            <span className="font-bold text-xs text-text-main block">Show Social Links in Footer</span>
            <span className="text-[11px] text-text-muted">Mirror social icons in the bottom bar</span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={footer?.showSocials !== false}
              onChange={(e) => handleFooterChange('showSocials', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-bg-card peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border border-border-color peer-checked:bg-emerald-500"></div>
          </label>
        </div>
      </div>

    </div>
  );
};

export default GeneralEditor;
