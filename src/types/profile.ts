// Profil verisi için tip tanımlamaları
export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    website: string;
  };
  social: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  experience: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
    technologies: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    period: string;
  }>;
  languages: Array<{
    name: string;
    level: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  interests: string[];
}
