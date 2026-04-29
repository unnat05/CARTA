// Mock product data for development and testing

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  rating: number;
  reviews: number;
  marketplace: 'amazon' | 'flipkart' | 'myntra' | 'ajio' | 'meesho';
  url: string;
  inStock: boolean;
  category: string;
  brand: string;
  features?: string[];
  discount?: number;
}

export interface SearchResult {
  query: string;
  products: Product[];
  totalResults: number;
  timestamp: Date;
}

export interface PriceHistory {
  date: string;
  price: number;
  marketplace: string;
}

// Mock products database
export const MOCK_PRODUCTS: Product[] = [
  // Electronics
  {
    id: 'amz-001',
    name: 'Apple iPhone 15 Pro (256GB) - Natural Titanium',
    description: 'A17 Pro chip, 48MP camera system, Action button, USB-C',
    price: 134900,
    originalPrice: 144900,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    rating: 4.6,
    reviews: 2847,
    marketplace: 'amazon',
    url: 'https://amazon.in/iphone-15-pro',
    inStock: true,
    category: 'Smartphones',
    brand: 'Apple',
    discount: 7,
    features: ['A17 Pro chip', '48MP camera', 'Titanium design', 'USB-C'],
  },
  {
    id: 'flp-001',
    name: 'Apple iPhone 15 Pro (256GB) - Natural Titanium',
    description: 'A17 Pro chip with 6-core GPU, ProMotion display',
    price: 136900,
    originalPrice: 144900,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    rating: 4.5,
    reviews: 1523,
    marketplace: 'flipkart',
    url: 'https://flipkart.com/iphone-15-pro',
    inStock: true,
    category: 'Smartphones',
    brand: 'Apple',
    discount: 6,
    features: ['A17 Pro chip', '48MP camera', 'Titanium design', 'USB-C'],
  },
  {
    id: 'amz-002',
    name: 'Samsung Galaxy S24 Ultra (12GB RAM, 256GB)',
    description: 'Snapdragon 8 Gen 3, 200MP camera, S Pen included',
    price: 124999,
    originalPrice: 129999,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    rating: 4.7,
    reviews: 3421,
    marketplace: 'amazon',
    url: 'https://amazon.in/samsung-s24-ultra',
    inStock: true,
    category: 'Smartphones',
    brand: 'Samsung',
    discount: 4,
    features: ['200MP camera', 'S Pen', 'Snapdragon 8 Gen 3', 'AI features'],
  },
  {
    id: 'flp-002',
    name: 'Samsung Galaxy S24 Ultra (12GB RAM, 256GB)',
    description: 'AI-powered smartphone with S Pen and 200MP camera',
    price: 126999,
    originalPrice: 129999,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    rating: 4.6,
    reviews: 2156,
    marketplace: 'flipkart',
    url: 'https://flipkart.com/samsung-s24-ultra',
    inStock: true,
    category: 'Smartphones',
    brand: 'Samsung',
    discount: 2,
    features: ['200MP camera', 'S Pen', 'Snapdragon 8 Gen 3', 'AI features'],
  },
  {
    id: 'amz-003',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description: 'Industry-leading noise cancellation, 30hr battery, premium sound',
    price: 26990,
    originalPrice: 34990,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
    rating: 4.8,
    reviews: 5632,
    marketplace: 'amazon',
    url: 'https://amazon.in/sony-wh1000xm5',
    inStock: true,
    category: 'Audio',
    brand: 'Sony',
    discount: 23,
    features: ['Active noise cancellation', '30hr battery', 'LDAC support', 'Multipoint'],
  },
  {
    id: 'flp-003',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Premium noise cancelling headphones with exceptional sound',
    price: 27990,
    originalPrice: 34990,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
    rating: 4.7,
    reviews: 3421,
    marketplace: 'flipkart',
    url: 'https://flipkart.com/sony-wh1000xm5',
    inStock: true,
    category: 'Audio',
    brand: 'Sony',
    discount: 20,
    features: ['Active noise cancellation', '30hr battery', 'LDAC support', 'Multipoint'],
  },

  // Fashion
  {
    id: 'myn-001',
    name: 'Nike Air Max 270 Running Shoes',
    description: 'Max Air cushioning, breathable mesh upper, iconic style',
    price: 12995,
    originalPrice: 14995,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    rating: 4.5,
    reviews: 1847,
    marketplace: 'myntra',
    url: 'https://myntra.com/nike-air-max-270',
    inStock: true,
    category: 'Footwear',
    brand: 'Nike',
    discount: 13,
    features: ['Max Air cushioning', 'Breathable mesh', 'Rubber outsole'],
  },
  {
    id: 'ajio-001',
    name: 'Levi\'s 511 Slim Fit Jeans',
    description: 'Classic slim fit, stretch denim, versatile style',
    price: 2499,
    originalPrice: 3999,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    rating: 4.4,
    reviews: 2341,
    marketplace: 'ajio',
    url: 'https://ajio.com/levis-511',
    inStock: true,
    category: 'Clothing',
    brand: 'Levi\'s',
    discount: 38,
    features: ['Slim fit', 'Stretch denim', 'Classic 5-pocket'],
  },
  {
    id: 'myn-002',
    name: 'Adidas Originals Trefoil Hoodie',
    description: 'Cotton blend, iconic trefoil logo, comfortable fit',
    price: 3499,
    originalPrice: 4999,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
    rating: 4.6,
    reviews: 1523,
    marketplace: 'myntra',
    url: 'https://myntra.com/adidas-hoodie',
    inStock: true,
    category: 'Clothing',
    brand: 'Adidas',
    discount: 30,
    features: ['Cotton blend', 'Kangaroo pocket', 'Ribbed cuffs'],
  },

  // Home & Kitchen
  {
    id: 'amz-004',
    name: 'Philips Air Fryer HD9252/90 (4.1L)',
    description: 'Rapid Air technology, 7 pre-set menus, dishwasher safe',
    price: 8999,
    originalPrice: 12995,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400',
    rating: 4.5,
    reviews: 8234,
    marketplace: 'amazon',
    url: 'https://amazon.in/philips-air-fryer',
    inStock: true,
    category: 'Kitchen Appliances',
    brand: 'Philips',
    discount: 31,
    features: ['4.1L capacity', '7 presets', 'Dishwasher safe', '1400W'],
  },
  {
    id: 'flp-004',
    name: 'Philips Air Fryer HD9252/90',
    description: 'Healthy cooking with 90% less fat, digital display',
    price: 9299,
    originalPrice: 12995,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400',
    rating: 4.4,
    reviews: 6421,
    marketplace: 'flipkart',
    url: 'https://flipkart.com/philips-air-fryer',
    inStock: true,
    category: 'Kitchen Appliances',
    brand: 'Philips',
    discount: 28,
    features: ['4.1L capacity', '7 presets', 'Dishwasher safe', '1400W'],
  },

  // Budget options
  {
    id: 'mee-001',
    name: 'Wireless Bluetooth Earbuds with Charging Case',
    description: 'True wireless earbuds, 20hr playtime, touch controls',
    price: 799,
    originalPrice: 2999,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
    rating: 4.1,
    reviews: 12453,
    marketplace: 'meesho',
    url: 'https://meesho.com/wireless-earbuds',
    inStock: true,
    category: 'Audio',
    brand: 'Generic',
    discount: 73,
    features: ['Bluetooth 5.0', 'Touch controls', '20hr battery', 'IPX4'],
  },
  {
    id: 'mee-002',
    name: 'Cotton Oversized T-Shirt Pack of 3',
    description: 'Comfortable cotton blend, oversized fit, multiple colors',
    price: 599,
    originalPrice: 1499,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    rating: 4.2,
    reviews: 8765,
    marketplace: 'meesho',
    url: 'https://meesho.com/tshirt-pack',
    inStock: true,
    category: 'Clothing',
    brand: 'Generic',
    discount: 60,
    features: ['Pack of 3', 'Cotton blend', 'Oversized fit', 'Multiple colors'],
  },

  // Laptops & Computers
  {
    id: 'amz-005',
    name: 'Apple MacBook Air M3 (13-inch, 8GB RAM, 256GB SSD)',
    description: 'M3 chip with 8-core CPU, 10-core GPU, Liquid Retina display',
    price: 114900,
    originalPrice: 119900,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    rating: 4.8,
    reviews: 4521,
    marketplace: 'amazon',
    url: 'https://amazon.in/macbook-air-m3',
    inStock: true,
    category: 'Laptops',
    brand: 'Apple',
    discount: 4,
    features: ['M3 chip', '13.6" Liquid Retina', '18hr battery', 'MagSafe charging'],
  },
  {
    id: 'flp-005',
    name: 'Dell XPS 15 (Intel i7, 16GB RAM, 512GB SSD)',
    description: '12th Gen Intel Core i7, NVIDIA RTX 3050, 15.6" FHD+',
    price: 139990,
    originalPrice: 159990,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
    rating: 4.6,
    reviews: 2341,
    marketplace: 'flipkart',
    url: 'https://flipkart.com/dell-xps-15',
    inStock: true,
    category: 'Laptops',
    brand: 'Dell',
    discount: 13,
    features: ['Intel i7 12th Gen', 'RTX 3050', '15.6" FHD+', 'Backlit keyboard'],
  },
  {
    id: 'amz-006',
    name: 'HP Pavilion Gaming Laptop (Ryzen 5, 8GB, 512GB, GTX 1650)',
    description: 'AMD Ryzen 5 5600H, NVIDIA GTX 1650, 15.6" FHD 144Hz',
    price: 54990,
    originalPrice: 69990,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
    rating: 4.4,
    reviews: 5632,
    marketplace: 'amazon',
    url: 'https://amazon.in/hp-pavilion-gaming',
    inStock: true,
    category: 'Laptops',
    brand: 'HP',
    discount: 21,
    features: ['Ryzen 5 5600H', 'GTX 1650', '144Hz display', 'RGB keyboard'],
  },

  // Smartwatches & Wearables
  {
    id: 'amz-007',
    name: 'Apple Watch Series 9 GPS (45mm)',
    description: 'S9 chip, Always-On Retina display, Blood oxygen sensor',
    price: 45900,
    originalPrice: 49900,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400',
    rating: 4.7,
    reviews: 3421,
    marketplace: 'amazon',
    url: 'https://amazon.in/apple-watch-9',
    inStock: true,
    category: 'Smartwatches',
    brand: 'Apple',
    discount: 8,
    features: ['S9 chip', 'Always-On display', 'Blood oxygen', 'ECG app'],
  },
  {
    id: 'flp-006',
    name: 'Samsung Galaxy Watch 6 Classic (43mm)',
    description: 'Wear OS, Sapphire crystal, Advanced sleep tracking',
    price: 30999,
    originalPrice: 36999,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400',
    rating: 4.5,
    reviews: 2156,
    marketplace: 'flipkart',
    url: 'https://flipkart.com/samsung-watch-6',
    inStock: true,
    category: 'Smartwatches',
    brand: 'Samsung',
    discount: 16,
    features: ['Wear OS', 'Sapphire crystal', 'Sleep tracking', 'Body composition'],
  },
  {
    id: 'amz-008',
    name: 'Noise ColorFit Pro 4 Alpha Smartwatch',
    description: '1.78" AMOLED display, Bluetooth calling, 7 days battery',
    price: 2499,
    originalPrice: 4999,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400',
    rating: 4.3,
    reviews: 12453,
    marketplace: 'amazon',
    url: 'https://amazon.in/noise-colorfit-pro4',
    inStock: true,
    category: 'Smartwatches',
    brand: 'Noise',
    discount: 50,
    features: ['1.78" AMOLED', 'Bluetooth calling', '100+ sports modes', '7 days battery'],
  },

  // Tablets
  {
    id: 'amz-009',
    name: 'Apple iPad Pro 12.9" M2 (128GB, Wi-Fi)',
    description: 'M2 chip, Liquid Retina XDR display, Apple Pencil support',
    price: 109900,
    originalPrice: 114900,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    rating: 4.8,
    reviews: 1847,
    marketplace: 'amazon',
    url: 'https://amazon.in/ipad-pro-m2',
    inStock: true,
    category: 'Tablets',
    brand: 'Apple',
    discount: 4,
    features: ['M2 chip', '12.9" XDR display', 'Face ID', 'Thunderbolt'],
  },
  {
    id: 'flp-007',
    name: 'Samsung Galaxy Tab S9 (11", 8GB RAM, 128GB)',
    description: 'Snapdragon 8 Gen 2, Dynamic AMOLED 2X, S Pen included',
    price: 72999,
    originalPrice: 79999,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400',
    rating: 4.6,
    reviews: 1523,
    marketplace: 'flipkart',
    url: 'https://flipkart.com/samsung-tab-s9',
    inStock: true,
    category: 'Tablets',
    brand: 'Samsung',
    discount: 9,
    features: ['Snapdragon 8 Gen 2', 'AMOLED 2X', 'S Pen', 'IP68 rated'],
  },

  // Cameras
  {
    id: 'amz-010',
    name: 'Canon EOS R6 Mark II (Body Only)',
    description: '24.2MP full-frame, 40fps burst, 6K video',
    price: 219990,
    originalPrice: 239990,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1606980707986-8f6e1f0d1e0f?w=400',
    rating: 4.9,
    reviews: 421,
    marketplace: 'amazon',
    url: 'https://amazon.in/canon-eos-r6-ii',
    inStock: true,
    category: 'Cameras',
    brand: 'Canon',
    discount: 8,
    features: ['24.2MP full-frame', '40fps burst', '6K video', 'IBIS'],
  },
  {
    id: 'flp-008',
    name: 'Sony Alpha 7 IV (Body Only)',
    description: '33MP full-frame, 10fps burst, 4K 60p video',
    price: 209990,
    originalPrice: 229990,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
    rating: 4.8,
    reviews: 634,
    marketplace: 'flipkart',
    url: 'https://flipkart.com/sony-alpha-7-iv',
    inStock: true,
    category: 'Cameras',
    brand: 'Sony',
    discount: 9,
    features: ['33MP full-frame', '10fps burst', '4K 60p', 'Real-time tracking'],
  },

  // Home Appliances
  {
    id: 'amz-011',
    name: 'Dyson V15 Detect Absolute Cordless Vacuum',
    description: 'Laser dust detection, 60 min runtime, HEPA filtration',
    price: 54900,
    originalPrice: 64900,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400',
    rating: 4.7,
    reviews: 2341,
    marketplace: 'amazon',
    url: 'https://amazon.in/dyson-v15',
    inStock: true,
    category: 'Home Appliances',
    brand: 'Dyson',
    discount: 15,
    features: ['Laser detection', '60 min runtime', 'HEPA filter', 'LCD screen'],
  },
  {
    id: 'flp-009',
    name: 'LG 260L 3 Star Frost Free Double Door Refrigerator',
    description: 'Smart Inverter Compressor, Convertible freezer',
    price: 26990,
    originalPrice: 34990,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400',
    rating: 4.4,
    reviews: 5632,
    marketplace: 'flipkart',
    url: 'https://flipkart.com/lg-refrigerator',
    inStock: true,
    category: 'Home Appliances',
    brand: 'LG',
    discount: 23,
    features: ['260L capacity', 'Smart Inverter', 'Convertible', 'Stabilizer free'],
  },

  // TVs & Monitors
  {
    id: 'amz-012',
    name: 'Samsung 55" 4K OLED Smart TV (QN90C)',
    description: 'Neo QLED, 144Hz, Dolby Atmos, Gaming Hub',
    price: 89990,
    originalPrice: 109990,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    rating: 4.7,
    reviews: 1847,
    marketplace: 'amazon',
    url: 'https://amazon.in/samsung-qn90c',
    inStock: true,
    category: 'TVs',
    brand: 'Samsung',
    discount: 18,
    features: ['Neo QLED', '144Hz', 'Dolby Atmos', 'Gaming Hub'],
  },
  {
    id: 'flp-010',
    name: 'LG 34" UltraWide QHD Monitor (34WP65C)',
    description: '3440x1440, 75Hz, HDR10, USB-C',
    price: 38990,
    originalPrice: 44990,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
    rating: 4.6,
    reviews: 1234,
    marketplace: 'flipkart',
    url: 'https://flipkart.com/lg-ultrawide',
    inStock: true,
    category: 'Monitors',
    brand: 'LG',
    discount: 13,
    features: ['34" UltraWide', 'QHD 3440x1440', 'HDR10', 'USB-C 60W'],
  },

  // Gaming
  {
    id: 'amz-013',
    name: 'Sony PlayStation 5 (Disc Edition)',
    description: 'Ultra-high speed SSD, Ray tracing, 4K gaming',
    price: 54990,
    originalPrice: 54990,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
    rating: 4.9,
    reviews: 8234,
    marketplace: 'amazon',
    url: 'https://amazon.in/ps5',
    inStock: true,
    category: 'Gaming',
    brand: 'Sony',
    discount: 0,
    features: ['Ultra-high speed SSD', 'Ray tracing', '4K 120fps', 'Tempest 3D'],
  },
  {
    id: 'flp-011',
    name: 'Xbox Series X (1TB)',
    description: '12 teraflops GPU, 4K 120fps, Quick Resume',
    price: 52990,
    originalPrice: 52990,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400',
    rating: 4.8,
    reviews: 6421,
    marketplace: 'flipkart',
    url: 'https://flipkart.com/xbox-series-x',
    inStock: true,
    category: 'Gaming',
    brand: 'Microsoft',
    discount: 0,
    features: ['12 teraflops', '4K 120fps', 'Quick Resume', 'Game Pass'],
  },

  // Furniture
  {
    id: 'amz-014',
    name: 'Herman Miller Embody Ergonomic Office Chair',
    description: 'Pixelated support, Dynamic matrix, 12-year warranty',
    price: 135000,
    originalPrice: 145000,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
    rating: 4.9,
    reviews: 421,
    marketplace: 'amazon',
    url: 'https://amazon.in/herman-miller-embody',
    inStock: true,
    category: 'Furniture',
    brand: 'Herman Miller',
    discount: 7,
    features: ['Pixelated support', 'Dynamic matrix', '12-year warranty', 'Adjustable arms'],
  },
  {
    id: 'flp-012',
    name: 'Secretlab Titan Evo 2022 Gaming Chair',
    description: 'NEO Hybrid Leatherette, 4-way L-ADAPT lumbar',
    price: 42990,
    originalPrice: 47990,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400',
    rating: 4.7,
    reviews: 2156,
    marketplace: 'flipkart',
    url: 'https://flipkart.com/secretlab-titan',
    inStock: true,
    category: 'Furniture',
    brand: 'Secretlab',
    discount: 10,
    features: ['NEO Hybrid', '4-way lumbar', 'Magnetic cushions', '5-year warranty'],
  },

  // Audio (More options)
  {
    id: 'amz-015',
    name: 'Bose QuietComfort 45 Wireless Headphones',
    description: 'World-class noise cancellation, 24hr battery',
    price: 26500,
    originalPrice: 32900,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400',
    rating: 4.7,
    reviews: 3421,
    marketplace: 'amazon',
    url: 'https://amazon.in/bose-qc45',
    inStock: true,
    category: 'Audio',
    brand: 'Bose',
    discount: 19,
    features: ['Active noise cancellation', '24hr battery', 'Aware mode', 'Foldable'],
  },
  {
    id: 'flp-013',
    name: 'Apple AirPods Pro (2nd Generation)',
    description: 'Active Noise Cancellation, Adaptive Audio, USB-C',
    price: 24900,
    originalPrice: 26900,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400',
    rating: 4.8,
    reviews: 5632,
    marketplace: 'flipkart',
    url: 'https://flipkart.com/airpods-pro-2',
    inStock: true,
    category: 'Audio',
    brand: 'Apple',
    discount: 7,
    features: ['Active ANC', 'Adaptive Audio', 'USB-C', 'Spatial audio'],
  },
  {
    id: 'amz-016',
    name: 'JBL Flip 6 Portable Bluetooth Speaker',
    description: 'IP67 waterproof, 12hr playtime, PartyBoost',
    price: 9999,
    originalPrice: 12999,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    rating: 4.6,
    reviews: 8234,
    marketplace: 'amazon',
    url: 'https://amazon.in/jbl-flip-6',
    inStock: true,
    category: 'Audio',
    brand: 'JBL',
    discount: 23,
    features: ['IP67 waterproof', '12hr battery', 'PartyBoost', 'Bold design'],
  },

  // More Fashion
  {
    id: 'myn-003',
    name: 'Puma RS-X Sneakers',
    description: 'Running System technology, Retro design, Cushioned sole',
    price: 7999,
    originalPrice: 10999,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
    rating: 4.5,
    reviews: 2341,
    marketplace: 'myntra',
    url: 'https://myntra.com/puma-rsx',
    inStock: true,
    category: 'Footwear',
    brand: 'Puma',
    discount: 27,
    features: ['RS technology', 'Retro design', 'Cushioned', 'Durable rubber'],
  },
  {
    id: 'ajio-002',
    name: 'Tommy Hilfiger Slim Fit Polo T-Shirt',
    description: 'Premium cotton pique, Classic fit, Signature flag logo',
    price: 2799,
    originalPrice: 4999,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400',
    rating: 4.6,
    reviews: 1523,
    marketplace: 'ajio',
    url: 'https://ajio.com/tommy-polo',
    inStock: true,
    category: 'Clothing',
    brand: 'Tommy Hilfiger',
    discount: 44,
    features: ['Premium cotton', 'Slim fit', 'Flag logo', 'Ribbed collar'],
  },
  {
    id: 'myn-004',
    name: 'Roadster Denim Jacket',
    description: 'Classic blue denim, Distressed finish, Button closure',
    price: 1999,
    originalPrice: 3499,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    rating: 4.4,
    reviews: 3421,
    marketplace: 'myntra',
    url: 'https://myntra.com/roadster-jacket',
    inStock: true,
    category: 'Clothing',
    brand: 'Roadster',
    discount: 43,
    features: ['Classic denim', 'Distressed', 'Button closure', 'Chest pockets'],
  },
];

