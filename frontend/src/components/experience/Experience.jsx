import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Briefcase, GraduationCap, MapPin, Calendar, History } from 'lucide-react';

const Experience = () => {
  const { data } = usePortfolio();
  const { experience, sectionVisibility } = data;
  const [filterType, setFilterType] = useState('all'); // 'all', 'work', 'education'

  if (!sectionVisibility?.experience) return null;

  const items = experience?.items || [];
  const filteredItems = items.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <section id="experience" className="py-20 md:py-28 relative bg-bg-card/30 border-y border-border-color overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          {experience?.badgeText && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/30 text-primary text-xs sm:text-sm font-semibold tracking-wide">
              <History className="w-4 h-4 text-secondary" />
              <span>{experience.badgeText}</span>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
            {experience?.title || 'Experience & Education'}
          </h2>
          
          <p className="text-base sm:text-lg text-text-muted">
            {experience?.subtitle}
          </p>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-2" />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-3 mb-16">
          {[
            { id: 'all', label: 'All Journey', icon: History },
            { id: 'work', label: 'Work Experience', icon: Briefcase },
            { id: 'education', label: 'Education', icon: GraduationCap },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = filterType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                    : 'bg-bg-card border border-border-color text-text-muted hover:text-text-main hover:border-primary/40'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Glowing Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-secondary to-accent rounded-full opacity-60" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {filteredItems.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isWork = item.type === 'work';
              const IconComponent = isWork ? Briefcase : GraduationCap;

              return (
                <div
                  key={item.id || idx}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } group`}
                >
                  {/* Center Node Icon */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 mt-1 w-10 h-10 rounded-full bg-bg-card border-2 border-primary shadow-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-125 transition-all duration-300 z-10">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'}`}>
                    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-border-color shadow-md hover:shadow-2xl hover:border-primary/50 transition-all duration-300 transform group-hover:-translate-y-1 relative">
                      
                      {/* Top Dates & Type Pill */}
                      <div className={`flex flex-wrap items-center gap-3 mb-3 ${isEven ? 'sm:justify-end' : 'sm:justify-start'}`}>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-xs font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.period}</span>
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs font-medium text-text-muted">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{item.location}</span>
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-text-main group-hover:text-primary transition-colors">
                        {item.role}
                      </h3>

                      <div className="text-sm sm:text-base font-bold text-secondary mt-0.5 mb-4">
                        @ {item.company}
                      </div>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                        {item.description}
                      </p>
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

export default Experience;
