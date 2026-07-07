import React from 'react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { Code2, FolderGit2, Plus, Trash2, Star, Image as ImageIcon, Link } from 'lucide-react';
import { Github } from '../../common/BrandIcons';

const SkillsProjectsEditor = () => {
  const { data, updateData } = usePortfolio();
  const { skills, projects } = data;

  // Skills Handlers
  const handleSkillsChange = (key, val) => {
    updateData('skills', (prev) => ({ ...prev, [key]: val }));
  };

  const addSkillCategory = () => {
    const newId = `cat-${Date.now()}`;
    updateData('skills', (prev) => ({
      ...prev,
      categories: [
        ...prev.categories,
        { id: newId, name: 'New Category', skills: [] },
      ],
    }));
  };

  const deleteSkillCategory = (catId) => {
    updateData('skills', (prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== catId),
    }));
  };

  const updateCategoryName = (catId, name) => {
    updateData('skills', (prev) => ({
      ...prev,
      categories: prev.categories.map((c) => (c.id === catId ? { ...c, name } : c)),
    }));
  };

  const addSkillToCategory = (catId) => {
    const newSkill = { id: `skill-${Date.now()}`, name: 'New Skill', level: '85%', icon: 'Code2' };
    updateData('skills', (prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === catId ? { ...c, skills: [...(c.skills || []), newSkill] } : c
      ),
    }));
  };

  const deleteSkillFromCategory = (catId, skillId) => {
    updateData('skills', (prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === catId ? { ...c, skills: c.skills.filter((s) => s.id !== skillId) } : c
      ),
    }));
  };

  const updateSkill = (catId, skillId, field, val) => {
    updateData('skills', (prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === catId
          ? {
              ...c,
              skills: c.skills.map((s) => (s.id === skillId ? { ...s, [field]: val } : s)),
            }
          : c
      ),
    }));
  };

  // Projects Handlers
  const handleProjectsChange = (key, val) => {
    updateData('projects', (prev) => ({ ...prev, [key]: val }));
  };

  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: 'New Amazing Project',
      category: 'Full Stack App',
      description: 'A detailed description of what this project does and the problem it solves.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
      tags: ['React', 'Tailwind', 'Node.js'],
    };
    updateData('projects', (prev) => ({
      ...prev,
      items: [newProj, ...prev.items],
    }));
  };

  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      updateData('projects', (prev) => ({
        ...prev,
        items: prev.items.filter((p) => p.id !== id),
      }));
    }
  };

  const updateProject = (id, field, val) => {
    updateData('projects', (prev) => ({
      ...prev,
      items: prev.items.map((p) => {
        if (p.id !== id) return p;
        if (field === 'tags') {
          // split by comma and trim
          const tagsArray = typeof val === 'string' ? val.split(',').map((t) => t.trim()).filter(Boolean) : val;
          return { ...p, tags: tagsArray };
        }
        return { ...p, [field]: val };
      }),
    }));
  };

  return (
    <div className="space-y-12 animate-fadeIn text-sm">
      
      {/* SKILLS & TECH SECTION CONTENT */}
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" />
            <span>Skills Section Headers</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Section Badge</span>
              <input
                type="text"
                value={skills?.badgeText || ''}
                onChange={(e) => handleSkillsChange('badgeText', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Section Title Heading</span>
              <input
                type="text"
                value={skills?.title || ''}
                onChange={(e) => handleSkillsChange('title', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <span className="text-xs font-semibold text-text-muted">Subtitle Description</span>
              <input
                type="text"
                value={skills?.subtitle || ''}
                onChange={(e) => handleSkillsChange('subtitle', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Categories & Skills Lists */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-heading font-bold text-base text-text-main">Skill Categories</span>
            <button
              onClick={addSkillCategory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="space-y-6">
            {(skills?.categories || []).map((cat) => (
              <div key={cat.id} className="p-5 rounded-2xl bg-bg-base border border-border-color space-y-4">
                <div className="flex items-center justify-between gap-4 pb-3 border-b border-border-color">
                  <input
                    type="text"
                    value={cat.name}
                    onChange={(e) => updateCategoryName(cat.id, e.target.value)}
                    className="font-heading font-bold text-base bg-transparent border-0 text-text-main focus:outline-none focus:ring-1 focus:ring-primary px-2 py-1 rounded w-full max-w-sm"
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => addSkillToCategory(cat.id)}
                      className="px-2.5 py-1 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-colors text-xs font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Skill</span>
                    </button>
                    <button
                      onClick={() => deleteSkillCategory(cat.id)}
                      className="p-1.5 rounded-lg text-text-muted hover:text-rose-500 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Skill Pills inside Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(cat.skills || []).map((skill) => (
                    <div key={skill.id} className="p-3 rounded-xl bg-bg-card border border-border-color space-y-2 relative group">
                      <button
                        onClick={() => deleteSkillFromCategory(cat.id, skill.id)}
                        className="absolute top-2 right-2 p-1 text-text-muted hover:text-rose-500 transition-colors"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2 pr-6">
                        <select
                          value={skill.icon}
                          onChange={(e) => updateSkill(cat.id, skill.id, 'icon', e.target.value)}
                          className="px-2 py-1 rounded bg-bg-base border border-border-color text-xs font-mono"
                        >
                          <option value="Code2">Code</option>
                          <option value="Palette">Palette</option>
                          <option value="Cpu">Cpu</option>
                          <option value="Server">Server</option>
                          <option value="Database">DB</option>
                          <option value="Box">Box</option>
                          <option value="Cloud">Cloud</option>
                          <option value="Figma">Figma</option>
                          <option value="GitBranch">Git</option>
                          <option value="CheckSquare">Test</option>
                          <option value="Workflow">CICD</option>
                        </select>

                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateSkill(cat.id, skill.id, 'name', e.target.value)}
                          placeholder="Skill Name"
                          className="w-full px-2.5 py-1 rounded bg-bg-base border border-border-color text-text-main font-semibold text-xs focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="text-[10px] text-text-muted">Proficiency / Level badge:</span>
                        <input
                          type="text"
                          value={skill.level}
                          onChange={(e) => updateSkill(cat.id, skill.id, 'level', e.target.value)}
                          placeholder="95%"
                          className="w-20 px-2 py-0.5 rounded bg-bg-base border border-border-color text-text-main font-mono text-xs text-center focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-border-color" />

      {/* PROJECTS SHOWCASE SECTION CONTENT */}
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-bold uppercase tracking-wider text-text-muted flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-secondary" />
            <span>Projects Section Headers</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Section Badge</span>
              <input
                type="text"
                value={projects?.badgeText || ''}
                onChange={(e) => handleProjectsChange('badgeText', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-text-muted">Section Title Heading</span>
              <input
                type="text"
                value={projects?.title || ''}
                onChange={(e) => handleProjectsChange('title', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <span className="text-xs font-semibold text-text-muted">Subtitle Description</span>
              <input
                type="text"
                value={projects?.subtitle || ''}
                onChange={(e) => handleProjectsChange('subtitle', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-bg-base border border-border-color text-text-main focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Projects List Manager */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-heading font-bold text-base text-text-main">Portfolio Projects</span>
            <button
              onClick={addProject}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-colors text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project Card</span>
            </button>
          </div>

          <div className="space-y-6">
            {(projects?.items || []).map((proj) => (
              <div key={proj.id} className="p-5 rounded-3xl bg-bg-base border border-border-color space-y-4 relative group">
                <div className="flex items-center justify-between pb-3 border-b border-border-color">
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-bold text-base text-text-main">
                      {proj.title || 'Untitled Project'}
                    </span>
                    <button
                      onClick={() => updateProject(proj.id, 'featured', !proj.featured)}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors ${
                        proj.featured
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-bg-card text-text-muted border border-border-color'
                      }`}
                    >
                      <Star className={`w-3 h-3 ${proj.featured ? 'fill-current' : ''}`} />
                      <span>{proj.featured ? 'Featured' : 'Standard'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => deleteProject(proj.id)}
                    className="p-2 rounded-lg text-text-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-text-muted">Project Title</span>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color font-semibold text-text-main focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-text-muted">Category Badge (e.g. Full Stack App)</span>
                    <input
                      type="text"
                      value={proj.category}
                      onChange={(e) => updateProject(proj.id, 'category', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <span className="text-xs font-semibold text-text-muted">Project Description</span>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main focus:outline-none focus:border-primary resize-none"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <span className="text-xs font-semibold text-text-muted flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Preview Image URL</span>
                    </span>
                    <input
                      type="text"
                      value={proj.image}
                      onChange={(e) => updateProject(proj.id, 'image', e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main font-mono text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-text-muted flex items-center gap-1">
                      <Link className="w-3.5 h-3.5" />
                      <span>Live Demo Link URL</span>
                    </span>
                    <input
                      type="text"
                      value={proj.demoUrl}
                      onChange={(e) => updateProject(proj.id, 'demoUrl', e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main font-mono text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-text-muted flex items-center gap-1">
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub Source Code URL</span>
                    </span>
                    <input
                      type="text"
                      value={proj.githubUrl}
                      onChange={(e) => updateProject(proj.id, 'githubUrl', e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main font-mono text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <span className="text-xs font-semibold text-text-muted">Technology Tags (comma separated)</span>
                    <input
                      type="text"
                      value={Array.isArray(proj.tags) ? proj.tags.join(', ') : proj.tags || ''}
                      onChange={(e) => updateProject(proj.id, 'tags', e.target.value)}
                      placeholder="React, TypeScript, Node.js, Tailwind"
                      className="w-full px-3 py-2 rounded-xl bg-bg-card border border-border-color text-text-main font-mono text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default SkillsProjectsEditor;