// Mock price history
export const MOCK_PRICE_HISTORY: Record<string, PriceHistory[]> = {
  'amz-001': [
    { date: '2024-01-01', price: 144900, marketplace: 'amazon' },
    { date: '2024-02-01', price: 142900, marketplace: 'amazon' },
    { date: '2024-03-01', price: 139900, marketplace: 'amazon' },
    { date: '2024-04-01', price: 134900, marketplace: 'amazon' },
  ],
  'flp-001': [
    { date: '2024-01-01', price: 144900, marketplace: 'flipkart' },
    { date: '2024-02-01', price: 141900, marketplace: 'flipkart' },
    { date: '2024-03-01', price: 139900, marketplace: 'flipkart' },
    { date: '2024-04-01', price: 136900, marketplace: 'flipkart' },
  ],
};

// Search function
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return MOCK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
};

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return MOCK_PRODUCTS.filter((p) => p.category === category);
};

// Get products by marketplace
export const getProductsByMarketplace = (marketplace: string): Product[] => {
  return MOCK_PRODUCTS.filter((p) => p.marketplace === marketplace);
};

// Compare products (find same product across marketplaces)
export const compareProduct = (productName: string): Product[] => {
  const normalized = productName.toLowerCase().replace(/\s+/g, ' ').trim();
  return MOCK_PRODUCTS.filter((p) => {
    const pName = p.name.toLowerCase().replace(/\s+/g, ' ').trim();
    return pName.includes(normalized) || normalized.includes(pName.substring(0, 20));
  });
};

