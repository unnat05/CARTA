// Realistic mock data generator - generates dynamic, authentic-looking data
// This system creates data that appears real but is entirely synthetic

import { Product } from './mock-data';

// Utility to generate realistic timestamps
const getRealisticTime = (hoursAgo: number): string => {
  const now = new Date();
  const past = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
  const diff = now.getTime() - past.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (hours < 1) return 'Just now';
  if (hours < 2) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return past.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
};

// Generate realistic user stats based on account age
export const generateUserStats = (userId?: string) => {
  const seed = userId ? userId.charCodeAt(0) : Math.random() * 100;
  const baseTracked = Math.floor(35 + (seed % 30));
  const baseDrops = Math.floor(8 + (seed % 12));
  const baseSavings = Math.floor(18000 + (seed % 15000));
  
  return {
    productsTracked: baseTracked,
    priceDropsFound: baseDrops,
    totalSaved: baseSavings,
    weeklyDrops: baseDrops,
  };
};

// Generate realistic recent activity
export const generateRecentActivity = (userId?: string) => {
  const seed = userId ? userId.charCodeAt(0) % 20 : Math.floor(Math.random() * 20);
  
  const products = [
    { name: 'Sony WH-1000XM5', category: 'Audio', basePrice: 29990 },
    { name: 'Apple MacBook Air M3', category: 'Laptops', basePrice: 114900 },
    { name: 'Herman Miller Embody', category: 'Furniture', basePrice: 135000 },
    { name: 'Samsung 4K OLED TV 55"', category: 'Electronics', basePrice: 89990 },
    { name: 'Dyson V15 Detect', category: 'Home Appliances', basePrice: 54900 },
    { name: 'Bose QC45', category: 'Audio', basePrice: 26500 },
    { name: 'iPad Pro 12.9" M2', category: 'Tablets', basePrice: 109900 },
    { name: 'Canon EOS R6 Mark II', category: 'Cameras', basePrice: 219990 },
    { name: 'Secretlab Titan Evo 2022', category: 'Furniture', basePrice: 42990 },
    { name: 'LG UltraWide 34" Monitor', category: 'Monitors', basePrice: 38990 },
    { name: 'iPhone 15 Pro Max', category: 'Smartphones', basePrice: 159900 },
    { name: 'Samsung Galaxy S24 Ultra', category: 'Smartphones', basePrice: 124999 },
    { name: 'Dell XPS 15', category: 'Laptops', basePrice: 189990 },
    { name: 'Philips Air Fryer XXL', category: 'Kitchen', basePrice: 12995 },
    { name: 'Nike Air Max 270', category: 'Footwear', basePrice: 12995 },
    { name: 'Adidas Ultraboost 23', category: 'Footwear', basePrice: 16999 },
    { name: 'Sony PlayStation 5', category: 'Gaming', basePrice: 54990 },
    { name: 'Xbox Series X', category: 'Gaming', basePrice: 52990 },
    { name: 'Apple Watch Series 9', category: 'Wearables', basePrice: 45900 },
    { name: 'Samsung Galaxy Watch 6', category: 'Wearables', basePrice: 30999 },
    { name: 'Kindle Paperwhite', category: 'E-Readers', basePrice: 13999 },
    { name: 'GoPro Hero 12', category: 'Cameras', basePrice: 44990 },
    { name: 'Bose SoundLink Revolve+', category: 'Audio', basePrice: 29990 },
    { name: 'JBL Flip 6', category: 'Audio', basePrice: 11999 },
    { name: 'Logitech MX Master 3S', category: 'Accessories', basePrice: 9995 },
  ];
  
  const count = 5 + (seed % 3); // 5-7 items
  const selected = [];
  
  for (let i = 0; i < count; i++) {
    const product = products[(seed + i * 5) % products.length];
    const changePercent = ((seed + i * 3) % 25) - 12;
    const newPrice = Math.floor(product.basePrice * (1 + changePercent / 100));
    const positive = changePercent < 0;
    
    selected.push({
      name: product.name,
      category: product.category,
      price: `₹${newPrice.toLocaleString('en-IN')}`,
      change: `${changePercent > 0 ? '+' : ''}${changePercent}%`,
      positive,
      timestamp: getRealisticTime((i + 1) * 3 + (seed % 8)),
    });
  }
  
  return selected;
};

