import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { MapPin, GraduationCap, CheckCircle2, Sparkles, User, Award } from 'lucide-react';

const iconMap = {
  MapPin: MapPin,
  GraduationCap: GraduationCap,
  CheckCircle2: CheckCircle2,
  Sparkles: Sparkles,
  Award: Award,
  User: User,
};

const About = () => {
  const { data } = usePortfolio();
  const { about, sectionVisibility } = data;

  if (!sectionVisibility?.about) return null;

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          {about?.badgeText && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/30 text-primary text-xs sm:text-sm font-semibold tracking-wide">
              <User className="w-4 h-4 text-secondary" />
              <span>{about.badgeText}</span>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
            {about?.title || 'Engineering with purpose, designing with passion.'}
          </h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        {/* Bio + Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text Bio */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-text-muted leading-relaxed font-normal">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-border-color shadow-lg space-y-6 relative group hover:border-primary/40 transition-colors duration-300">
              <div className="absolute top-0 right-0 -mt-3 -mr-3 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              
              <p className="text-text-main font-medium leading-relaxed">
                {about?.description1}
              </p>

              <p>
                {about?.description2}
              </p>
            </div>
          </div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {(about?.highlights || []).map((item, index) => {
              const IconComponent = iconMap[item.icon] || Award;
              
              return (
                <div
                  key={item.id || index}
                  className="glass-card p-5 rounded-2xl border border-border-color shadow-md hover:shadow-xl hover:border-primary/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <div className="overflow-hidden">
                    <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      {item.title}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-text-main font-heading truncate mt-0.5">
                      {item.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
