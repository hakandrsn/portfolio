import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';

// Profile verisi için hook
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const profileCollection = collection(db, 'profile');
      const q = query(profileCollection, orderBy('createdAt', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Profile verisi bulunamadı');
      }
      
      const doc = querySnapshot.docs[0];
      const data = doc.data() as any;
      return {
        id: doc.id,
        name: data.name,
        title: data.title,
        bio: data.bio,
        avatar: data.avatar,
        contact: data.contact,
        social: data.social,
        skills: data.skills,
        experience: data.experience,
        education: data.education,
        interests: data.interests,
        languages: data.languages,
        certifications: data.certifications
      };
    },
    staleTime: 24 * 60 * 60 * 1000, // 1 gün
    gcTime: 24 * 60 * 60 * 1000, // 1 gün
  });
};

// Projects verisi için hook
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const projectsCollection = collection(db, 'projects');
      const q = query(projectsCollection, orderBy('createdAt', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Projects verisi bulunamadı');
      }
      
      const doc = querySnapshot.docs[0];
      const data = doc.data() as any;
      return {
        id: doc.id,
        projects: data.projects
      };
    },
    staleTime: 24 * 60 * 60 * 1000, // 1 gün
    gcTime: 24 * 60 * 60 * 1000, // 1 gün
  });
};

// Contact verisi için hook
export const useContact = () => {
  return useQuery({
    queryKey: ['contact'],
    queryFn: async () => {
      const contactCollection = collection(db, 'contact');
      const q = query(contactCollection, orderBy('createdAt', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Contact verisi bulunamadı');
      }
      
      const doc = querySnapshot.docs[0];
      const data = doc.data() as any;
      return {
        id: doc.id,
        contactInfo: data.contactInfo,
        socialMedia: data.socialMedia,
        contactText: data.contactText
      };
    },
    staleTime: 24 * 60 * 60 * 1000, // 1 gün
    gcTime: 24 * 60 * 60 * 1000, // 1 gün
  });
};
