import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Phone, MapPin, Clock, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';

const Contact = () => {
  const { data, showToast } = usePortfolio();
  const { contact, sectionVisibility } = data;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!sectionVisibility?.contact) return null;

  const labels = contact?.formLabels || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.sendContactMessage(formData);
      setIsSubmitting(false);
      setIsSent(true);
      showToast(labels.successMsg || 'Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      setIsSubmitting(false);
      showToast(error.message || 'Failed to send message. Please check server connection.', 'error');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-bg-base">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-l from-primary/15 to-secondary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          {contact?.badgeText && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/30 text-primary text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-accent animate-spin-slow" />
              <span>{contact.badgeText}</span>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
            {contact?.title || "Let's Build Something Great"}
          </h2>
          
          <p className="text-base sm:text-lg text-text-muted">
            {contact?.subtitle}
          </p>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 rounded-3xl border border-border-color shadow-lg space-y-8">
              <h3 className="text-2xl font-bold font-heading text-text-main">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Email */}
                {contact?.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-bg-base/60 border border-border-color hover:border-primary/40 hover:bg-bg-card transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Email Address
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-text-main group-hover:text-primary transition-colors mt-0.5 break-all">
                        {contact.email}
                      </div>
                    </div>
                  </a>
                )}

                {/* Phone */}
                {contact?.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-bg-base/60 border border-border-color hover:border-primary/40 hover:bg-bg-card transition-all group"
                  >
                    <div className="p-3 rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Phone Number
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-text-main group-hover:text-secondary transition-colors mt-0.5">
                        {contact.phone}
                      </div>
                    </div>
                  </a>
                )}

                {/* Location */}
                {contact?.location && (
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-bg-base/60 border border-border-color">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Location
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-text-main mt-0.5">
                        {contact.location}
                      </div>
                    </div>
                  </div>
                )}

                {/* Availability */}
                {contact?.availability && (
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-bg-base/60 border border-border-color">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Current Status
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-emerald-500 mt-0.5 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span>{contact.availability}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-border-color shadow-xl relative">
              
              <h3 className="text-2xl font-bold font-heading text-text-main mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                      {labels.nameLabel || 'Your Name'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={labels.namePlaceholder || 'John Doe'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-bg-base border border-border-color text-text-main placeholder-text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                      {labels.emailLabel || 'Email Address'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={labels.emailPlaceholder || 'john@example.com'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-bg-base border border-border-color text-text-main placeholder-text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {labels.subjectLabel || 'Subject'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={labels.subjectPlaceholder || 'Project Collaboration'}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-bg-base border border-border-color text-text-main placeholder-text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {labels.messageLabel || 'Your Message'}
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder={labels.messagePlaceholder || 'Tell me about your project...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-bg-base border border-border-color text-text-main placeholder-text-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSent}
                  className={`w-full py-4 rounded-xl text-white font-semibold text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSent
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-gradient-to-r from-primary via-primary-hover to-secondary hover:shadow-xl hover:opacity-95 transform hover:-translate-y-0.5'
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : isSent ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <span>{labels.submitBtn || 'Send Message'}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
