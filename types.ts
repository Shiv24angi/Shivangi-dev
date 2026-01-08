
export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  tech: string[];
  link?: string;
  github?: string;
  status: 'live' | 'github' | 'upcoming';
  image?: string;
  features?: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  details: string[];
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  result: string;
  date: string;
}

export enum Section {
  HERO = 'hero',
  ABOUT = 'about',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  EXPERIENCE = 'experience',
  ACHIEVEMENTS = 'achievements',
  CONTACT = 'contact'
}
