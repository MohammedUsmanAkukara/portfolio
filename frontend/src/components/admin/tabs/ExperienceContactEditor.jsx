import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { History, MessageSquareQuote, Mail, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

const ExperienceContactEditor = () => {
  const { data, updateData } = usePortfolio();
  const { experience, testimonials, contact } = data;

  // Experience Handlers
  const handleExpChange = (key, val) => {
    updateData('experience', (prev) => ({ ...prev, [key]: val }));
  };

  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      type: 'work',
      role: 'New Role Title',
      company: 'Company / University Name',
      period: '2024 - Present',
      location: 'City, State / Remote',
      description: 'Describe your key responsibilities, accomplishments, and skills used during this experience.',
    };
    updateData('experience', (prev) => ({
      ...prev,
      items: [newExp, ...prev.items],
    }));
  };

  const deleteExperience = (id) => {
    if (window.confirm('Are you sure you want to delete this timeline entry?')) {
      updateData('experience', (prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }));
    }
  };

  const updateExperience = (id, field, val) => {
    updateData('experience', (prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [field]: val } : item)),
    }));
  };

  // Testimonial Handlers
  const handleTestimonialChange = (key, val) => {
    updateData('testimonials', (prev) => ({ ...prev, [key]: val }));
  };

  const addTestimonial = () => {
    const newTest = {
      id: `test-${Date.now()}`,
      quote: 'An outstanding professional with incredible attention to detail and problem-solving skills.',
      author: 'Jane Doe',
      role: 'Engineering Manager at TechCorp',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    };
    updateData('testimonials', (prev) => ({
      ...prev,
      items: [newTest, ...prev.items],
    }));
  };

  const deleteTestimonial = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      updateData('testimonials', (prev) => ({
        ...prev,
        items: prev.items.filter((t) => t.id !== id),
      }));
    }
  };

  const updateTestimonial = (id, field, val) => {
    updateData('testimonials', (prev) => ({
      ...prev,
      items: prev.items.map((t) => (t.id === id ? { ...t, [field]: val } : t)),
    }));
  };

  // Contact Handlers
  const handleContactChange = (key, val) => {
    updateData('contact', (prev) => ({ ...prev, [key]: val }));
  };

  const handleFormLabelChange = (key, val) => {
    updateData('contact', (prev) => ({
      ...prev,
      formLabels: { ...prev.formLabels, [key]: val },
    }));
  };

  const labels = contact?.formLabels || {};

  return (
    <div className="space-y-12 animate-fadeIn text-sm">
      
      {/* EXPERIENCE & EDUCATION SECTION */}
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
            <History className="w-4 h-4 text-primary" />
            <span>Experience & Education Headers</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Section Badge</span>
              <input
                type="text"
                value={experience?.badgeText || ''}
                onChange={(e) => handleExpChange('badgeText', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Section Title Heading</span>
              <input
                type="text"
                value={experience?.title || ''}
                onChange={(e) => handleExpChange('title', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <span className="text-xs font-semibold text-text-muted">Subtitle Description</span>
              <input
                type="text"
                value={experience?.subtitle || ''}
                onChange={(e) => handleExpChange('subtitle', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Timeline Items List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-heading font-bold text-base text-text-main">Timeline Entries</span>
            <button
              onClick={addExperience}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Entry</span>
            </button>
          </div>

          <div className="space-y-6">
            {(experience?.items || []).map((item) => (
              <div key={item.id} className="p-5 rounded-3xl bg-bg-base border border-border-color space-y-4 relative group">
                <div className="flex items-center justify-between pb-3 border-b border-border-color">
                  <div className="flex items-center gap-3">
                    <select
                      value={item.type}
                      onChange={(e) => updateExperience(item.id, 'type', e.target.value)}
                      className="px-3 py-1 rounded-full bg-bg-card border border-border-color text-xs font-bold uppercase text-primary focus:outline-none focus:border-primary"
                    >
                      <option value="work">Work Experience</option>
                      <option value="education">Education</option>
                    </select>

                    <span className="font-heading font-bold text-base text-text-main">
                      {item.role || 'Untitled Role'}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteExperience(item.id)}
                    className="p-2 rounded-lg text-text-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-text-muted">Role / Degree Title</span>
                    <input
                      type="text"
                      value={item.role}
                      onChange={(e) => updateExperience(item.id, 'role', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color font-semibold text-text-main focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-text-muted">Company / Institution Name</span>
                    <input
                      type="text"
                      value={item.company}
                      onChange={(e) => updateExperience(item.id, 'company', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-text-muted">Period (e.g. 2023 - Present)</span>
                    <input
                      type="text"
                      value={item.period}
                      onChange={(e) => updateExperience(item.id, 'period', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color font-mono text-xs text-text-main focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-text-muted">Location (e.g. San Francisco, CA)</span>
                    <input
                      type="text"
                      value={item.location}
                      onChange={(e) => updateExperience(item.id, 'location', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <span className="text-xs font-semibold text-text-muted">Description & Responsibilities</span>
                    <textarea
                      rows={3}
                      value={item.description}
                      onChange={(e) => updateExperience(item.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-border-color" />

      {/* TESTIMONIALS SECTION */}
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
            <MessageSquareQuote className="w-4 h-4 text-secondary" />
            <span>Testimonials Section Headers</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Section Badge</span>
              <input
                type="text"
                value={testimonials?.badgeText || ''}
                onChange={(e) => handleTestimonialChange('badgeText', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Section Title Heading</span>
              <input
                type="text"
                value={testimonials?.title || ''}
                onChange={(e) => handleTestimonialChange('title', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <span className="text-xs font-semibold text-text-muted">Subtitle Description</span>
              <input
                type="text"
                value={testimonials?.subtitle || ''}
                onChange={(e) => handleTestimonialChange('subtitle', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Testimonials List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-heading font-bold text-base text-text-main">Testimonials Cards</span>
            <button
              onClick={addTestimonial}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-colors text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Testimonial</span>
            </button>
          </div>

          <div className="space-y-6">
            {(testimonials?.items || []).map((t) => (
              <div key={t.id} className="p-5 rounded-3xl bg-bg-base border border-border-color space-y-4 relative group">
                <div className="flex items-center justify-between pb-3 border-b border-border-color">
                  <span className="font-heading font-bold text-base text-text-main">
                    {t.author || 'Anonymous Author'}
                  </span>

                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="p-2 rounded-lg text-text-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                    title="Delete Testimonial"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-text-muted">Author Name</span>
                    <input
                      type="text"
                      value={t.author}
                      onChange={(e) => updateTestimonial(t.id, 'author', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color font-semibold text-text-main focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-text-muted">Role & Company</span>
                    <input
                      type="text"
                      value={t.role}
                      onChange={(e) => updateTestimonial(t.id, 'role', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <span className="text-xs font-semibold text-text-muted flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Author Avatar Image URL</span>
                    </span>
                    <input
                      type="text"
                      value={t.avatar}
                      onChange={(e) => updateTestimonial(t.id, 'avatar', e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main font-mono text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <span className="text-xs font-semibold text-text-muted">Quote Text</span>
                    <textarea
                      rows={3}
                      value={t.quote}
                      onChange={(e) => updateTestimonial(t.id, 'quote', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main focus:outline-none focus:border-primary resize-none italic"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-border-color" />

      {/* CONTACT SECTION STRINGS & FORM LABELS */}
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" />
            <span>Contact Information & Form Labels</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Section Badge</span>
              <input
                type="text"
                value={contact?.badgeText || ''}
                onChange={(e) => handleContactChange('badgeText', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Section Title Heading</span>
              <input
                type="text"
                value={contact?.title || ''}
                onChange={(e) => handleContactChange('title', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <span className="text-xs font-semibold text-text-muted">Subtitle Description</span>
              <input
                type="text"
                value={contact?.subtitle || ''}
                onChange={(e) => handleContactChange('subtitle', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Contact Email</span>
              <input
                type="email"
                value={contact?.email || ''}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Contact Phone</span>
              <input
                type="text"
                value={contact?.phone || ''}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Location Display Text</span>
              <input
                type="text"
                value={contact?.location || ''}
                onChange={(e) => handleContactChange('location', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-emerald-500 font-bold">Availability Status Text</span>
              <input
                type="text"
                value={contact?.availability || ''}
                onChange={(e) => handleContactChange('availability', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-emerald-500/50 text-emerald-500 font-semibold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Customizable Form Labels & Placeholders */}
        <div className="p-5 rounded-3xl bg-bg-base border border-border-color space-y-4">
          <span className="font-heading font-bold text-base text-text-main block">
            Customizable Contact Form Labels & Placeholders
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Name Field Label</span>
              <input
                type="text"
                value={labels.nameLabel || ''}
                onChange={(e) => handleFormLabelChange('nameLabel', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Name Field Placeholder</span>
              <input
                type="text"
                value={labels.namePlaceholder || ''}
                onChange={(e) => handleFormLabelChange('namePlaceholder', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Email Field Label</span>
              <input
                type="text"
                value={labels.emailLabel || ''}
                onChange={(e) => handleFormLabelChange('emailLabel', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Email Field Placeholder</span>
              <input
                type="text"
                value={labels.emailPlaceholder || ''}
                onChange={(e) => handleFormLabelChange('emailPlaceholder', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Subject Field Label</span>
              <input
                type="text"
                value={labels.subjectLabel || ''}
                onChange={(e) => handleFormLabelChange('subjectLabel', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Subject Field Placeholder</span>
              <input
                type="text"
                value={labels.subjectPlaceholder || ''}
                onChange={(e) => handleFormLabelChange('subjectPlaceholder', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <span className="text-xs font-semibold text-text-muted">Submit Button Label</span>
              <input
                type="text"
                value={labels.submitBtn || ''}
                onChange={(e) => handleFormLabelChange('submitBtn', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color font-bold text-primary"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <span className="text-xs font-semibold text-text-muted">Success Alert Toast Message</span>
              <input
                type="text"
                value={labels.successMsg || ''}
                onChange={(e) => handleFormLabelChange('successMsg', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-bg-card border border-emerald-500/50 text-emerald-500 font-medium"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ExperienceContactEditor;
