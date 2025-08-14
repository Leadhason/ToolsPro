export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  brand: string
  category: string
  rating?: number
  reviewCount?: number
  colors?: string[]
  discount?: number
  isNew?: boolean
  inStock: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
}

export interface Brand {
  id: string
  name: string
  logo: string
  productCount: number
}

const categories: Category[] = [
  {
    id: "1",
    name: "Power Tools",
    slug: "power-tools",
    description: "Professional grade power tools for all your construction needs",
    image: "/category-images/construction-worker-image-1.png",
    productCount: 45,
  },
  {
    id: "2",
    name: "Hand Tools",
    slug: "hand-tools",
    description: "Quality hand tools for precision work",
    image: "/category-images/construction-worker-image-2.png",
    productCount: 32,
  },
  {
    id: "3",
    name: "Garden Tools",
    slug: "garden-tools",
    description: "Everything you need for your garden",
    image: "/category-images/man-and-woman.png",
    productCount: 28,
  },
  {
    id: "4",
    name: "Automotive",
    slug: "automotive",
    description: "Tools and equipment for automotive work",
    image: "/category-images/mechanic-image.png",
    productCount: 19,
  },
  {
    id: "5",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    description: "Tools and appliances for home use",
    image: "/category-images/in kitchen.png",
    productCount: 24,
  },
  {
    id: "6",
    name: "Painting",
    slug: "painting",
    description: "Professional painting tools and supplies",
    image: "/category-images/man-and-woman-painting.png",
    productCount: 15,
  },
]

const products: Product[] = [
  {
    id: "1",
    name: "Karcher K2 Compact Pressure Washer",
    description: "Compact and lightweight pressure washer perfect for small to medium cleaning tasks around the home.",
    price: 299.99,
    originalPrice: 349.99,
    image: "/products/image-1.jpeg",
    hoverImage: "/products/image-2.jpeg",
    brand: "Karcher",
    category: "power-tools",
    rating: 4.5,
    reviewCount: 128,
    discount: 14,
    inStock: true,
  },
  {
    id: "2",
    name: "Bosch Professional Drill Set",
    description: "Professional grade drill with multiple bits and accessories for heavy-duty applications.",
    price: 189.99,
    image: "/products/image-3.jpeg",
    brand: "Bosch",
    category: "power-tools",
    rating: 4.8,
    reviewCount: 95,
    isNew: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Stanley Hammer Set",
    description: "Durable hammer set with ergonomic handles for comfortable use during extended work sessions.",
    price: 45.99,
    originalPrice: 59.99,
    image: "/products/image-4.jpeg",
    brand: "Stanley",
    category: "hand-tools",
    rating: 4.2,
    reviewCount: 67,
    colors: ["red", "blue"],
    inStock: true,
  },
  {
    id: "4",
    name: "Ingco Angle Grinder",
    description: "Powerful angle grinder suitable for cutting and grinding various materials with precision.",
    price: 79.99,
    image: "/products/image-5.jpeg",
    brand: "Ingco",
    category: "power-tools",
    rating: 4.3,
    reviewCount: 43,
    inStock: false,
  },
  {
    id: "5",
    name: "Total Tools Screwdriver Set",
    description: "Complete screwdriver set with magnetic tips and comfortable grip handles.",
    price: 29.99,
    image: "/products/image-6.jpeg",
    brand: "Total Tools",
    category: "hand-tools",
    rating: 4.1,
    reviewCount: 89,
    inStock: true,
  },
  {
    id: "6",
    name: "Einhell Cordless Drill",
    description: "Lightweight cordless drill with long-lasting battery and quick charging capability.",
    price: 129.99,
    originalPrice: 159.99,
    image: "/products/image-7.jpeg",
    brand: "Einhell",
    category: "power-tools",
    rating: 4.4,
    reviewCount: 156,
    discount: 19,
    inStock: true,
  },
  {
    id: "7",
    name: "Silverline Multi-Tool",
    description: "Versatile multi-tool with various attachments for different applications and materials.",
    price: 89.99,
    image: "/products/image-8.jpeg",
    brand: "Silverline",
    category: "power-tools",
    rating: 4.0,
    reviewCount: 34,
    inStock: true,
  },
  {
    id: "8",
    name: "Stayer Impact Wrench",
    description: "High-torque impact wrench designed for automotive and industrial applications.",
    price: 199.99,
    image: "/products/image-9.jpeg",
    brand: "Stayer",
    category: "automotive",
    rating: 4.6,
    reviewCount: 78,
    inStock: true,
  },
  {
    id: "9",
    name: "Wadfow Garden Shears",
    description: "Sharp and durable garden shears for pruning and trimming plants with precision.",
    price: 24.99,
    image: "/products/imqge-9.jpeg",
    brand: "Wadfow",
    category: "garden-tools",
    rating: 4.2,
    reviewCount: 45,
    inStock: true,
  },
  {
    id: "10",
    name: "Karcher Window Cleaner",
    description: "Professional window cleaning tool with streak-free results and ergonomic design.",
    price: 149.99,
    image: "/products/timage-10.png",
    brand: "Karcher",
    category: "home-kitchen",
    rating: 4.7,
    reviewCount: 112,
    isNew: true,
    inStock: true,
  },
]

const brands: Brand[] = [
  { id: "1", name: "Karcher", logo: "/brands/logo.svg", productCount: 15 },
  { id: "2", name: "Bosch", logo: "/brands/logoip.svg", productCount: 12 },
  { id: "3", name: "Stanley", logo: "/brands/logoipsum.svg", productCount: 8 },
  { id: "4", name: "Ingco", logo: "/brands/ipsum.svg", productCount: 10 },
  { id: "5", name: "Total Tools", logo: "/brands/mercado.svg", productCount: 7 },
  { id: "6", name: "Einhell", logo: "/brands/pagomiscuentas.svg", productCount: 6 },
  { id: "7", name: "Silverline", logo: "/brands/trendyol.svg", productCount: 4 },
  { id: "8", name: "Stayer", logo: "/brands/honeywell.png", productCount: 5 },
]

export async function getCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return categories
}

export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products.filter((product) => product.category === categorySlug)
}

export async function getProductById(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products.find((product) => product.id === id) || null
}

export async function getBrands(): Promise<Brand[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return brands
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products.filter((product) => product.rating && product.rating >= 4.5).slice(0, 8)
}

export async function getNewArrivals(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products.filter((product) => product.isNew).slice(0, 8)
}

export async function searchProducts(query: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.brand.toLowerCase().includes(lowercaseQuery),
  )
}
