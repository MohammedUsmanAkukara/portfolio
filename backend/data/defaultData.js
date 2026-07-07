const initialPortfolioData = {
  theme: {
    preset: 'indigo',
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    secondary: '#06b6d4',
    accent: '#f43f5e',
    darkMode: true,
    fontMain: 'Inter',
    fontHeading: 'Outfit',
  },
  header: {
    logoText: "Alex.dev",
    logoAccent: "</>",
    ctaText: "Hire Me",
    ctaLink: "#contact",
    navLinks: [
      { id: 'home', label: 'Home', href: '#home', visible: true },
      { id: 'about', label: 'About', href: '#about', visible: true },
      { id: 'skills', label: 'Skills', href: '#skills', visible: true },
      { id: 'projects', label: 'Projects', href: '#projects', visible: true },
      { id: 'experience', label: 'Experience', href: '#experience', visible: true },
      { id: 'testimonials', label: 'Testimonials', href: '#testimonials', visible: true },
      { id: 'contact', label: 'Contact', href: '#contact', visible: true }
    ]
  },
  hero: {
    badgeText: "👋 Welcome to my creative universe",
    titleStart: "Building digital experiences that",
    titleHighlight: "inspire & perform",
    titleEnd: ".",
    subtitle: "I am a Full-Stack Engineer and UI/UX Designer passionate about crafting scalable, accessible, and ultra-fast web applications with modern technologies.",
    primaryCtaText: "Explore My Work",
    primaryCtaLink: "#projects",
    secondaryCtaText: "Download Resume",
    secondaryCtaLink: "#about",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    stats: [
      { id: '1', value: "6+", label: "Years Experience" },
      { id: '2', value: "45+", label: "Projects Shipped" },
      { id: '3', value: "100%", label: "Client Satisfaction" }
    ],
    socials: [
      { id: 'github', name: 'GitHub', icon: 'Github', url: 'https://github.com', visible: true },
      { id: 'linkedin', name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com', visible: true },
      { id: 'twitter', name: 'Twitter / X', icon: 'Twitter', url: 'https://twitter.com', visible: true },
      { id: 'email', name: 'Email', icon: 'Mail', url: 'mailto:hello@example.com', visible: true }
    ]
  },
  about: {
    badgeText: "Who I Am",
    title: "Engineering with purpose, designing with passion.",
    description1: "With over 6 years of industry experience, I specialize in bridging the gap between design and technical implementation. I believe that a great product is not just about clean code, but about intuitive workflows and delightful user experiences.",
    description2: "When I am not debugging distributed systems or animating interfaces, you can find me contributing to open-source software, mentoring aspiring developers, and experimenting with generative AI.",
    highlights: [
      { id: '1', title: "Location", value: "San Francisco, CA", icon: "MapPin" },
      { id: '2', title: "Education", value: "B.S. in Computer Science", icon: "GraduationCap" },
      { id: '3', title: "Availability", value: "Open for freelance & full-time", icon: "CheckCircle2" },
      { id: '4', title: "Philosophy", value: "User-centric & performance-first", icon: "Sparkles" }
    ]
  },
  skills: {
    badgeText: "Technical Arsenal",
    title: "Tools & Technologies",
    subtitle: "A curated list of languages, frameworks, and utilities I use to build scalable web applications.",
    categories: [
      {
        id: 'frontend',
        name: 'Frontend Development',
        skills: [
          { id: '1', name: 'React.js', level: '95%', icon: 'Code2' },
          { id: '2', name: 'Next.js', level: '90%', icon: 'Code2' },
          { id: '3', name: 'TypeScript', level: '88%', icon: 'Code2' },
          { id: '4', name: 'Tailwind CSS', level: '98%', icon: 'Palette' },
          { id: '5', name: 'Vue.js', level: '80%', icon: 'Code2' },
          { id: '6', name: 'Redux / Zustand', level: '85%', icon: 'Cpu' }
        ]
      },
      {
        id: 'backend',
        name: 'Backend & Cloud',
        skills: [
          { id: '7', name: 'Node.js & Express', level: '92%', icon: 'Server' },
          { id: '8', name: 'Python / FastAPI', level: '85%', icon: 'Server' },
          { id: '9', name: 'PostgreSQL & Prisma', level: '88%', icon: 'Database' },
          { id: '10', name: 'MongoDB', level: '82%', icon: 'Database' },
          { id: '11', name: 'Docker & Kubernetes', level: '78%', icon: 'Box' },
          { id: '12', name: 'AWS / Vercel', level: '85%', icon: 'Cloud' }
        ]
      },
      {
        id: 'design',
        name: 'Design & Tools',
        skills: [
          { id: '13', name: 'Figma & UI/UX', level: '90%', icon: 'Figma' },
          { id: '14', name: 'Git & GitHub Workflows', level: '95%', icon: 'GitBranch' },
          { id: '15', name: 'Jest / Playwright Testing', level: '80%', icon: 'CheckSquare' },
          { id: '16', name: 'CI/CD Pipelines', level: '82%', icon: 'Workflow' }
        ]
      }
    ]
  },
  projects: {
    badgeText: "Portfolio Showcase",
    title: "Featured Creations",
    subtitle: "Explore some of my most impactful work spanning full-stack apps, AI tools, and UI libraries.",
    items: [
      {
        id: 'proj-1',
        title: "HyperPulse Analytics",
        category: "Full Stack App",
        description: "A real-time financial data visualization dashboard with WebSocket streaming, interactive TradingView charts, and automated anomaly detection.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        demoUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: true,
        tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "WebSockets"]
      },
      {
        id: 'proj-2',
        title: "Nebula AI Studio",
        category: "AI & Machine Learning",
        description: "An intuitive generative AI sandbox allowing creators to compose multi-modal workflows with custom LLM prompts and image synthesis models.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        demoUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: true,
        tags: ["Next.js", "Python", "FastAPI", "OpenAI API", "Tailwind"]
      },
      {
        id: 'proj-3',
        title: "Zenith Design System",
        category: "Open Source / UI",
        description: "An accessible, highly customizable component library built for rapid enterprise development with zero-runtime CSS in JS.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
        demoUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: false,
        tags: ["React", "Storybook", "Tailwind CSS", "Figma", "Rollup"]
      },
      {
        id: 'proj-4',
        title: "OmniCart E-Commerce Suite",
        category: "Full Stack App",
        description: "A high-performance headless commerce platform featuring Stripe checkout, inventory management, and multi-currency support.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        demoUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: false,
        tags: ["Next.js", "PostgreSQL", "Prisma", "Stripe", "Redis"]
      }
    ]
  },
  experience: {
    badgeText: "Career Timeline",
    title: "Experience & Education",
    subtitle: "A chronological overview of my professional growth, key roles, and academic achievements.",
    items: [
      {
        id: 'exp-1',
        type: 'work',
        role: "Senior Full-Stack Engineer",
        company: "Vanguard Tech Inc.",
        period: "2023 - Present",
        location: "San Francisco, CA",
        description: "Leading the development of core distributed web platforms. Reduced page load times by 45% through micro-frontend architecture and mentored junior developers."
      },
      {
        id: 'exp-2',
        type: 'work',
        role: "Frontend Team Lead",
        company: "Apex Digital Solutions",
        period: "2021 - 2023",
        location: "Remote / Austin, TX",
        description: "Spearheaded the migration of legacy monolithic React apps to Next.js. Established company-wide UI/UX design tokens and automated testing pipelines."
      },
      {
        id: 'exp-3',
        type: 'work',
        role: "Software Engineer",
        company: "CloudScale Systems",
        period: "2019 - 2021",
        location: "Seattle, WA",
        description: "Developed REST and GraphQL APIs using Node.js and PostgreSQL. Designed real-time monitoring dashboards used by 10,000+ daily active users."
      },
      {
        id: 'exp-4',
        type: 'education',
        role: "B.S. in Computer Science",
        company: "University of California",
        period: "2015 - 2019",
        location: "Berkeley, CA",
        description: "Graduated Magna Cum Laude. Focused on Software Engineering, Distributed Systems, and Human-Computer Interaction."
      }
    ]
  },
  testimonials: {
    badgeText: "Endorsements",
    title: "Client & Peer Testimonials",
    subtitle: "Hear what colleagues, engineering managers, and clients say about collaborating with me.",
    items: [
      {
        id: 'test-1',
        quote: "Alex is hands down one of the most talented full-stack engineers I have ever worked with. His ability to translate complex design systems into clean, responsive code is unmatched.",
        author: "Sarah Jenkins",
        role: "VP of Product at Vanguard Tech",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
      },
      {
        id: 'test-2',
        quote: "Working with Alex on Nebula AI Studio was exceptional. He not only delivered features ahead of schedule but also contributed invaluable UX insights that doubled user engagement.",
        author: "Marcus Vance",
        role: "Founder & CEO, Nebula AI",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
      },
      {
        id: 'test-3',
        quote: "A rare blend of strong architecture skills and deep UI aesthetic sensibility. Alex will elevate any engineering team from day one.",
        author: "Elena Rostova",
        role: "Lead Architect at CloudScale",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
      }
    ]
  },
  contact: {
    badgeText: "Get In Touch",
    title: "Let's Build Something Great",
    subtitle: "Have a project in mind, looking to hire, or just want to chat about tech? Feel free to reach out anytime!",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA (PST / UTC-8)",
    availability: "Available for contract & full-time roles",
    formLabels: {
      nameLabel: "Your Name",
      namePlaceholder: "John Doe",
      emailLabel: "Email Address",
      emailPlaceholder: "john@example.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "Project Collaboration / Inquiry",
      messageLabel: "Your Message",
      messagePlaceholder: "Tell me about your project or opportunity...",
      submitBtn: "Send Message",
      successMsg: "Thank you! Your message has been sent successfully. I will get back to you soon."
    }
  },
  footer: {
    copyright: "© 2026 Alex Rivera. All rights reserved.",
    tagline: "Crafted with React.js, Tailwind CSS & Love.",
    showSocials: true
  },
  sectionVisibility: {
    hero: true,
    about: true,
    skills: true,
    projects: true,
    experience: true,
    testimonials: true,
    contact: true
  }
};

module.exports = initialPortfolioData;