// Generate realistic price alert
export const generateFeaturedAlert = (userId?: string) => {
  const seed = userId ? userId.charCodeAt(0) % 10 : Math.floor(Math.random() * 10);
  
  const alerts = [
    { name: 'Sony WH-1000XM5', category: 'Headphones', original: 29990, current: 24990, store: 'Amazon' },
    { name: 'Apple AirPods Pro 2', category: 'Earbuds', original: 26900, current: 22490, store: 'Flipkart' },
    { name: 'Samsung Galaxy Watch 6', category: 'Smartwatch', original: 30999, current: 25999, store: 'Amazon' },
    { name: 'Bose QC45', category: 'Headphones', original: 32900, current: 26500, store: 'Flipkart' },
    { name: 'iPad Air M2', category: 'Tablet', original: 59900, current: 54990, store: 'Amazon' },
  ];
  
  const alert = alerts[seed % alerts.length];
  const savings = alert.original - alert.current;
  const progress = Math.floor(((alert.original - alert.current) / (alert.original - alert.current * 0.8)) * 100);
  
  return {
    ...alert,
    savings,
    progress: Math.min(progress, 98),
  };
};

// Generate realistic search history
export const generateSearchHistory = (userId?: string) => {
  const seed = userId ? userId.charCodeAt(0) % 20 : Math.floor(Math.random() * 20);
  
  const searches = [
    { query: 'Best noise cancelling headphones under ₹30,000', type: 'search' as const, results: 12 },
    { query: 'Sony WH-1000XM5 vs Bose QC45', type: 'comparison' as const, results: 2 },
    { query: 'Ergonomic office chair for back pain', type: 'search' as const, results: 8 },
    { query: 'MacBook Air M3 vs Dell XPS 15', type: 'comparison' as const, results: 2 },
    { query: 'iPhone 15 Pro vs Samsung S24 Ultra', type: 'comparison' as const, results: 2 },
    { query: 'Best mechanical keyboard for programming', type: 'search' as const, results: 15 },
    { query: 'Standing desk under ₹20,000', type: 'search' as const, results: 9 },
    { query: 'LG 4K monitor vs Dell UltraSharp', type: 'comparison' as const, results: 2 },
    { query: 'Best air purifier for allergies', type: 'search' as const, results: 11 },
    { query: 'Gaming laptop under ₹80,000', type: 'search' as const, results: 18 },
    { query: 'Dyson V15 vs Shark cordless vacuum', type: 'comparison' as const, results: 2 },
    { query: 'Best coffee maker for home', type: 'search' as const, results: 14 },
    { query: 'iPad Pro vs Samsung Tab S9', type: 'comparison' as const, results: 2 },
    { query: 'Wireless earbuds under ₹5,000', type: 'search' as const, results: 22 },
    { query: 'Best DSLR camera for beginners', type: 'search' as const, results: 13 },
    { query: 'Sony headphones with noise cancellation', type: 'search' as const, results: 16 },
    { query: 'Apple Watch Series 9 vs Samsung Galaxy Watch 6', type: 'comparison' as const, results: 2 },
    { query: 'Best gaming chair under ₹50,000', type: 'search' as const, results: 10 },
    { query: 'iPhone 15 Pro 256GB best price', type: 'search' as const, results: 8 },
    { query: 'Portable Bluetooth speaker waterproof', type: 'search' as const, results: 19 },
    { query: 'Herman Miller Embody vs Secretlab Titan', type: 'comparison' as const, results: 2 },
    { query: 'Best air fryer for family of 4', type: 'search' as const, results: 12 },
    { query: 'Canon EOS R6 Mark II vs Sony Alpha 7 IV', type: 'comparison' as const, results: 2 },
    { query: '55 inch 4K TV under ₹60,000', type: 'search' as const, results: 14 },
    { query: 'Best laptop for video editing', type: 'search' as const, results: 17 },
    { query: 'Nike running shoes for men', type: 'search' as const, results: 24 },
    { query: 'PlayStation 5 vs Xbox Series X', type: 'comparison' as const, results: 2 },
    { query: 'Smart refrigerator with inverter', type: 'search' as const, results: 11 },
    { query: 'Ultrawide monitor for productivity', type: 'search' as const, results: 9 },
    { query: 'Best smartwatch under ₹10,000', type: 'search' as const, results: 21 },
    { query: 'Denim jacket for winter', type: 'search' as const, results: 18 },
    { query: 'AirPods Pro 2 vs Sony WF-1000XM5', type: 'comparison' as const, results: 2 },
    { query: 'Cordless vacuum cleaner with HEPA filter', type: 'search' as const, results: 13 },
    { query: 'Best tablet for students', type: 'search' as const, results: 15 },
    { query: 'Puma sneakers under ₹5,000', type: 'search' as const, results: 20 },
  ];
  
  const count = 12 + (seed % 8); // 12-19 items
  const selected = [];
  
  for (let i = 0; i < count; i++) {
    const item = searches[(seed + i * 3) % searches.length];
    selected.push({
      id: `hist-${i}`,
      ...item,
      time: getRealisticTime(i * 6 + (seed % 12)),
    });
  }
  
  return selected;
};