// Get best deal for a product
export const getBestDeal = (productName: string): Product | null => {
  const products = compareProduct(productName);
  if (products.length === 0) return null;
  return products.reduce((best, current) => (current.price < best.price ? current : best));
};

// Mock search history
export interface SearchHistory {
  id: string;
  query: string;
  timestamp: Date;
  resultsCount: number;
}

export const MOCK_SEARCH_HISTORY: SearchHistory[] = [
  { id: 'sh-001', query: 'iPhone 15 Pro', timestamp: new Date('2024-04-20'), resultsCount: 12 },
  { id: 'sh-002', query: 'Samsung Galaxy S24', timestamp: new Date('2024-04-19'), resultsCount: 8 },
  { id: 'sh-003', query: 'Sony headphones', timestamp: new Date('2024-04-18'), resultsCount: 15 },
  { id: 'sh-004', query: 'Nike shoes', timestamp: new Date('2024-04-17'), resultsCount: 24 },
  { id: 'sh-005', query: 'Air fryer', timestamp: new Date('2024-04-16'), resultsCount: 18 },
];

// Mock price alerts
export interface PriceAlert {
  id: string;
  productId: string;
  productName: string;
  targetPrice: number;
  currentPrice: number;
  marketplace: string;
  triggered: boolean;
  createdAt: Date;
}

export const MOCK_PRICE_ALERTS: PriceAlert[] = [
  {
    id: 'pa-001',
    productId: 'amz-001',
    productName: 'iPhone 15 Pro (256GB)',
    targetPrice: 130000,
    currentPrice: 134900,
    marketplace: 'amazon',
    triggered: false,
    createdAt: new Date('2024-04-15'),
  },
  {
    id: 'pa-002',
    productId: 'amz-003',
    productName: 'Sony WH-1000XM5',
    targetPrice: 25000,
    currentPrice: 26990,
    marketplace: 'amazon',
    triggered: false,
    createdAt: new Date('2024-04-14'),
  },
  {
    id: 'pa-003',
    productId: 'amz-004',
    productName: 'Philips Air Fryer',
    targetPrice: 9000,
    currentPrice: 8999,
    marketplace: 'amazon',
    triggered: true,
    createdAt: new Date('2024-04-10'),
  },
];
