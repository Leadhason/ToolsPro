export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  hoverImage?: string // Added hoverImage property
  category: string
  brand: string
  rating?: number
  reviewCount?: number
  inStock: boolean
  isNew?: boolean
  colors?: string[]
  detailImageOverlay?: string // New: for product detail page image overlay
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  subcategories: string[]
  bannerImage?: string // New: for category hero banner
  bannerDescription?: string // New: for category hero banner
}

export interface Brand {
  id: string
  name: string
  logo: string
}

export interface Review {
  id: number;
  product: string;
  rating: number;
  date: string;
  author: string;
  verified: boolean;
  content: string;
  productImage: string;
  supplyMasterReply?: {
    content: string;
    date: string;
  };
}

// Mock data
export const brands: Brand[] = [
  { id: "1", name: "Honeywell", logo: "/brands/honeywell.png" },
  { id: "2", name: "Mercado", logo: "/brands/logo.svg" },
  { id: "3", name: "Cuentas", logo: "/brands/ipsum.svg" },
  { id: "4", name: "Trendyol", logo: "/brands/trendyol.svg" },
  { id: "5", name: "LogoIpsum", logo: "/brands/logoipsum.svg" },
  { id: "6", name: "Logoip", logo: "/brands/logoip.svg" },
]

export const categories: Category[] = [
  {
    id: "1",
    name: "Tools",
    slug: "tools",
    description: "Hand & Power Tools",
    image: "/category-images/construction-worker-image-2.png",
    subcategories: ["Hand Tools", "Power Tools", "Measuring Tools"],
    bannerImage: "/category-images/mechanic-image.png",
    bannerDescription:
      "Explore a comprehensive range of hand and power tools for every project, from DIY home repairs to professional construction. Find drills, saws, wrenches, and more from top brands.",
  },
  {
    id: "2",
    name: "Outdoor Equipment",
    slug: "outdoor-equipment",
    description: "Water Pumps, Generators & More",
    image: "/category-images/man-and-woman.png",
    subcategories: ["Generators", "Water Pumps", "Garden Tools"],
    bannerImage: "/category-images/man-and-woman-painting.png",
    bannerDescription:
      "Equip yourself for any outdoor task with our robust selection of generators, water pumps, and garden tools. Power your projects and maintain your landscape with ease.",
  },
  {
    id: "3",
    name: "Building Materials",
    slug: "building-materials",
    description: "Plumbing, Electricals & More",
    image: "/category-images/construction-worker-image-1.png",
    subcategories: ["Plumbing", "Electrical", "Hardware"],
    bannerImage: "/category-images/construction-worker-image-1.png",
    bannerDescription:
      "Build strong and reliable structures with our high-quality building materials. From plumbing and electrical supplies to essential hardware, we have everything you need for your construction projects.",
  },
  {
    id: "4",
    name: "Home Essentials & Decor",
    slug: "home-essentials",
    description: "Bath, Kitchen, Lighting & More",
    image: "/category-images/in kitchen.png",
    subcategories: ["Kitchen", "Bathroom", "Lighting"],
    bannerImage: "/category-images/construction-worker-image-2.png",
    bannerDescription:
      "Transform your living space with our collection of home essentials and decor. Discover stylish and functional items for your kitchen, bathroom, and lighting needs to create the perfect ambiance.",
  },
]

