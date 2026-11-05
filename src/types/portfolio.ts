export type BackgroundTheme = '3d' | 'dark-simple' | 'light';

export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
  whatsapp: string;
  leetcode: string;
  hackerrank: string;
  codechef: string;
  unstop: string;
  kaggle: string;
  geeksforgeeks: string;
}

export interface ProfileData {
  name: string;
  title: string;
  subtitle: string;
  degree: string;
  college: string;
  academicYear: string;
  age: number;
  location: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  resumeUrl: string;
  resumeAvailable: boolean;
  showPhonePublicly: boolean;
  phone: string;
  email: string;
  socials: SocialLinks;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number;
  description: string;
  status: 'core' | 'learning';
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  status: string;
  shortDescription: string;
  detailedDescription: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
  completionDate: string;
  featured: boolean;
  icon?: string;
  highlights?: string[];
  imageUrl?: string;
}

export interface LearningTopic {
  id: string;
  title: string;
  status: 'Completed' | 'Ongoing';
  issuer: string;
  completionDate: string;
  description: string;
  skills: string[];
}

export interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

export interface LearningData {
  topics: LearningTopic[];
  milestones: MilestoneItem[];
}

export interface HackathonItem {
  id: string;
  name: string;
  role: string;
  teamMembers: string;
  date: string;
  result: string;
  technologies: string[];
  description: string;
  learnings?: string;
  imageUrl?: string;
  certificateUrl?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  fileUrl: string;
  credentialUrl: string;
}

export interface RecentRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
}

export interface GithubStats {
  username: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  publicGists: number;
  status: string;
  bio?: string;
  avatarUrl?: string;
  recentRepos?: RecentRepo[];
}

export interface CodingStatsData {
  lastSynced: string;
  github: GithubStats;
  leetcode: {
    username: string;
    profileUrl: string;
    solvedTotal: number;
    easy: number;
    medium: number;
    hard: number;
    status: string;
  };
  codechef: {
    username: string;
    profileUrl: string;
    rating: string;
    status: string;
  };
  hackerrank: {
    username: string;
    profileUrl: string;
    badges: string[];
    status: string;
  };
  unstop: {
    username: string;
    profileUrl: string;
    status: string;
  };
  kaggle: {
    username: string;
    profileUrl: string;
    status: string;
  };
  geeksforgeeks: {
    username: string;
    profileUrl: string;
    status: string;
  };
}

export interface SiteSettings {
  visualTheme: string;
  particlesDensity: 'low' | 'medium' | 'high';
  show3DBackground: boolean;
  interactiveCursor: boolean;
  soundEffects: boolean;
}

export interface PortfolioData {
  profile: ProfileData;
  skills: SkillItem[];
  projects: ProjectItem[];
  learning: LearningData;
  hackathons: HackathonItem[];
  certificates: CertificateItem[];
  codingStats: CodingStatsData;
  settings: SiteSettings;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  lastVisit: string;
  recentSessions?: Array<{
    timestamp: string;
    device: string;
    page: string;
  }>;
}
