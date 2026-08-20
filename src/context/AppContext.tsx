import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  poojaTimings as defaultTimings, 
  stories as defaultStories, 
  committee as defaultCommittee, 
  gallery as defaultGallery, 
  announcements as defaultAnnouncements 
} from '../data';
import { translations, Language, TranslationKey } from '../translations';

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => 
    (localStorage.getItem('gc_language') as Language) || 'en'
  );

  const [announcements, setAnnouncements] = useState(() => 
    JSON.parse(localStorage.getItem('gc_announcements') || 'null') || defaultAnnouncements
  );
  
  const [stories, setStories] = useState(() => 
    JSON.parse(localStorage.getItem('gc_stories') || 'null') || defaultStories
  );
  
  const [poojaTimings, setPoojaTimings] = useState(() => 
    JSON.parse(localStorage.getItem('gc_timings') || 'null') || defaultTimings
  );
  
  const [gallery, setGallery] = useState(() => 
    JSON.parse(localStorage.getItem('gc_gallery') || 'null') || defaultGallery
  );
  
  const [committee, setCommittee] = useState(() => 
    JSON.parse(localStorage.getItem('gc_committee') || 'null') || defaultCommittee
  );
  
  const [liveEvent, setLiveEvent] = useState(() => 
    JSON.parse(localStorage.getItem('gc_live') || 'null') || { 
      isLive: true, 
      title: 'Evening Maha Harathi', 
      description: 'Join us for the special evening prayers.', 
      viewers: 1248,
      url: 'https://images.unsplash.com/photo-1662057790855-322d7a22d363?auto=format&fit=crop&q=80'
    }
  );

  const [volunteers, setVolunteers] = useState(() => 
    JSON.parse(localStorage.getItem('gc_volunteers') || 'null') || []
  );

  const [donations, setDonations] = useState(() => 
    JSON.parse(localStorage.getItem('gc_donations') || 'null') || []
  );

  useEffect(() => localStorage.setItem('gc_language', language), [language]);
  useEffect(() => localStorage.setItem('gc_announcements', JSON.stringify(announcements)), [announcements]);
  useEffect(() => localStorage.setItem('gc_stories', JSON.stringify(stories)), [stories]);
  useEffect(() => localStorage.setItem('gc_timings', JSON.stringify(poojaTimings)), [poojaTimings]);
  useEffect(() => localStorage.setItem('gc_gallery', JSON.stringify(gallery)), [gallery]);
  useEffect(() => localStorage.setItem('gc_committee', JSON.stringify(committee)), [committee]);
  useEffect(() => localStorage.setItem('gc_live', JSON.stringify(liveEvent)), [liveEvent]);
  useEffect(() => localStorage.setItem('gc_volunteers', JSON.stringify(volunteers)), [volunteers]);
  useEffect(() => localStorage.setItem('gc_donations', JSON.stringify(donations)), [donations]);

  // Translation helper function
  const t = (key: TranslationKey) => translations[language][key] || translations['en'][key] || key;

  return (
    <AppContext.Provider value={{
      language, setLanguage, t,
      announcements, setAnnouncements,
      stories, setStories,
      poojaTimings, setPoojaTimings,
      gallery, setGallery,
      committee, setCommittee,
      liveEvent, setLiveEvent,
      volunteers, setVolunteers,
      donations, setDonations
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