export const products: Product[] = [
  // Ingco Tools
  {
    id: "1",
    name: "Ingco Peripheral Water Pumps - 0.5HP, 0.75HP & 1HP - VPM Series",
    description: "High-quality peripheral water pump for residential use",
    price: 670.0,
    image: "/products/image-1.jpeg",
    hoverImage: "/products/image-2.jpeg", // Added hover image
    category: "outdoor-equipment",
    brand: "Ingco",
    rating: 4.5,
    reviewCount: 12,
    inStock: true,
  },
  {
    id: "2",
    name: "Ingco Industrial Heavy Duty Brass Padlock",
    description: "Durable brass padlock for industrial applications",
    price: 220.0,
    image: "/products/image-2.jpeg",
    hoverImage: "/products/image-1.jpeg", // Added hover image
    category: "tools",
    brand: "Ingco",
    inStock: true,
  },
  {
    id: "3",
    name: "Ingco Gasoline Grass Trimmer & Bush Cutter 2HP - GBC543421",
    description: "Powerful grass trimmer for lawn maintenance",
    price: 2030.0,
    image: "/products/image-3.jpeg",
    hoverImage: "/products/image-4.jpeg", // Added hover image
    category: "outdoor-equipment",
    brand: "Ingco",
    rating: 4.0,
    reviewCount: 8,
    inStock: true,
  },
  {
    id: "4",
    name: "Ingco Safety Helmets – Durable PVC Protection (Yellow, Blue, White, Red)",
    description: "Professional safety helmets in multiple colors",
    price: 50.0,
    image: "/products/image-4.jpeg",
    hoverImage: "/products/image-5.jpeg", // Added hover image
    category: "tools",
    brand: "Ingco",
    colors: ["yellow", "blue", "white", "red"],
    inStock: true,
  },
  {
    id: "5",
    name: "Ingco Knitted & PVC Dots Gloves - Size 10 (XL) – HGVK05",
    description: "Comfortable work gloves with PVC dots for grip",
    price: 7.0,
    image: "/products/image-5.jpeg",
    hoverImage: "/products/image-3.jpeg", // Added hover image
    category: "tools",
    brand: "Ingco",
    rating: 5.0,
    reviewCount: 15,
    inStock: true,
  },
  // Total Tools
  {
    id: "6",
    name: "Total Gasoline Generator 9.0KW - TP190006",
    description: "Powerful gasoline generator for backup power",
    price: 13750.0,
    image: "/products/image-6.jpeg",
    hoverImage: "/products/image-7.jpeg", // Added hover image
    category: "outdoor-equipment",
    brand: "Total Tools",
    inStock: true,
  },
  {
    id: "7",
    name: "Total Rotary Hammer 650W SDS-Plus - TH306236",
    description: "Professional rotary hammer for drilling",
    price: 820.0,
    image: "/products/image-7.jpeg",
    hoverImage: "/products/image-8.jpeg", // Added hover image
    category: "tools",
    brand: "Total Tools",
    rating: 4.5,
    reviewCount: 6,
    inStock: true,
  },
  {
    id: "8",
    name: "Total High Pressure Washer 1400W - TGT11316",
    description: "High-pressure washer for cleaning tasks",
    price: 1090.0,
    image: "/products/image-8.jpeg",
    hoverImage: "/products/image-9.jpeg", // Added hover image
    category: "outdoor-equipment",
    brand: "Total Tools",
    rating: 4.0,
    reviewCount: 4,
    inStock: true,
  },
  {
    id: "9",
    name: "Total Wire Cup Twist Brush",
    description: "Wire brush for surface preparation",
    price: 30.0,
    image: "/products/image-9.jpeg",
    hoverImage: "/products/image-9.jpeg", // Added hover image
    category: "tools",
    brand: "Total Tools",
    inStock: true,
  },
  {
    id: "10",
    name: "Total Latex Gloves - TSP13102",
    description: "Protective latex gloves for various tasks",
    price: 20.0,
    image: "/products/image-9.jpeg", // Using existing image from sync
    hoverImage: "/products/image-9.jpeg", // Added hover image
    category: "tools",
    brand: "Total Tools",
    inStock: true,
  },
  // Home Appliances
  {
    id: "11",
    name: "Decakila Smart Home Basic Set - Electric Iron, Electric Kettle & Electric Double Hot Plate",
    description: "Complete smart home appliance bundle",
    price: 510.0,
    originalPrice: 800.0,
    discount: 36,
    image: "/products/image-3.jpeg",
    hoverImage: "/products/image-6.jpeg", // Added hover image
    category: "home-essentials",
    brand: "Decakila",
    isNew: true,
    inStock: true,
  },
  {
    id: "12",
    name: "Ariston Aures Slim Instant Water Heater 5.5KW - Multi Point",
    description: "Instant water heater for multiple points",
    price: 2400.0,
    originalPrice: 3444.0,
    discount: 30,
    image: "/products/image-6.jpeg",
    hoverImage: "/products/image-7.jpeg", // Added hover image
    category: "home-essentials",
    brand: "Ariston",
    rating: 4.5,
    reviewCount: 8,
    inStock: true,
  },
  {
    id: "13",
    name: "Ariston Kairos Thermo HF Flat Roof Solar Water Heater - 150, 200 & 300 Liters",
    description: "Solar water heater system for eco-friendly heating",
    price: 28000.0,
    originalPrice: 33600.0,
    discount: 17,
    image: "/products/image-7.jpeg",
    hoverImage: "/products/image-1.jpeg", // Added hover image
    category: "home-essentials",
    brand: "Ariston",
    inStock: true,
  },
  {
    id: "14",
    name: "Decakila 1.8L Stainless Steel Electric Kettle 1500W - KEKT031M",
    description: "Stainless steel electric kettle with fast heating",
    price: 90.0,
    originalPrice: 130.0,
    discount: 31,
    image: "/products/image-1.jpeg",
    hoverImage: "/products/image-2.jpeg", // Added hover image
    category: "home-essentials",
    brand: "Decakila",
    rating: 4.2,
    reviewCount: 18,
    inStock: true,
  },
  // Karcher Products
  {
    id: "15",
    name: "Karcher Stone And Paving Cleaner 5L - RM 623",
    description: "Professional stone and paving cleaner",
    price: 370.0,
    image: "/products/image-2.jpeg",
    hoverImage: "/products/image-3.jpeg", // Added hover image
    category: "outdoor-equipment",
    brand: "Karcher",
    rating: 4.8,
    reviewCount: 12,
    inStock: true,
  },
  {
    id: "16",
    name: "Karcher K3 High pressure Washer 1600W 120 Bar",
    description: "High-pressure washer for home use",
    price: 4000.0,
    image: "/products/image-3.jpeg",
    hoverImage: "/products/image-4.jpeg", // Added hover image
    category: "outdoor-equipment",
    brand: "Karcher",
    inStock: true,
  },
  // Building Essentials (New additions)
  {
    id: "17",
    name: "Schneider 3 Pin Rounded 15AMPS Plug Top",
    description: "High-quality electrical plug for home use",
    price: 50.0,
    image: "/products/image-1.jpeg", // Replaced placeholder
    hoverImage: "/products/image-2.jpeg", // Replaced placeholder
    category: "building-materials",
    brand: "Schneider",
    inStock: false,
  },
  {
    id: "18",
    name: "Black Metal Old Wood Cuboid Island Chandelier Ceiling Light 44E27 - L800mm",
    description: "Elegant chandelier for modern homes",
    price: 4300.0,
    image: "/products/image-3.jpeg", // Replaced placeholder
    hoverImage: "/products/image-4.jpeg", // Replaced placeholder
    category: "home-essentials",
    brand: "Generic",
    inStock: true,
  },
  {
    id: "19",
    name: "Tanaro Dark Grey Vintage E27 Outdoor Wall Lantern - 40W",
    description: "Vintage outdoor wall lantern",
    price: 420.0,
    image: "/products/image-19.jpeg",
    hoverImage: "/products/image-1.jpeg", // Added hover image
    category: "home-essentials",
    brand: "Tanaro",
    inStock: false,
  },
  {
    id: "20",
    name: "Bosch Series 4 Semi-Integrated Dish Washer 60cm - SMI63D05GC",
    description: "Efficient dishwasher for modern kitchens",
    price: 16700.0,
    image: "/products/image-5.jpeg", // Replaced placeholder
    hoverImage: "/products/image-6.jpeg", // Replaced placeholder
    category: "home-essentials",
    brand: "Bosch",
    inStock: true,
  },
  {
    id: "21",
    name: "Multi-Arm 13 Globe Dimpled Ceiling Light Elegant Gold",
    description: "Elegant multi-arm ceiling light",
    price: 2800.0,
    image: "/products/image-7.jpeg", // Replaced placeholder
    hoverImage: "/products/image-8.jpeg", // Replaced placeholder
    category: "home-essentials",
    brand: "Generic",
    inStock: true,
  },
  // Karcher Additional Products (New additions)
  {
    id: "22",
    name: "Karcher Cordless Battery Powered Vacuum Cleaner Premium OurFamily- VC 6",
    description: "Cordless vacuum cleaner for home use",
    price: 11000.0,
    image: "/products/image-9.jpeg", // Replaced placeholder
    hoverImage: "/products/imqge-9.jpeg", // Replaced placeholder (using typo image for variety)
    category: "outdoor-equipment",
    brand: "Karcher",
    inStock: true,
  },
  {
    id: "23",
    name: "Karcher Car Shampoo RM 619, 5L",
    description: "Professional car shampoo",
    price: 290.0,
    image: "/products/timage-10.png", // Replaced placeholder
    hoverImage: "/products/image-1.jpeg", // Replaced placeholder (cycling)
    category: "outdoor-equipment",
    brand: "Karcher",
    inStock: true,
  },
  {
    id: "24",
    name: "Karcher Hose Set With Hose Hanger, 15 M",
    description: "Complete hose set with hanger",
    price: 920.0,
    image: "/products/image-2.jpeg", // Replaced placeholder (cycling)
    hoverImage: "/products/image-3.jpeg", // Replaced placeholder (cycling)
    category: "outdoor-equipment",
    brand: "Karcher",
    inStock: true,
  },
  // Lighting Products (New additions)
  {
    id: "25",
    name: "Ingco Waterproof Rechargeable LED Flashlight 460 Lumens with 6 Light Modes – HCFL1865051",
    description: "Professional LED flashlight with multiple modes",
    price: 380.0,
    image: "/products/image-4.jpeg", // Replaced placeholder (cycling)
    hoverImage: "/products/image-5.jpeg", // Replaced placeholder (cycling)
    category: "tools",
    brand: "Ingco",
    rating: 4.5,
    reviewCount: 8,
    inStock: true,
  },
  {
    id: "26",
    name: "C-Torch 3W White & Warm Spotlight",
    description: "Compact LED spotlight",
    price: 100.0,
    image: "/products/image-6.jpeg", // Replaced placeholder (cycling)
    hoverImage: "/products/image-7.jpeg", // Replaced placeholder (cycling)
    category: "home-essentials",
    brand: "C-Torch",
    rating: 4.0,
    reviewCount: 5,
    inStock: true,
  },
  {
    id: "27",
    name: "Artu Black And Gold Outdoor Garden Pathway Lamp Post - 3 X 40W",
    description: "Elegant outdoor pathway lamp",
    price: 2900.0,
    image: "/products/image-8.jpeg", // Replaced placeholder (cycling)
    hoverImage: "/products/image-9.jpeg", // Replaced placeholder (cycling)
    category: "home-essentials",
    brand: "Artu",
    inStock: true,
  },
  {
    id: "28",
    name: "C-Torch Round Surface Mount Led Panel Light",
    description: "Modern LED panel light",
    price: 180.0,
    image: "/products/imqge-9.jpeg", // Replaced placeholder (cycling)
    hoverImage: "/products/timage-10.png", // Replaced placeholder (cycling)
    category: "home-essentials",
    brand: "C-Torch",
    inStock: true,
  },
  {
    id: "29",
    name: "Ingco Round LED Panel Light – 8W & 24W with Daylight Color – HDL1005081 & HDL2225241",
    description: "Round LED panel with daylight color",
    price: 40.0,
    image: "/products/image-1.jpeg", // Replaced placeholder (cycling)
    hoverImage: "/products/image-2.jpeg", // Replaced placeholder (cycling)
    category: "home-essentials",
    brand: "Ingco",
    rating: 4.2,
    reviewCount: 12,
    inStock: true,
  },
  // New Arrivals (New additions)
  {
    id: "30",
    name: "Ingco Lithium-Ion Compact Brushless Cordless Drill 20V - CDL1205581",
    description: "Compact brushless cordless drill",
    price: 420.0,
    originalPrice: 650.0,
    discount: 35,
    image: "/products/image-3.jpeg", // Replaced placeholder (cycling)
    hoverImage: "/products/image-4.jpeg", // Replaced placeholder (cycling)
    category: "tools",
    brand: "Ingco",
    isNew: true,
    inStock: true,
  },
  {
    id: "31",
    name: "Ingco Cordless Spray Gun - CSGL12004",
    description: "Cordless spray gun for painting",
    price: 510.0,
    image: "/products/image-5.jpeg", // Replaced placeholder (cycling)
    hoverImage: "/products/image-6.jpeg", // Replaced placeholder (cycling)
    category: "tools",
    brand: "Ingco",
    isNew: true,
    inStock: true,
  },
  {
    id: "32",
    name: "Ingco AC Voltage Detector - VD100091",
    description: "AC voltage detector for electrical work",
    price: 70.0,
    originalPrice: 160.0,
    discount: 56,
    image: "/products/image-7.jpeg", // Replaced placeholder (cycling)
    hoverImage: "/products/image-8.jpeg", // Replaced placeholder (cycling)
    category: "tools",
    brand: "Ingco",
    inStock: true,
  },
  {
    id: "33",
    name: "Wadfow PH2+PH2 65mm Impact Screwdriver Bit Set - WSV3K62",
    description: "Impact screwdriver bit set",
    price: 10.0,
    image: "/products/image-9.jpeg", // Replaced placeholder (cycling)
    hoverImage: "/products/imqge-9.jpeg", // Replaced placeholder (cycling)
    category: "tools",
    brand: "Wadfow",
    isNew: true,
    inStock: true,
  },
  {
    id: "34",
    name: "Wadfow 31 Pieces Precision Screwdriver Set - WSS1J31",
    description: "Precision screwdriver set",
    price: 40.0,
    image: "/products/timage-10.png", // Replaced placeholder (cycling)
    hoverImage: "/products/image-1.jpeg", // Replaced placeholder (cycling)
    category: "tools",
    brand: "Wadfow",
    inStock: true,
  },
  {
    id: "35",
    name: "Total High Pressure Washer 2500W - TGT11246",
    description: "Powerful high pressure washer with induction motor",
    price: 3320.0,
    image: "/products/timage-10.png",
    detailImageOverlay: "/product-details/total-pressure-washer-overlay.png", // Specific overlay image
    category: "outdoor-equipment",
    brand: "Total Tools",
    rating: 4.5,
    reviewCount: 896,
    inStock: true,
  },
  {
    id: "36",
    name: "Total 5m Quick Connect High-Pressure Hose - TGTHPH526",
    description: "5-meter quick connect high-pressure hose",
    price: 140.0,
    image: "/products/image-2.jpeg", // Replaced placeholder (cycling)
    category: "outdoor-equipment",
    brand: "Total Tools",
    inStock: true,
  },
  {
    id: "37",
    name: "Total Gasoline High Pressure Washer 282Bar 8.5HP - TGT250306",
    description: "Gasoline high pressure washer for heavy duty use",
    price: 10000.0,
    image: "/products/image-3.jpeg", // Replaced placeholder (cycling)
    category: "outdoor-equipment",
    brand: "Total Tools",
    inStock: true,
  },
  {
    id: "38",
    name: "Silverline High Pressure Washer 2100W 165Bar - 943676",
    description: "High pressure washer with powerful motor",
    price: 7700.0,
    image: "/products/image-4.jpeg", // Replaced placeholder (cycling)
    category: "outdoor-equipment",
    brand: "Silverline",
    inStock: true,
  },
  {
    id: "39",
    name: "Total Li-ion Cordless High Pressure Washer 24.8 Bar 20V - TPWLI20084",
    description: "Cordless high pressure washer for portable cleaning",
    price: 1500.0,
    image: "/products/image-5.jpeg", // Replaced placeholder (cycling)
    category: "outdoor-equipment",
    brand: "Total Tools",
    inStock: true,
  },
]

