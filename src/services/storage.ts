import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEYS = {
  USER_PROFILE: 'user_profile',
  CROP_HISTORY: 'crop_history',
  SETTINGS: 'settings',
  NOTIFICATIONS: 'notifications',
};

// Mock Initial Data
const INITIAL_CROPS = [
  { id: '1', name: 'Wheat', plantedDate: '2025-11-01', stage: 'Vegetative', health: 'Good' },
  { id: '2', name: 'Rice', plantedDate: '2025-06-15', stage: 'Harvesting', health: 'Needs Attention' },
];

export const StorageService = {
  // Generic Get
  getData: async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Error reading value', e);
      return null;
    }
  },

  // Generic Set
  storeData: async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error('Error storing value', e);
    }
  },

  // Initialize App Data (Mock Backend)
  initData: async () => {
    const crops = await AsyncStorage.getItem(KEYS.CROP_HISTORY);
    if (!crops) {
      await AsyncStorage.setItem(KEYS.CROP_HISTORY, JSON.stringify(INITIAL_CROPS));
    }
    
    // Default Settings
    const settings = await AsyncStorage.getItem(KEYS.SETTINGS);
    if (!settings) {
       await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify({ language: 'en', location: 'Punjab, India' }));
    }
  },
  
  // Specific Helpers
  getCrops: async () => {
     return await StorageService.getData(KEYS.CROP_HISTORY);
  },
  
  addCrop: async (crop: any) => {
     const crops = await StorageService.getCrops() || [];
     crops.push(crop);
     await StorageService.storeData(KEYS.CROP_HISTORY, crops);
  }
};