// Generate realistic price alerts
export const generatePriceAlerts = (userId?: string) => {
  const seed = userId ? userId.charCodeAt(0) % 15 : Math.floor(Math.random() * 15);
  
  const alertData = [
    { product: 'Sony WH-1000XM5', target: 24990, current: 29990, trend: 'down' as const },
    { product: 'Apple MacBook Air M3', target: 99000, current: 114900, trend: 'stable' as const },
    { product: 'Herman Miller Embody', target: 120000, current: 135000, trend: 'down' as const },
    { product: 'Samsung 4K OLED TV 55"', target: 80000, current: 74990, trend: 'up' as const },
    { product: 'Dyson V15 Detect', target: 48000, current: 54900, trend: 'down' as const },
    { product: 'Bose QC45', target: 24000, current: 26500, trend: 'down' as const },
    { product: 'iPad Pro 12.9" M2', target: 95000, current: 109900, trend: 'stable' as const },
    { product: 'Canon EOS R6 Mark II', target: 199000, current: 219990, trend: 'down' as const },
    { product: 'Secretlab Titan Evo', target: 38000, current: 42990, trend: 'stable' as const },
    { product: 'LG UltraWide 34"', target: 35000, current: 38990, trend: 'down' as const },
  ];
  
  const count = 4 + (seed % 4);
  const selected = [];
  
  for (let i = 0; i < count; i++) {
    const alert = alertData[(seed + i * 2) % alertData.length];
    const diff = alert.current - alert.target;
    const changePercent = ((diff / alert.current) * 100 * (seed % 3 === 0 ? -1 : 1)).toFixed(0);
    const daysToTarget = Math.floor(10 + (seed + i) % 40);
    const triggered = alert.current <= alert.target;
    
    selected.push({
      id: `alert-${i}`,
      ...alert,
      change: `${changePercent}%`,
      status: triggered ? ('triggered' as const) : ('watching' as const),
      eta: triggered ? 'Buy Now!' : `Est. ${getRealisticTime(-(daysToTarget * 24))}`,
    });
  }
  
  return selected;
};

// Generate realistic comparison data
export const generateComparisonProducts = (userId?: string) => {
  const seed = userId ? userId.charCodeAt(0) % 10 : Math.floor(Math.random() * 10);
  
  const comparisons = [
    {
      products: [
        {
          name: 'Sony WH-1000XM5',
          price: '₹29,990',
          rating: 4.8,
          store: 'Amazon',
          specs: { 'Battery': '30 hrs', 'ANC': 'Yes', 'Weight': '250g', 'Bluetooth': '5.2', 'Foldable': 'No' },
          pros: ['Best-in-class ANC', 'Excellent sound quality', 'Comfortable for long use'],
          cons: ['Not foldable', 'Expensive'],
          score: 94,
        },
        {
          name: 'Bose QC45',
          price: '₹26,500',
          rating: 4.7,
          store: 'Flipkart',
          specs: { 'Battery': '24 hrs', 'ANC': 'Yes', 'Weight': '238g', 'Bluetooth': '5.1', 'Foldable': 'Yes' },
          pros: ['Foldable design', 'Great comfort', 'Good ANC'],
          cons: ['Average soundstage', 'No LDAC'],
          score: 88,
        },
      ],
    },
    {
      products: [
        {
          name: 'iPhone 15 Pro',
          price: '₹1,34,900',
          rating: 4.6,
          store: 'Amazon',
          specs: { 'Chip': 'A17 Pro', 'Camera': '48MP', 'Display': '6.1"', 'Battery': '23 hrs', 'Storage': '256GB' },
          pros: ['Powerful A17 Pro chip', 'Excellent cameras', 'Premium build'],
          cons: ['Expensive', 'No charger included'],
          score: 92,
        },
        {
          name: 'Samsung S24 Ultra',
          price: '₹1,24,999',
          rating: 4.7,
          store: 'Flipkart',
          specs: { 'Chip': 'Snapdragon 8 Gen 3', 'Camera': '200MP', 'Display': '6.8"', 'Battery': '25 hrs', 'Storage': '256GB' },
          pros: ['200MP camera', 'S Pen included', 'Larger display'],
          cons: ['Heavy', 'Expensive'],
          score: 91,
        },
      ],
    },
  ];
  
  return comparisons[seed % comparisons.length].products.map((p, i) => ({
    ...p,
    id: `comp-${i}`,
  }));
};

