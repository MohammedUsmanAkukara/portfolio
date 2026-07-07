import React, { useState } from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Sparkles, User, Plus, Trash2, Eye, EyeOff, Image as ImageIcon, Award, BarChart2, Share2, Upload, Loader2 } from 'lucide-react';
import api from '../../../services/api';

const HeroAboutEditor = () => {
  const { data, updateData, showToast } = usePortfolio();
  const { hero, about } = data;
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await api.uploadImageFile(file);
      if (res.success && res.url) {
        handleHeroChange('avatarUrl', res.url);
        showToast('Image uploaded successfully!');
      }
    } catch (err) {
      showToast(err.message || 'Image upload failed. Is backend server running?', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Hero Handlers
  const handleHeroChange = (key, val) => {
    updateData('hero', (prev) => ({ ...prev, [key]: val }));
  };

  const updateHeroStat = (id, field, val) => {
    updateData('hero', (prev) => ({
      ...prev,
      stats: prev.stats.map((st) => (st.id === id ? { ...st, [field]: val } : st)),
    }));
  };

  const addHeroStat = () => {
    const newId = `stat-${Date.now()}`;
    updateData('hero', (prev) => ({
      ...prev,
      stats: [...prev.stats, { id: newId, value: '100+', label: 'New Metric' }],
    }));
  };

  const deleteHeroStat = (id) => {
    updateData('hero', (prev) => ({
      ...prev,
      stats: prev.stats.filter((st) => st.id !== id),
    }));
  };

  const updateSocial = (id, field, val) => {
    updateData('hero', (prev) => ({
      ...prev,
      socials: prev.socials.map((s) => (s.id === id ? { ...s, [field]: val } : s)),
    }));
  };

  // About Handlers
  const handleAboutChange = (key, val) => {
    updateData('about', (prev) => ({ ...prev, [key]: val }));
  };

  const updateHighlight = (id, field, val) => {
    updateData('about', (prev) => ({
      ...prev,
      highlights: prev.highlights.map((h) => (h.id === id ? { ...h, [field]: val } : h)),
    }));
  };

  return (
    <div className="space-y-10 animate-fadeIn text-sm">
      
      {/* HERO SECTION STRINGS */}
      <div className="space-y-4">
        <label className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Hero Section Content</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1 sm:col-span-2">
            <span className="text-xs font-semibold text-text-muted">Top Greeting Badge Text</span>
            <input
              type="text"
              value={hero?.badgeText || ''}
              onChange={(e) => handleHeroChange('badgeText', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-text-muted">Main Headline - Start</span>
            <input
              type="text"
              value={hero?.titleStart || ''}
              onChange={(e) => handleHeroChange('titleStart', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-primary">Highlighted Title Keyword</span>
            <input
              type="text"
              value={hero?.titleHighlight || ''}
              onChange={(e) => handleHeroChange('titleHighlight', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-primary/50 text-primary font-bold focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <span className="text-xs font-semibold text-text-muted">Subtitle / Short Bio Summary</span>
            <textarea
              rows={3}
              value={hero?.subtitle || ''}
              onChange={(e) => handleHeroChange('subtitle', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <span className="text-xs font-semibold text-text-muted flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Avatar / Profile Image URL</span>
              </span>
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-colors">
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </span>
            <input
              type="text"
              value={hero?.avatarUrl || ''}
              onChange={(e) => handleHeroChange('avatarUrl', e.target.value)}
              placeholder="https://... or upload above"
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main font-mono text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-text-muted">Primary Button Text</span>
            <input
              type="text"
              value={hero?.primaryCtaText || ''}
              onChange={(e) => handleHeroChange('primaryCtaText', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-text-muted">Primary Button Link URL</span>
            <input
              type="text"
              value={hero?.primaryCtaLink || ''}
              onChange={(e) => handleHeroChange('primaryCtaLink', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main font-mono text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-text-muted">Secondary Button Text</span>
            <input
              type="text"
              value={hero?.secondaryCtaText || ''}
              onChange={(e) => handleHeroChange('secondaryCtaText', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-text-muted">Secondary Button Link URL</span>
            <input
              type="text"
              value={hero?.secondaryCtaLink || ''}
              onChange={(e) => handleHeroChange('secondaryCtaLink', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main font-mono text-xs focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      <hr className="border-border-color" />

      {/* HERO STAT BADGES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-secondary" />
            <span>Floating Hero Stat Badges</span>
          </label>
          <button
            onClick={addHeroStat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-colors text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Stat</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(hero?.stats || []).map((stat) => (
            <div key={stat.id} className="p-3 rounded-2xl bg-bg-base border border-border-color space-y-2 relative group">
              <button
                onClick={() => deleteHeroStat(stat.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg text-text-muted hover:text-rose-500 transition-colors"
                title="Delete Stat"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div>
                <span className="text-[10px] font-bold text-text-muted block">Value (e.g. 6+)</span>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateHeroStat(stat.id, 'value', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-bg-card border border-border-color text-text-main font-bold text-sm focus:outline-none focus:border-primary mt-0.5"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-text-muted block">Label</span>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateHeroStat(stat.id, 'label', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-bg-card border border-border-color text-text-main text-xs focus:outline-none focus:border-primary mt-0.5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-border-color" />

      {/* HERO SOCIAL LINKS */}
      <div className="space-y-4">
        <label className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
          <Share2 className="w-4 h-4 text-accent" />
          <span>Social Media Profiles</span>
        </label>

        <div className="space-y-3">
          {(hero?.socials || []).map((soc) => (
            <div key={soc.id} className="p-3.5 rounded-2xl bg-bg-base border border-border-color flex flex-wrap items-center gap-3">
              <button
                onClick={() => updateSocial(soc.id, 'visible', !soc.visible)}
                className={`p-2 rounded-lg border transition-colors ${
                  soc.visible ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-bg-card border-border-color text-text-muted'
                }`}
                title={soc.visible ? 'Visible' : 'Hidden'}
              >
                {soc.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <select
                value={soc.icon}
                onChange={(e) => updateSocial(soc.id, 'icon', e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-bg-card border border-border-color text-text-main text-xs font-medium focus:outline-none focus:border-primary"
              >
                <option value="Github">Github</option>
                <option value="Linkedin">Linkedin</option>
                <option value="Twitter">Twitter / X</option>
                <option value="Mail">Mail</option>
                <option value="Globe">Globe / Website</option>
              </select>

              <input
                type="text"
                value={soc.url}
                onChange={(e) => updateSocial(soc.id, 'url', e.target.value)}
                placeholder="https://..."
                className="flex-1 min-w-[200px] px-3 py-1.5 rounded-lg bg-bg-card border border-border-color text-text-main font-mono text-xs focus:outline-none focus:border-primary"
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="border-border-color" />

      {/* ABOUT ME SECTION CONTENT */}
      <div className="space-y-4">
        <label className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          <span>About Me Section Content</span>
        </label>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Section Badge</span>
              <input
                type="text"
                value={about?.badgeText || ''}
                onChange={(e) => handleAboutChange('badgeText', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Section Title Heading</span>
              <input
                type="text"
                value={about?.title || ''}
                onChange={(e) => handleAboutChange('title', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-text-muted">Bio Paragraph 1</span>
            <textarea
              rows={3}
              value={about?.description1 || ''}
              onChange={(e) => handleAboutChange('description1', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-text-muted">Bio Paragraph 2</span>
            <textarea
              rows={3}
              value={about?.description2 || ''}
              onChange={(e) => handleAboutChange('description2', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary resize-none"
            />
          </div>
        </div>
      </div>

      <hr className="border-border-color" />

      {/* ABOUT HIGHLIGHT CARDS */}
      <div className="space-y-4">
        <label className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
          <Award className="w-4 h-4 text-secondary" />
          <span>About Me Highlight Cards</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(about?.highlights || []).map((h) => (
            <div key={h.id} className="p-3.5 rounded-2xl bg-bg-base border border-border-color space-y-2">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={h.title}
                  onChange={(e) => updateHighlight(h.id, 'title', e.target.value)}
                  className="w-1/2 px-2.5 py-1 rounded bg-bg-card border border-border-color text-text-muted text-xs font-bold uppercase"
                  placeholder="Title (e.g. Location)"
                />
                <select
                  value={h.icon}
                  onChange={(e) => updateHighlight(h.id, 'icon', e.target.value)}
                  className="w-1/2 px-2 py-1 rounded bg-bg-card border border-border-color text-text-main text-xs"
                >
                  <option value="MapPin">MapPin</option>
                  <option value="GraduationCap">GraduationCap</option>
                  <option value="CheckCircle2">CheckCircle2</option>
                  <option value="Sparkles">Sparkles</option>
                  <option value="Award">Award</option>
                  <option value="User">User</option>
                </select>
              </div>

              <input
                type="text"
                value={h.value}
                onChange={(e) => updateHighlight(h.id, 'value', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-bg-card border border-border-color text-text-main font-bold text-sm"
                placeholder="Value"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HeroAboutEditor;