// Mock data for reviews
const reviews: Review[] = [
  {
    id: 1,
    product: "Decakila 1.8L Stainless Steel Electric Kettle 1500W - KEKT031M",
    rating: 4,
    date: "08/27/2025",
    author: "Ruth Ann",
    verified: true,
    content: "Great kettle, heats water quickly and efficiently.",
    productImage: products.find(p => p.name === "Decakila 1.8L Stainless Steel Electric Kettle 1500W - KEKT031M")?.image || "/placeholder.svg",
    supplyMasterReply: {
      content:
        "Hi Ruth Ann, thank you for taking the time to leave a review for our Decakila 1.8L Stainless Steel Electric Kettle. We are excited to hear that you had a positive experience with us and that our delivery was fast. We strive to provide efficient and timely service to all of our customers. Thank you for choosing EDMAX! Have a great day!",
      date: "08/28/2025",
    },
  },
  {
    id: 2,
    product: "Decakila Triple Burner Gas Stove - KMGS009B",
    rating: 3,
    date: "08/27/2025",
    author: "OWUSU RICHMOND",
    verified: true,
    content: "Nice\nBut yet to use",
    productImage: products.find(p => p.name === "Decakila Triple Burner Gas Stove - KMGS009B")?.image || "/placeholder.svg",
    supplyMasterReply: {
      content:
        "Thank you for your review, Osei! We're glad to hear that you find our Decakila Double Hot Plate to be very nice and good for cooking. Happy cooking!",
      date: "08/28/2025",
    },
  },
  {
    id: 3,
    product: "Wadlow Safety Goggles - WSG2801",
    rating: 5,
    date: "08/25/2025",
    author: "Rollie Khay",
    verified: true,
    content: "Safety goggles\nFantastic PPE that help me during working",
    productImage: products.find(p => p.name === "Wadlow Safety Goggles - WSG2801")?.image || "/placeholder.svg",
    supplyMasterReply: {
      content:
        "Hi Rollie! Thank you for your positive review of our Wadlow Safety Goggles. We're so glad to hear that they have been a great help to you during your work. Your safety is our top priority and we're happy to provide you with reliable PPE. Thank you for choosing EDMAX! Stay safe.",
      date: "08/26/2025",
    },
  },
  {
    id: 4,
    product: "Akfix Waterguard Acrylic Waterproofing Membrane - EM600",
    rating: 5,
    date: "08/24/2025",
    author: "Michael Kwofie Keelson",
    verified: true,
    content: "Good\nDelivery was fast",
    productImage: products.find(p => p.name === "Akfix Waterguard Acrylic Waterproofing Membrane - EM600")?.image || "/placeholder.svg",
    supplyMasterReply: {
      content:
        "Hi Michael, thank you for taking the time to leave a review for our Akfix Waterguard Acrylic Waterproofing Membrane. We are excited to hear that you had a positive experience with us and that our delivery was fast. We strive to provide efficient and timely service to all of our customers. Thank you for choosing EDMAX! Have a great day!",
      date: "08/25/2025",
    },
  },
  {
    id: 5,
    product: "Decakila Double Hot Plate 2000W - KECC002B",
    rating: 5,
    date: "08/24/2025",
    author: "Osei Evans",
    verified: true,
    content: "Very nice and very good for cooking",
    productImage: products.find(p => p.name === "Decakila Double Hot Plate 2000W - KECC002B")?.image || "/placeholder.svg",
    supplyMasterReply: {
      content:
        "Thank you for your review, Osei! We're glad to hear that you find our Decakila Double Hot Plate to be very nice and good for cooking. Happy cooking!",
      date: "08/25/2025",
    },
  },
  {
    id: 6,
    product: "Kumtel Digital Scale 260x260mm - HDB 02 HDB 03",
    rating: 5,
    date: "08/22/2025",
    author: "LERA KATIMBA",
    verified: true,
    content: "Kumtel Digital Scale 260x260mm - HDB 02 HDB 03",
    productImage: products.find(p => p.name === "Kumtel Digital Scale 260x260mm - HDB 02 HDB 03")?.image || "/placeholder.svg",
  },
]

