export type Category = 
  | 'All'
  | 'AI & Coding'
  | 'Developer'
  | 'Hosting'
  | 'Domains'
  | 'Cloud'
  | 'Student Perks';

export type SectionKey = 
  | 'featured' 
  | 'agentic_ide' 
  | 'hosting_domains' 
  | 'cloud_credits' 
  | 'bundles';

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: 'AI & Coding' | 'Developer' | 'Hosting' | 'Domains' | 'Cloud' | 'Student Perks';
  badge?: string;
  ctaText: string;
  url: string;
  section: SectionKey;
  tags: string[];
  iconName: string;
  logoKey?: string;
  logoUrl?: string;
  colorTheme?: string;
  requirements?: string;
  howToClaim?: string;
  valueDescription?: string;
}

export interface UserSubmittedTool {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  badge?: string;
  submittedAt: string;
}
