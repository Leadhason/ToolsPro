export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  brand: string
  rating?: number
  reviewCount?: number
  inStock: boolean
  isNew?: boolean
  colors?: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  subcategories: string[]
}

export interface Brand {
  id: string
  name: string
  logo: string
}

// Mock data
export const brands: Brand[] = [
  { id: "1", name: "Ingco", logo: "/placeholder.svg?height=60&width=120&text=INGCO" },
  { id: "2", name: "Wadfow", logo: "/placeholder.svg?height=60&width=120&text=WADFOW" },
  { id: "3", name: "Decakila", logo: "/placeholder.svg?height=60&width=120&text=decakila" },
  { id: "4", name: "Total Tools", logo: "/placeholder.svg?height=60&width=120&text=TOTAL+TOOLS" },
  { id: "5", name: "Karcher", logo: "/placeholder.svg?height=60&width=120&text=KARCHER" },
  { id: "6", name: "TKL Lights", logo: "/placeholder.svg?height=60&width=120&text=TKL+LIGHTS" },
]

export const categories: Category[] = [
  {
    id: "1",
    name: "Tools",
    slug: "tools",
    description: "Hand & Power Tools",
    image: "/placeholder.svg?height=400&width=600&text=Tools",
    subcategories: ["Hand Tools", "Power Tools", "Measuring Tools"],
  },
  {
    id: "2",
    name: "Outdoor Equipment",
    slug: "outdoor-equipment",
    description: "Water Pumps, Generators & More",
    image: "/placeholder.svg?height=400&width=600&text=Outdoor+Equipment",
    subcategories: ["Generators", "Water Pumps", "Garden Tools"],
  },
  {
    id: "3",
    name: "Building Materials",
    slug: "building-materials",
    description: "Plumbing, Electricals & More",
    image: "/placeholder.svg?height=400&width=600&text=Building+Materials",
    subcategories: ["Plumbing", "Electrical", "Hardware"],
  },
  {
    id: "4",
    name: "Home Essentials & Decor",
    slug: "home-essentials",
    description: "Bath, Kitchen, Lighting & More",
    image: "/placeholder.svg?height=400&width=600&text=Home+Essentials",
    subcategories: ["Kitchen", "Bathroom", "Lighting"],
  },
]

export const products: Product[] = [
  // Ingco Tools
  {
    id: "1",
    name: "Ingco Peripheral Water Pumps - 0.5HP, 0.75HP & 1HP - VPM Series",
    description: "High-quality peripheral water pump for residential use",
    price: 670.0,
    image: "/placeholder.svg?height=300&width=300&text=Water+Pump",
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
    image: "/placeholder.svg?height=300&width=300&text=Padlock",
    category: "tools",
    brand: "Ingco",
    inStock: true,
  },
  {
    id: "3",
    name: "Ingco Gasoline Grass Trimmer & Bush Cutter 2HP - GBC543421",
    description: "Powerful grass trimmer for lawn maintenance",
    price: 2030.0,
    image: "/placeholder.svg?height=300&width=300&text=Grass+Trimmer",
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
    image: "/placeholder.svg?height=300&width=300&text=Safety+Helmets",
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
    image: "/placeholder.svg?height=300&width=300&text=Work+Gloves",
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
    image: "/placeholder.svg?height=300&width=300&text=Generator",
    category: "outdoor-equipment",
    brand: "Total Tools",
    inStock: true,
  },
  {
    id: "7",
    name: "Total Rotary Hammer 650W SDS-Plus - TH306236",
    description: "Professional rotary hammer for drilling",
    price: 820.0,
    image: "/placeholder.svg?height=300&width=300&text=Rotary+Hammer",
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
    image: "/placeholder.svg?height=300&width=300&text=Pressure+Washer",
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
    image: "/placeholder.svg?height=300&width=300&text=Wire+Brush",
    category: "tools",
    brand: "Total Tools",
    inStock: true,
  },
  {
    id: "10",
    name: "Total Latex Gloves - TSP13102",
    description: "Protective latex gloves for various tasks",
    price: 20.0,
    image: "/placeholder.svg?height=300&width=300&text=Latex+Gloves",
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
    image: "/placeholder.svg?height=300&width=300&text=Smart+Home+Set",
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
    image: "/placeholder.svg?height=300&width=300&text=Water+Heater",
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
    image: "/placeholder.svg?height=300&width=300&text=Solar+Heater",
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
    image: "/placeholder.svg?height=300&width=300&text=Electric+Kettle",
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
    image: "/placeholder.svg?height=300&width=300&text=Stone+Cleaner",
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
    image: "/placeholder.svg?height=300&width=300&text=K3+Washer",
    category: "outdoor-equipment",
    brand: "Karcher",
    inStock: true,
  },
]

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
