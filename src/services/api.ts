export const APIService = {
  getWeather: async (location: string) => {
    // Simulate Network Delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      temp: 28,
      condition: 'Partly Cloudy',
      humidity: 65,
      wind: '12 km/h',
      forecast: [
        { day: 'Tue', temp: 29, icon: 'sun' },
        { day: 'Wed', temp: 27, icon: 'cloud-rain' },
        { day: 'Thu', temp: 30, icon: 'sun' },
      ],
      aiInsight: 'Conditions are favorable for wheat harvesting in the next 2 days.'
    };
  },

  getMarketPrices: async (location: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { crop: 'Wheat', price: '₹2,125/q', trend: 'up' },
      { crop: 'Rice', price: '₹1,960/q', trend: 'stable' },
      { crop: 'Cotton', price: '₹6,080/q', trend: 'down' },
      { crop: 'Maize', price: '₹1,850/q', trend: 'up' },
    ];
  },

  // Mock AI Image Analysis
  analyzeCropImage: async (imageUri: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Randomly return healthy or diseased
    // Force Wheat Rust result as per demo requirement
    return {
      healthy: false,
      disease: 'Wheat Rust',
      confidence: 0.98,
      treatment: 'Apply fungicides like Tebuconazole or Propiconazole. Improve air circulation by spacing crops. Avoid overhead irrigation to reduce moisture on leaves.',
    };
  },

  // Mock advisory
  getAdvisory: async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      answer: `Based on local soil conditions in ${'Punjab'}, for ${query}, we recommend checking soil pH levels. If pH < 6, add lime. Use NPK 4:2:1 for best results in the vegetative stage.`,
      sources: ['Kisan Call Center', 'Local Agri University']
    };
  }
};
