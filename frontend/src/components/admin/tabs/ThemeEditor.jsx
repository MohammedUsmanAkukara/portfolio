import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { colorPresets } from '../../../data/initialPortfolioData';
import { Palette, Check, Sun, Moon, Type, Sparkles, Wand2, CheckCircle2 } from 'lucide-react';

const ThemeEditor = () => {
  const { data, updateData, applyColorPreset } = usePortfolio();
  const { theme } = data || {};

  const handleColorChange = (key, value) => {
    updateData('theme', (prev) => ({
      ...prev,
      [key]: value,
      preset: 'custom',
    }));
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      
      {/* Top Banner Guide */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold font-heading text-sm">
            <Wand2 className="w-4 h-4" />
            <span>Design System & Brand Tokens</span>
          </div>
          <p className="text-xs text-text-muted max-w-xl">
            Select a curated color theme below or craft your own bespoke brand palette. All CSS variables apply in real-time across every component.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-card border border-border-color text-xs font-mono font-semibold self-start sm:self-center shrink-0 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live CSS Tokens</span>
        </div>
      </div>

      {/* Preset Themes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2 font-mono">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Curated Palette Themes</span>
          </label>
          <span className="text-xs text-text-muted">Click any card to apply theme instantly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorPresets.map((preset) => {
            const isSelected = theme?.preset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyColorPreset(preset.id)}
                className={`p-5 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden group flex flex-col justify-between h-32 ${
                  isSelected
                    ? 'border-emerald-500 ring-4 ring-emerald-500/15 bg-gradient-to-br from-emerald-500/10 via-bg-card to-bg-card shadow-xl scale-[1.02]'
                    : 'border-border-color bg-bg-card hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <div>
                    <span className="font-heading font-extrabold text-base text-text-main group-hover:text-emerald-500 transition-colors block">
                      {preset.name}
                    </span>
                    <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider">
                      {preset.primary}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-scaleIn shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Color Swatch Preview Bar */}
                <div className="flex items-center gap-2 pt-3 border-t border-border-color/60 w-full mt-auto">
                  <div className="flex-1 h-6 rounded-xl shadow-inner flex items-center px-2 text-[10px] font-mono text-white font-bold overflow-hidden" style={{ backgroundColor: preset.primary }}>
                    <span className="drop-shadow">Primary</span>
                  </div>
                  <div className="w-8 h-6 rounded-xl shadow-inner" style={{ backgroundColor: preset.secondary }} title="Secondary" />
                  <div className="w-8 h-6 rounded-xl shadow-inner" style={{ backgroundColor: preset.accent }} title="Accent" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-border-color" />

      {/* Manual Hex Color Pickers */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2 font-mono">
            <Palette className="w-4 h-4 text-primary" />
            <span>Custom Hex Color Tokens</span>
          </label>
          <span className="text-xs text-text-muted">Type hex codes or use the visual color picker</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Primary Color */}
          <div className="p-5 rounded-3xl bg-bg-card border border-border-color space-y-3 hover:border-primary/40 transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-main">Primary Brand</span>
              <span className="text-[10px] font-mono text-text-muted uppercase px-2 py-0.5 rounded bg-bg-base border border-border-color">Main CTA</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="color"
                  value={theme?.primary || '#6366f1'}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-12 h-12 rounded-2xl cursor-pointer border-0 bg-transparent shrink-0 opacity-0 absolute inset-0 z-10"
                />
                <div 
                  className="w-12 h-12 rounded-2xl border-2 border-white/20 shadow-lg flex items-center justify-center transition-transform hover:scale-105"
                  style={{ backgroundColor: theme?.primary || '#6366f1' }}
                />
              </div>
              <input
                type="text"
                value={theme?.primary || '#6366f1'}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color font-mono text-xs text-text-main uppercase focus:outline-none focus:border-primary font-bold"
              />
            </div>
          </div>

          {/* Primary Hover Color */}
          <div className="p-5 rounded-3xl bg-bg-card border border-border-color space-y-3 hover:border-primary/40 transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-main">Primary Hover</span>
              <span className="text-[10px] font-mono text-text-muted uppercase px-2 py-0.5 rounded bg-bg-base border border-border-color">Active</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="color"
                  value={theme?.primaryHover || '#4f46e5'}
                  onChange={(e) => handleColorChange('primaryHover', e.target.value)}
                  className="w-12 h-12 rounded-2xl cursor-pointer border-0 bg-transparent shrink-0 opacity-0 absolute inset-0 z-10"
                />
                <div 
                  className="w-12 h-12 rounded-2xl border-2 border-white/20 shadow-lg flex items-center justify-center transition-transform hover:scale-105"
                  style={{ backgroundColor: theme?.primaryHover || '#4f46e5' }}
                />
              </div>
              <input
                type="text"
                value={theme?.primaryHover || '#4f46e5'}
                onChange={(e) => handleColorChange('primaryHover', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color font-mono text-xs text-text-main uppercase focus:outline-none focus:border-primary font-bold"
              />
            </div>
          </div>

          {/* Secondary Color */}
          <div className="p-5 rounded-3xl bg-bg-card border border-border-color space-y-3 hover:border-primary/40 transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-main">Secondary Accent</span>
              <span className="text-[10px] font-mono text-text-muted uppercase px-2 py-0.5 rounded bg-bg-base border border-border-color">Gradient</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="color"
                  value={theme?.secondary || '#06b6d4'}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-12 h-12 rounded-2xl cursor-pointer border-0 bg-transparent shrink-0 opacity-0 absolute inset-0 z-10"
                />
                <div 
                  className="w-12 h-12 rounded-2xl border-2 border-white/20 shadow-lg flex items-center justify-center transition-transform hover:scale-105"
                  style={{ backgroundColor: theme?.secondary || '#06b6d4' }}
                />
              </div>
              <input
                type="text"
                value={theme?.secondary || '#06b6d4'}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color font-mono text-xs text-text-main uppercase focus:outline-none focus:border-primary font-bold"
              />
            </div>
          </div>

          {/* Accent Color */}
          <div className="p-5 rounded-3xl bg-bg-card border border-border-color space-y-3 hover:border-primary/40 transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-main">Badge Highlight</span>
              <span className="text-[10px] font-mono text-text-muted uppercase px-2 py-0.5 rounded bg-bg-base border border-border-color">Notice</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="color"
                  value={theme?.accent || '#f43f5e'}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-12 h-12 rounded-2xl cursor-pointer border-0 bg-transparent shrink-0 opacity-0 absolute inset-0 z-10"
                />
                <div 
                  className="w-12 h-12 rounded-2xl border-2 border-white/20 shadow-lg flex items-center justify-center transition-transform hover:scale-105"
                  style={{ backgroundColor: theme?.accent || '#f43f5e' }}
                />
              </div>
              <input
                type="text"
                value={theme?.accent || '#f43f5e'}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color font-mono text-xs text-text-main uppercase focus:outline-none focus:border-primary font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-border-color" />

      {/* Color Mode & Typography Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Color Mode Switcher */}
        <div className="p-6 rounded-3xl bg-bg-card border border-border-color space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-heading font-extrabold text-lg text-text-main">Default Color Mode</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">Theme Base</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Choose whether new visitors experience your portfolio in deep obsidian dark mode or crisp light slate mode by default.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleColorChange('darkMode', true)}
              className={`p-4 rounded-2xl border flex items-center justify-center gap-3 font-bold text-sm transition-all ${
                theme?.darkMode
                  ? 'bg-gradient-to-r from-indigo-600 to-slate-900 border-indigo-500 text-white shadow-lg shadow-indigo-500/20 scale-[1.02]'
                  : 'bg-bg-base border-border-color text-text-muted hover:text-text-main'
              }`}
            >
              <Moon className={`w-5 h-5 ${theme?.darkMode ? 'text-indigo-400' : ''}`} />
              <span>Dark Mode</span>
              {theme?.darkMode && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto" />}
            </button>

            <button
              onClick={() => handleColorChange('darkMode', false)}
              className={`p-4 rounded-2xl border flex items-center justify-center gap-3 font-bold text-sm transition-all ${
                !theme?.darkMode
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 border-amber-400 text-white shadow-lg shadow-amber-500/20 scale-[1.02]'
                  : 'bg-bg-base border-border-color text-text-muted hover:text-text-main'
              }`}
            >
              <Sun className={`w-5 h-5 ${!theme?.darkMode ? 'text-amber-200' : ''}`} />
              <span>Light Mode</span>
              {!theme?.darkMode && <CheckCircle2 className="w-4 h-4 text-white ml-auto" />}
            </button>
          </div>
        </div>

        {/* Typography Selection */}
        <div className="p-6 rounded-3xl bg-bg-card border border-border-color space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-heading font-extrabold text-lg text-text-main flex items-center gap-2">
                <Type className="w-5 h-5 text-emerald-500" />
                <span>Typography Pairing</span>
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">Google Fonts</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Select premium typography combinations for headers and body copy.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { label: 'Inter & Outfit', sample: 'Aa', main: 'Inter', heading: 'Outfit', desc: 'Sleek Modern Tech' },
              { label: 'Roboto & Playfair', sample: 'Ag', main: 'Roboto, sans-serif', heading: 'Playfair Display, serif', desc: 'Editorial & Elegant' },
              { label: 'System Modern', sample: 'Sf', main: 'system-ui, sans-serif', heading: 'system-ui, sans-serif', desc: 'Native OS Crispness' },
              { label: 'Monospace Code', sample: '{ }', main: 'Fira Code, monospace', heading: 'Fira Code, monospace', desc: 'Developer Hacker Vibe' },
            ].map((f, i) => {
              const isSelected = theme?.fontMain === f.main;
              return (
                <button
                  key={i}
                  onClick={() => {
                    handleColorChange('fontMain', f.main);
                    handleColorChange('fontHeading', f.heading);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500 text-text-main ring-2 ring-emerald-500/20 shadow-sm'
                      : 'bg-bg-base border-border-color text-text-muted hover:text-text-main hover:bg-bg-card'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <span className="font-bold text-xs block text-text-main truncate">{f.label}</span>
                    <span className="text-[10px] text-text-muted block truncate">{f.desc}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isSelected ? 'bg-emerald-500 text-white' : 'bg-bg-card border border-border-color text-text-main'
                  }`}>
                    {f.sample}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ThemeEditor;