export async function getReviews(): Promise<Review[]> {
  await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate API delay
  return reviews;
}

// API functions
export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products.filter((product) => product.category === category)
}

export async function getProductsByBrand(brand: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products.filter((product) => product.brand.toLowerCase() === brand.toLowerCase())
}

export async function getProduct(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products.find((product) => product.id === id) || null
}

export async function getCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return categories
}

export async function getBrands(): Promise<Brand[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return brands
}

export async function getNewArrivals(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products.filter((product) => product.isNew || product.discount)
}

export async function getBuildingEssentials(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products
    .filter((product) => product.category === "building-materials" || product.category === "home-essentials")
    .slice(0, 5)
}

export async function getLightingProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes("light") ||
      product.name.toLowerCase().includes("led") ||
      product.name.toLowerCase().includes("lamp") ||
      product.name.toLowerCase().includes("torch"),
  )
}

export async function getSimilarProducts(productId: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const currentProduct = products.find((p) => p.id === productId)
  if (!currentProduct) return []

  // Return products from the same category, excluding the current product
  return products.filter((p) => p.category === currentProduct.category && p.id !== productId).slice(0, 5) // Limit to 5 similar products
}

// New function to get all images for a product, replacing placeholders with actual images
export async function getProductImages(productId: string): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate API delay
  const product = products.find(p => p.id === productId);

  if (!product) {
    return [];
  }

  const allImages: string[] = [];
  const availableImages = products.filter(p => !p.image.includes("placeholder.svg")).map(p => p.image);
  let imageIndex = 0;

  const getNextAvailableImage = () => {
    if (availableImages.length === 0) return "/placeholder.svg"; // Fallback if no real images exist
    const image = availableImages[imageIndex % availableImages.length];
    imageIndex++;
    return image;
  };

  // Add main image, with fallback
  allImages.push(product.image && !product.image.includes("placeholder.svg") ? product.image : getNextAvailableImage());

  // Add hover image, with fallback
  if (product.hoverImage) {
    allImages.push(product.hoverImage && !product.hoverImage.includes("placeholder.svg") ? product.hoverImage : getNextAvailableImage());
  }

  // Add additional images, ensuring they are not placeholders and cycle through available images
  for (let i = 0; i < 3; i++) { // Add up to 3 additional unique images
    let newImage = getNextAvailableImage();
    // Ensure unique images for additional slots, avoid duplicates with main/hover
    while (allImages.includes(newImage) && availableImages.length > allImages.length) {
      newImage = getNextAvailableImage();
    }
    if (!allImages.includes(newImage)) {
      allImages.push(newImage);
    }
  }

  return allImages.filter(Boolean); // Filter out any potential empty strings
}
