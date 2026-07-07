import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ExternalLink, Sparkles, Star, FolderGit2, Filter } from 'lucide-react';
import { Github } from '../common/BrandIcons';

const Projects = () => {
  const { data } = usePortfolio();
  const { projects, sectionVisibility } = data;
  const [activeFilter, setActiveFilter] = useState('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  if (!sectionVisibility?.projects) return null;

  const items = projects?.items || [];

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(items.map((p) => p.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [items]);

  // Filter items
  const filteredProjects = useMemo(() => {
    return items.filter((proj) => {
      const matchesCategory = activeFilter === 'All' || proj.category === activeFilter;
      const matchesFeatured = !showFeaturedOnly || proj.featured;
      return matchesCategory && matchesFeatured;
    });
  }, [items, activeFilter, showFeaturedOnly]);

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          {projects?.badgeText && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/30 text-primary text-xs sm:text-sm font-semibold tracking-wide">
              <FolderGit2 className="w-4 h-4 text-secondary" />
              <span>{projects.badgeText}</span>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
            {projects?.title || 'Featured Creations'}
          </h2>
          
          <p className="text-base sm:text-lg text-text-muted">
            {projects?.subtitle}
          </p>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-2" />
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 pb-6 border-b border-border-color">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                    : 'bg-bg-card border border-border-color text-text-muted hover:text-text-main hover:border-primary/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Toggle */}
          <button
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-200 ${
              showFeaturedOnly
                ? 'bg-amber-500/10 border-amber-500 text-amber-500 shadow-sm'
                : 'bg-bg-card border-border-color text-text-muted hover:text-text-main'
            }`}
          >
            <Star className={`w-4 h-4 ${showFeaturedOnly ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>Featured Only</span>
          </button>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-3xl border border-border-color">
            <Filter className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-text-main">No projects found</h3>
            <p className="text-sm text-text-muted mt-1">Try adjusting your category filters or turning off Featured Only.</p>
            <button
              onClick={() => { setActiveFilter('All'); setShowFeaturedOnly(false); }}
              className="mt-6 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredProjects.map((proj, idx) => (
              <div
                key={proj.id || idx}
                className="glass-card rounded-3xl border border-border-color overflow-hidden shadow-lg hover:shadow-2xl hover:border-primary/50 flex flex-col justify-between group transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-bg-base border-b border-border-color">
                    <img
                      src={proj.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Dark Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-bg-card/90 backdrop-blur-md text-text-main font-semibold text-xs border border-border-color shadow-sm">
                        {proj.category || 'App'}
                      </span>

                      {proj.featured && (
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500 text-white font-bold text-xs shadow-md animate-pulse">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="text-2xl font-extrabold font-heading text-text-main group-hover:text-primary transition-colors">
                      {proj.title}
                    </h3>

                    <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Tech Tags */}
                    {proj.tags && proj.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {proj.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="px-3 py-1 rounded-lg bg-bg-base border border-border-color text-xs font-mono font-medium text-text-muted group-hover:border-primary/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-4 border-t border-border-color/50 flex items-center justify-between gap-4">
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm shadow-md hover:shadow-xl hover:opacity-95 transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass-card text-text-main hover:text-primary hover:border-primary font-semibold text-sm border border-border-color shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;
