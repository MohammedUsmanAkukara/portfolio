import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Code2, Palette, Cpu, Server, Database, Box, Cloud, GitBranch, CheckSquare, Workflow, Terminal, Wrench, Sparkles } from 'lucide-react';
import { Figma } from '../common/BrandIcons';

const iconMap = {
  Code2: Code2,
  Palette: Palette,
  Cpu: Cpu,
  Server: Server,
  Database: Database,
  Box: Box,
  Cloud: Cloud,
  Figma: Figma,
  GitBranch: GitBranch,
  CheckSquare: CheckSquare,
  Workflow: Workflow,
  Terminal: Terminal,
  Wrench: Wrench,
};

const Skills = () => {
  const { data } = usePortfolio();
  const { skills, sectionVisibility } = data;

  if (!sectionVisibility?.skills) return null;

  return (
    <section id="skills" className="py-20 md:py-28 relative bg-bg-card/50 border-y border-border-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          {skills?.badgeText && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/30 text-primary text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-accent animate-spin-slow" />
              <span>{skills.badgeText}</span>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
            {skills?.title || 'Tools & Technologies'}
          </h2>
          
          <p className="text-base sm:text-lg text-text-muted">
            {skills?.subtitle}
          </p>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-2" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(skills?.categories || []).map((category, catIdx) => (
            <div
              key={category.id || catIdx}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-border-color shadow-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-color">
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-text-main group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    {(category.skills || []).length} items
                  </span>
                </div>

                {/* Skill Pills List */}
                <div className="grid grid-cols-1 gap-3.5">
                  {(category.skills || []).map((skill, skillIdx) => {
                    const IconComponent = iconMap[skill.icon] || Code2;
                    
                    return (
                      <div
                        key={skill.id || skillIdx}
                        className="p-3.5 rounded-2xl bg-bg-base/70 border border-border-color hover:border-primary/50 hover:bg-bg-card flex items-center justify-between gap-3 transform hover:scale-[1.02] transition-all duration-200"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 text-primary shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-sm sm:text-base text-text-main truncate font-sans">
                            {skill.name}
                          </span>
                        </div>

                        {skill.level && (
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs font-mono font-semibold text-text-muted px-2 py-0.5 rounded-md bg-bg-base">
                              {skill.level}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Decorative Progress Bottom Bar */}
              <div className="w-full h-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-full mt-6 opacity-40 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
