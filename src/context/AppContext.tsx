import React, { createContext, useState, useContext, useEffect } from 'react';
import { StorageService, KEYS } from '../services/storage';

type AppContextType = {
  language: 'en' | 'hi' | 'te'; // English, Hindi, Telugu (example)
  setLanguage: (lang: 'en' | 'hi' | 'te') => void;
  isLoading: boolean;
  userLocation: string;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'hi' | 'te'>('en');
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState('Punjab, India');

  useEffect(() => {
    const loadSettings = async () => {
      await StorageService.initData();
      const settings = await StorageService.getData(KEYS.SETTINGS);
      if (settings) {
        if (settings.language) setLanguageState(settings.language);
        if (settings.location) setUserLocation(settings.location);
      }
      setIsLoading(false);
    };
    loadSettings();
  }, []);

  const setLanguage = async (lang: 'en' | 'hi' | 'te') => {
    setLanguageState(lang);
    const settings = (await StorageService.getData(KEYS.SETTINGS)) || {};
    settings.language = lang;
    await StorageService.storeData(KEYS.SETTINGS, settings);
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, isLoading, userLocation }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
