import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowUp, Mail, Globe } from 'lucide-react';
import { Github, Linkedin, Twitter } from '../common/BrandIcons';

const iconMap = {
  Github: Github,
  Linkedin: Linkedin,
  Twitter: Twitter,
  Mail: Mail,
  Globe: Globe,
};

const Footer = () => {
  const { data } = usePortfolio();
  const { footer, hero } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visibleSocials = (hero?.socials || []).filter((s) => s.visible);

  return (
    <footer className="bg-bg-card border-t border-border-color py-12 relative text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Copyright & Tagline */}
          <div className="text-center md:text-left space-y-1">
            <p className="font-semibold text-text-main">
              {footer?.copyright || '© 2026 Alex Rivera. All rights reserved.'}
            </p>
            {footer?.tagline && (
              <p className="text-xs text-text-muted">
                {footer.tagline}
              </p>
            )}
          </div>

          {/* Center: Social Icons */}
          {footer?.showSocials && visibleSocials.length > 0 && (
            <div className="flex items-center gap-3">
              {visibleSocials.map((soc) => {
                const IconComponent = iconMap[soc.icon] || Globe;
                return (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.name}
                    className="p-2.5 rounded-xl bg-bg-base border border-border-color text-text-muted hover:text-primary hover:border-primary transition-colors"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          )}

          {/* Right: Back to Top Button */}
          <div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg-base border border-border-color text-text-main font-medium hover:text-primary hover:border-primary/50 transition-all shadow-sm group"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
