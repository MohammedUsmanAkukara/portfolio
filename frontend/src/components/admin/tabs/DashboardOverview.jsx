import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { 
  Sparkles, 
  Palette, 
  Layers, 
  Inbox, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Sliders, 
  FileText,
  Briefcase
} from 'lucide-react';

const DashboardOverview = ({ setActiveTab }) => {
  const { data } = usePortfolio();
  const { theme, sectionVisibility, projects, skills } = data || {};

  // Calculate active sections count
  const sections = sectionVisibility ? Object.values(sectionVisibility) : [];
  const activeSectionsCount = sections.filter((v) => v !== false).length;
  const totalSections = sections.length || 7;

  return (
    <div className="space-y-8 animate-fadeIn pb-6">
      
      {/* Welcome Banner Card (Wise Signature Style) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/10 via-primary/5 to-bg-card border border-emerald-500/20 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-48 h-48 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Wise Studio Workspace Active</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-text-main tracking-tight">
              Control Your Portfolio Architecture
            </h2>
            
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              Experience zero-latency real-time editing. Any customization you make below updates your design tokens, typography, and content across the live browser instantly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('theme')}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg hover:shadow-emerald-500/25 hover:opacity-95 transition-all transform hover:-translate-y-0.5"
            >
              <Palette className="w-4 h-4" />
              <span>Customize Design System</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('skillsProjects')}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-bg-base border border-border-color hover:border-primary text-text-main font-semibold text-xs transition-all"
            >
              <Layers className="w-4 h-4 text-primary" />
              <span>Manage Projects ({projects?.length || 0})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Metric 1: Active Sections */}
        <div className="p-5 rounded-2xl bg-bg-card border border-border-color hover:border-emerald-500/40 transition-all shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Website Layout</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold font-heading text-text-main">
              {activeSectionsCount} <span className="text-sm font-medium text-text-muted">/ {totalSections} Active</span>
            </div>
            <div className="w-full bg-bg-base h-2 rounded-full mt-3 overflow-hidden border border-border-color/50">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${(activeSectionsCount / totalSections) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Metric 2: Brand Color System */}
        <div className="p-5 rounded-2xl bg-bg-card border border-border-color hover:border-primary/40 transition-all shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Active Palette</span>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Palette className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-extrabold font-heading text-text-main capitalize">
                {theme?.preset || 'Custom'} Theme
              </div>
              <span className="text-xs text-text-muted block mt-0.5 font-mono uppercase">{theme?.primary || '#6366f1'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-bg-base p-1.5 rounded-xl border border-border-color">
              <div className="w-5 h-5 rounded-lg shadow-sm" style={{ backgroundColor: theme?.primary || '#6366f1' }} />
              <div className="w-5 h-5 rounded-lg shadow-sm" style={{ backgroundColor: theme?.secondary || '#06b6d4' }} />
              <div className="w-5 h-5 rounded-lg shadow-sm" style={{ backgroundColor: theme?.accent || '#f43f5e' }} />
            </div>
          </div>
        </div>

        {/* Metric 3: Skills & Tech Stack */}
        <div className="p-5 rounded-2xl bg-bg-card border border-border-color hover:border-cyan-500/40 transition-all shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Tech Stack</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold font-heading text-text-main">
              {skills?.length || 0} <span className="text-sm font-medium text-text-muted">Skills Listed</span>
            </div>
            <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1 mt-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Optimized & Categorized</span>
            </span>
          </div>
        </div>

        {/* Metric 4: System & Persistence */}
        <div className="p-5 rounded-2xl bg-bg-card border border-border-color hover:border-amber-500/40 transition-all shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Data Persistence</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-lg font-extrabold font-heading text-text-main">
              Instant Sync
            </div>
            <span className="text-[11px] text-text-muted flex items-center gap-1.5 mt-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Browser LocalStorage Protected</span>
            </span>
          </div>
        </div>

      </div>

      {/* Quick Action Navigation Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-heading text-text-main flex items-center gap-2">
            <Sliders className="w-4 h-4 text-primary" />
            <span>Studio Control Shortcuts</span>
          </h3>
          <span className="text-xs text-text-muted">Jump directly to editor section</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <button
            onClick={() => setActiveTab('heroAbout')}
            className="group p-5 rounded-2xl bg-bg-card border border-border-color hover:border-primary/50 text-left transition-all flex items-start justify-between shadow-sm hover:shadow-md"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold font-heading text-text-main group-hover:text-primary transition-colors text-base">
                <FileText className="w-4 h-4 text-primary" />
                <span>Hero & Biography</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Update headlines, typing animations, bio descriptions, and resume download links.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
          </button>

          <button
            onClick={() => setActiveTab('expContact')}
            className="group p-5 rounded-2xl bg-bg-card border border-border-color hover:border-secondary/50 text-left transition-all flex items-start justify-between shadow-sm hover:shadow-md"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold font-heading text-text-main group-hover:text-secondary transition-colors text-base">
                <Briefcase className="w-4 h-4 text-secondary" />
                <span>Work & Education</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Manage timeline milestones, career history, social media handles, and contact emails.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-secondary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className="group p-5 rounded-2xl bg-bg-card border border-border-color hover:border-amber-500/50 text-left transition-all flex items-start justify-between shadow-sm hover:shadow-md"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold font-heading text-text-main group-hover:text-amber-500 transition-colors text-base">
                <Database className="w-4 h-4 text-amber-500" />
                <span>Backup & Migration</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Export your custom JSON configuration file or restore factory settings safely.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-amber-500 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
          </button>

        </div>
      </div>

      {/* Wise Live Tips Footer */}
      <div className="p-5 rounded-2xl bg-bg-base border border-border-color flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-text-main">Wise Architecture Note: Live State Synchronization</h4>
            <p className="text-xs text-text-muted mt-0.5">
              Your portfolio uses React State coupled with LocalStorage. All changes apply instantaneously without needing a page refresh or rebuild!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold bg-bg-card px-3.5 py-2 rounded-xl border border-border-color shrink-0 self-start sm:self-center">
          <span className="text-text-muted">Shortcut:</span>
          <span className="text-primary px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">Alt + S</span>
          <span className="text-text-muted">or</span>
          <span className="text-emerald-500 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Ctrl + K</span>
        </div>
      </div>

    </div>
  );
};

export default DashboardOverview;