// Generate realistic dashboard stats with smooth variations
export const generateDashboardStats = (userId?: string) => {
  const baseStats = generateUserStats(userId);
  const activity = generateRecentActivity(userId);
  const alert = generateFeaturedAlert(userId);
  
  return {
    stats: {
      productsTracked: baseStats.productsTracked,
      priceDropsFound: baseStats.priceDropsFound,
      totalSaved: baseStats.totalSaved,
      weeklyDrops: baseStats.weeklyDrops,
    },
    recentActivity: activity,
    featuredAlert: alert,
  };
};

// Generate realistic search results with proper ranking
export const generateSearchResults = (query: string, products: Product[]): Product[] => {
  if (!query || products.length === 0) return products;
  
  const queryLower = query.toLowerCase();
  const keywords = queryLower.split(' ').filter(w => w.length > 2);
  
  // Score each product based on relevance
  const scored = products.map(product => {
    let score = 0;
    const searchText = `${product.name} ${product.description} ${product.brand} ${product.category}`.toLowerCase();
    
    // Exact match in name
    if (product.name.toLowerCase().includes(queryLower)) score += 100;
    
    // Keyword matches
    keywords.forEach(keyword => {
      if (product.name.toLowerCase().includes(keyword)) score += 50;
      if (product.brand.toLowerCase().includes(keyword)) score += 30;
      if (product.category.toLowerCase().includes(keyword)) score += 20;
      if (product.description.toLowerCase().includes(keyword)) score += 10;
    });
    
    // Boost by rating and reviews
    score += product.rating * 5;
    score += Math.min(product.reviews / 100, 20);
    
    // Boost by discount
    if (product.discount) score += product.discount * 2;
    
    return { product, score };
  });
  
  // Sort by score and return products
  return scored
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);
};

// Generate realistic time-based greeting
export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

// Generate realistic savings estimate
export const calculateSavingsEstimate = (products: Product[]): number => {
  return products.reduce((total, product) => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return total + (product.originalPrice - product.price);
    }
    return total;
  }, 0);
};

// Generate realistic price trend
export const generatePriceTrend = (currentPrice: number, targetPrice: number): {
  trend: 'down' | 'up' | 'stable';
  changePercent: number;
  forecast: string;
} => {
  const diff = currentPrice - targetPrice;
  const changePercent = (diff / currentPrice) * 100;
  
  let trend: 'down' | 'up' | 'stable';
  if (Math.abs(changePercent) < 2) trend = 'stable';
  else if (changePercent > 0) trend = 'down';
  else trend = 'up';
  
  const daysToTarget = Math.floor(Math.abs(diff) / 100) + 5;
  const forecastDate = new Date();
  forecastDate.setDate(forecastDate.getDate() + daysToTarget);
  
  return {
    trend,
    changePercent: Math.abs(changePercent),
    forecast: forecastDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
  };
};

// Export all generators
export const RealisticMockData = {
  generateUserStats,
  generateRecentActivity,
  generateFeaturedAlert,
  generateSearchHistory,
  generatePriceAlerts,
  generateComparisonProducts,
  generateDashboardStats,
  generateSearchResults,
  getTimeBasedGreeting,
  calculateSavingsEstimate,
  generatePriceTrend,
};
