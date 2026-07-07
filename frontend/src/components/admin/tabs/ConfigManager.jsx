import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Download, Upload, RotateCcw, FileJson, CheckCircle2, AlertTriangle, ShieldCheck, Database, ArrowUpRight } from 'lucide-react';

const ConfigManager = () => {
  const { exportConfig, importConfig, resetToDefault } = usePortfolio();
  const [jsonText, setJsonText] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      importConfig(content);
    };
    reader.readAsText(file);
  };

  const handlePasteImport = () => {
    if (!jsonText.trim()) return;
    const success = importConfig(jsonText);
    if (success) {
      setJsonText('');
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-8">
      
      {/* Top Banner Guide */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-indigo-500/10 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-500 font-bold font-heading text-sm">
            <Database className="w-4 h-4" />
            <span>Data Portability & Backup Engine</span>
          </div>
          <p className="text-xs text-text-muted max-w-xl">
            Export your entire portfolio state as a standalone JSON file or import a backup to migrate settings across environments instantaneously.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-card border border-border-color text-xs font-mono font-semibold self-start sm:self-center shrink-0 shadow-sm text-text-main">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>JSON Schema v2.0</span>
        </div>
      </div>

      {/* Export Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-bg-card to-bg-card border border-emerald-500/30 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-mono font-bold uppercase">
              <span>Instant Download</span>
            </div>
            <h3 className="text-lg font-bold font-heading text-text-main flex items-center gap-2">
              <Download className="w-5 h-5 text-emerald-500" />
              <span>Export Website Configuration</span>
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Download your customized design tokens, content sections, project data, and text strings as a standalone `portfolio-config.json` backup file.
            </p>
          </div>

          <button
            onClick={exportConfig}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-lg hover:shadow-emerald-500/30 hover:opacity-95 transform hover:-translate-y-0.5 transition-all shrink-0"
          >
            <FileJson className="w-4 h-4" />
            <span>Download Backup JSON</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>
      </div>

      {/* Import Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-bg-card border border-border-color space-y-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-bold font-heading text-text-main flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            <span>Import Configuration & Restore State</span>
          </h3>
          <p className="text-xs text-text-muted">
            Upload a previously downloaded `.json` backup file or paste your raw configuration string directly below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File Upload Drop Zone */}
          <div className="p-8 rounded-3xl bg-bg-base/60 border-2 border-dashed border-border-color hover:border-emerald-500/60 flex flex-col items-center justify-center text-center space-y-3 group transition-all cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-text-main block text-sm">Upload JSON File</span>
              <span className="text-xs text-text-muted">Click to browse your device or drop file here</span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json,application/json"
              className="hidden"
            />
            <button
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              className="px-5 py-2 rounded-xl bg-bg-card border border-border-color font-semibold text-xs text-text-main hover:border-emerald-500 transition-colors shadow-sm"
            >
              Browse Device
            </button>
          </div>

          {/* Paste JSON Option */}
          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-text-main">Raw JSON String Import</span>
              <textarea
                rows={5}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder='Paste raw JSON string {"theme": {...}, "projects": [...]} here...'
                className="w-full px-4 py-3 rounded-2xl bg-bg-base border border-border-color font-mono text-xs text-text-main focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none transition-all"
              />
            </div>
            <button
              onClick={handlePasteImport}
              disabled={!jsonText.trim()}
              className="w-full py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-md hover:shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply & Restore Pasted Configuration</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reset Factory Settings Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-rose-500/5 border border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-mono font-bold uppercase">
            <span>Destructive Action</span>
          </div>
          <h4 className="font-bold font-heading text-base text-rose-500 flex items-center justify-center sm:justify-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Reset Factory Default Portfolio</span>
          </h4>
          <p className="text-xs text-text-muted max-w-lg leading-relaxed">
            Restore the default factory dataset and styling tokens. WARNING: Any custom colors, text changes, or new projects not exported to JSON will be permanently wiped from local storage!
          </p>
        </div>

        <button
          onClick={resetToDefault}
          className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md hover:shadow-rose-500/30 transition-all flex items-center gap-2 shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset to Factory Defaults</span>
        </button>
      </div>

    </div>
  );
};

export default ConfigManager;
