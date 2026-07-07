import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowRight, Download, Mail, Globe, Sparkles } from 'lucide-react';
import { Github, Linkedin, Twitter } from '../common/BrandIcons';

const iconMap = {
  Github: Github,
  Linkedin: Linkedin,
  Twitter: Twitter,
  Mail: Mail,
  Globe: Globe,
};

const Hero = () => {
  const { data } = usePortfolio();
  const { hero, sectionVisibility } = data;

  if (!sectionVisibility?.hero) return null;

  const visibleSocials = (hero?.socials || []).filter((s) => s.visible);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Glowing Ambient Backdrop Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-gradient-to-tr from-primary/20 via-secondary/10 to-accent/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-primary/15 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Badge */}
            {hero?.badgeText && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 text-primary text-xs sm:text-sm font-semibold tracking-wide shadow-sm transform hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4 text-accent animate-spin-slow" />
                <span>{hero.badgeText}</span>
              </div>
            )}

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-main leading-tight sm:leading-none tracking-tight">
              <span>{hero?.titleStart || 'Building digital experiences that'} </span>
              <span className="text-gradient underline decoration-primary/30 decoration-wavy decoration-2 inline-block">
                {hero?.titleHighlight || 'inspire & perform'}
              </span>
              <span>{hero?.titleEnd || '.'}</span>
            </h1>

            {/* Subtitle / Bio Summary */}
            <p className="text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {hero?.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              {hero?.primaryCtaText && (
                <a
                  href={hero?.primaryCtaLink || '#projects'}
                  className="group relative inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-primary via-primary-hover to-secondary text-white font-semibold text-base shadow-xl glow-effect transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span>{hero.primaryCtaText}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              )}

              {hero?.secondaryCtaText && (
                <a
                  href={hero?.secondaryCtaLink || '#about'}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl glass-card text-text-main hover:text-primary font-semibold text-base shadow-md hover:shadow-lg hover:border-primary/50 transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Download className="w-5 h-5 text-primary" />
                  <span>{hero.secondaryCtaText}</span>
                </a>
              )}
            </div>

            {/* Social Links Row */}
            {visibleSocials.length > 0 && (
              <div className="pt-6 border-t border-border-color flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-text-muted">
                  Connect With Me:
                </span>
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
                        className="p-3 rounded-xl glass-card text-text-muted hover:text-primary hover:border-primary hover:scale-110 shadow-sm transition-all duration-200 group"
                      >
                        <IconComponent className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Visual / Avatar & Floating Stat Cards */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Animated Backdrop Gradient Ring */}
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1.5 shadow-2xl animate-float">
              
              <div className="w-full h-full rounded-full overflow-hidden bg-bg-card border-4 border-bg-card relative">
                <img
                  src={hero?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop'}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay Subtle Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Stat Pills */}
              {(hero?.stats || []).map((stat, idx) => {
                const positions = [
                  'top-2 -left-6 sm:-left-10',
                  'bottom-6 -right-6 sm:-right-10',
                  '-bottom-6 left-8 sm:left-12'
                ];
                const posClass = positions[idx % positions.length];

                return (
                  <div
                    key={stat.id || idx}
                    className={`absolute ${posClass} glass-card px-4 py-3 rounded-2xl shadow-xl border border-primary/20 flex items-center gap-3 animate-bounce`}
                    style={{ animationDuration: `${4 + idx * 1.5}s` }}
                  >
                    <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-primary to-accent animate-ping" />
                    <div>
                      <div className="text-lg sm:text-xl font-bold font-heading text-text-main leading-none">
                        {stat.value}
                      </div>
                      <div className="text-xs font-medium text-text-muted mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
