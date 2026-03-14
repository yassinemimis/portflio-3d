export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  color: string;
  link: string;
  position: [number, number, number];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  type: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  color: string;
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  portfolio: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  tagline: string;
  about: string;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  contact: Contact;
}

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Yassine Mimis",
  role: "Full-Stack Developer",
  tagline: "Building digital worlds, one commit at a time.",
  about: `I'm a passionate full-stack developer who thrives at the
intersection of engineering precision and creative design.
I build immersive, performant web experiences — from architecture
to pixel — always pushing the craft forward.

My playground ranges from low-level WebGL shaders to high-level
product thinking. I believe great code is indistinguishable
from great design.`,
  skills: [
    { name: "React / Next.js",  level: 95, color: "#61DAFB" },
    { name: "Three.js / WebGL", level: 87, color: "#00FFD1" },
    { name: "Node.js",          level: 88, color: "#68A063" },
    { name: "TypeScript",       level: 91, color: "#3178C6" },
    { name: "Python / FastAPI", level: 79, color: "#FFD43B" },
    { name: "UI / UX Design",   level: 83, color: "#FF6B6B" },
  ],
  projects: [
    {
      id: "p1",
      title: "Mimis Portfolio",
      description: "3D interactive developer portfolio built with React Three Fiber, Drei & GSAP.",
      tech: ["Next.js", "Three.js", "GSAP"],
      color: "#00FFD1",
      link: "https://mimis-one.vercel.app",
      position: [-3.5, 5.5, -1.0],
    },
    {
      id: "p2",
      title: "Collab Board",
      description: "Real-time collaborative whiteboard powered by WebSockets and CRDT.",
      tech: ["React", "Socket.io", "Node.js"],
      color: "#61DAFB",
      link: "#",
      position: [3.5, 5.5, -1.0],
    },
    {
      id: "p3",
      title: "AI Reviewer",
      description: "AI-powered code review and feedback platform with LLM integration.",
      tech: ["Python", "FastAPI", "React"],
      color: "#FF6B6B",
      link: "#",
      position: [0.0, 8.0, -2.0],
    },
  ],
  experiences: [
    {
      id: "e1",
      company: "9547-1413 Québec inc.",
      position: "Mobile App Developer Intern",
      period: "January 2026 – Present",
      type: "Internship",
      location: "Remote — Québec, Canada",
      description: "Designing and developing a hybrid mobile application (iOS/Android) with advanced offline capabilities for field teams.",
      achievements: [
        "Offline-first architecture using Ionic/Capacitor with bidirectional sync",
        "Local storage with IndexedDB via Dexie.js and File System API",
        "Conflict resolution strategies for local/remote data sync",
        "Device features: geolocation, QR scanning, push notifications",
        "CI/CD with GitHub Actions, 80%+ test coverage",
        "Scrum/Agile in fully remote international environment",
      ],
      technologies: ["Ionic", "Capacitor", "React", "IndexedDB", "Dexie.js", "Node.js", "GitHub Actions"],
      color: "#FF6B6B",
    },
    {
      id: "e2",
      company: "Freelance",
      position: "Freelance Developer",
      period: "March 2023 – Present",
      type: "Freelance",
      location: "Remote",
      description: "Developing web, mobile, and desktop applications for clients in various domains.",
      achievements: [
        "Modern web apps with React.js and Node.js",
        "Cross-platform mobile apps with Flutter",
        "Desktop applications with Electron and JavaFX",
        "Multiple concurrent project management",
      ],
      technologies: ["React.js", "Node.js", "PHP", "Flutter", "Electron", "JavaFX"],
      color: "#61DAFB",
    },
    {
      id: "e3",
      company: "Naltis Business Development",
      position: "Mobile App Development Intern",
      period: "March 2025",
      type: "Internship",
      location: "Tlemcen, Algeria",
      description: "Developing professional mobile applications using Flutter with a focus on architecture and testing.",
      achievements: [
        "Flutter apps with strong clean architecture",
        "Best practices in app engineering",
        "Comprehensive test coverage",
        "Performance optimization and UX improvements",
      ],
      technologies: ["Flutter", "Dart", "State Management", "Testing", "Architecture"],
      color: "#A78BFA",
    },
    {
      id: "e4",
      company: "IFRI, Béjaïa",
      position: "Data Analytics Intern",
      period: "Dec 2023 – Jan 2024",
      type: "Internship",
      location: "Béjaïa, Algeria",
      description: "Data analysis projects and interactive dashboards.",
      achievements: [
        "ETL processes using Talend",
        "SQL Server database management",
        "Interactive dashboards with Power BI",
        "Business insights from data analysis",
      ],
      technologies: ["Talend", "SQL Server", "Power BI", "ETL", "Data Analytics"],
      color: "#FB923C",
    },
    {
      id: "e5",
      company: "InterEntreprise, Tlemcen",
      position: "Software Development Intern",
      period: "June 2023",
      type: "Internship",
      location: "Tlemcen, Algeria",
      description: "Desktop application for school management using JavaFX.",
      achievements: [
        "Comprehensive school management system",
        "Modern UI with JavaFX",
        "Efficient database design",
        "OOP principles and design patterns",
      ],
      technologies: ["JavaFX", "Java", "MySQL", "JDBC", "Scene Builder"],
      color: "#34D399",
    },
  ],
  contact: {
    email: "yassine@mimis.dev",
    github: "https://github.com/yassinemimis",
    linkedin: "https://linkedin.com/in/yassinemimis",
    portfolio: "https://mimis-one.vercel.app",
  },
};

export const ORB_CONFIG = [
  { id: "about",      label: "About",      position: [-5.0,  0.3,  1.2] as [number,number,number], color: "#00FFD1", colorHex: "#00FFD1", icon: "◈" },
  { id: "skills",     label: "Skills",     position: [-4, 0.3, -2] as [number,number,number], color: "#61DAFB", colorHex: "#61DAFB", icon: "◆" },
  { id: "experience", label: "Experience", position: [ 0.0, 0.3, -4.5] as [number,number,number], color: "#A78BFA", colorHex: "#A78BFA", icon: "◐" },
  { id: "projects",   label: "Projects",   position: [ 4, 0.3, -2] as [number,number,number], color: "#FF6B6B", colorHex: "#FF6B6B", icon: "◉" },
  { id: "contact",    label: "Contact",    position: [ 5.0,  0.3,  1.2] as [number,number,number], color: "#FFD43B", colorHex: "#FFD43B", icon: "◎" },
];

export const CAM_PRESETS: Record<string, { pos: [number,number,number]; at: [number,number,number] }> = {
  home:       { pos: [ 0,   1.8,  9.2], at: [ 0,   0.0,  0   ] },
  about:      { pos: [-6.2, 2.2,  4.0], at: [-5.0, 0.3,  1.2 ] },
  skills:     { pos: [-3.0, 1.2, -0.8], at: [-2.2,-0.5, -2.8 ] },
  experience: { pos: [ 0,   1.5, -2.0], at: [ 0,  -1.0, -4.5 ] },
  projects:   { pos: [ 0,   7.0, 10.0], at: [ 0,   6.0, -1.0 ] },
  contact:    { pos: [ 6.2, 2.2,  4.0], at: [ 5.0, 0.3,  1.2 ] },
};