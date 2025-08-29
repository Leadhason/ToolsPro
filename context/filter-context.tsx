"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import type { Product } from "@/lib/data"

// Filter state interface
export interface FilterState {
  // Price filtering
  priceRange: [number, number]
  
  // Category/Type filtering
  productTypes: string[]
  
  // Brand filtering
  brands: string[]
  
  // Availability filtering
  availability: string[] // ["in-stock", "out-of-stock"]
  
  // Rating filtering
  minRating: number
  
  // New arrivals filtering
  showNewOnly: boolean
  
  // Sorting
  sortBy: string // "featured" | "price-low-high" | "price-high-low" | "newest" | "rating" | "alphabetical"
  
  // View mode
  viewMode: "grid" | "list"
  

}

// Filter context type
interface FilterContextType {
  // Current filter state
  filters: FilterState
  
  // Filtered products
  filteredProducts: Product[]
  
  // Available products (source data)
  allProducts: Product[]
  
  // Loading state
  isLoading: boolean
  
  // Actions
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  clearFilters: () => void
  resetFilter: <K extends keyof FilterState>(key: K) => void
  setProducts: (products: Product[]) => void
  
  // Filter counts (for UI display)
  getFilterCounts: () => {
    availability: { [key: string]: number }
    brands: { [key: string]: number }
    productTypes: { [key: string]: number }
    totalProducts: number
  }
}

// Filter actions
type FilterAction =
  | { type: "UPDATE_FILTER"; key: keyof FilterState; value: any }
  | { type: "CLEAR_FILTERS" }
  | { type: "RESET_FILTER"; key: keyof FilterState }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_PRODUCTS"; products: Product[] }
  | { type: "INIT_FROM_URL"; params: URLSearchParams }

// Initial filter state
const initialState: FilterState = {
  priceRange: [0, 300000],
  productTypes: [],
  brands: [],
  availability: [],
  minRating: 0,
  showNewOnly: false,
  sortBy: "featured",
  viewMode: "grid",
}

// Extended state for reducer (includes products and loading)
interface ExtendedFilterState extends FilterState {
  allProducts: Product[]
  isLoading: boolean
}

// Filter reducer
function filterReducer(state: ExtendedFilterState, action: FilterAction): ExtendedFilterState {
  switch (action.type) {
    case "UPDATE_FILTER":
      return {
        ...state,
        [action.key]: action.value,
      }
    
    case "CLEAR_FILTERS":
      return {
        ...state,
        ...initialState,
        // Preserve non-filter state
        allProducts: state.allProducts,
        isLoading: state.isLoading,
      }
    
    case "RESET_FILTER":
      return {
        ...state,
        [action.key]: initialState[action.key],
      }
    
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.loading,
      }
    
    case "SET_PRODUCTS":
      return {
        ...state,
        allProducts: action.products,
        isLoading: false,
      }
    
    case "INIT_FROM_URL":
      const params = action.params
      return {
        ...state,
        // Parse URL parameters
        priceRange: [
          Number.parseInt(params.get("minPrice") || "0"),
          Number.parseInt(params.get("maxPrice") || "300000"),
        ] as [number, number],
        productTypes: params.get("productTypes")?.split(",").filter(Boolean) || [],
        brands: params.get("brands")?.split(",").filter(Boolean) || [],
        availability: params.get("availability")?.split(",").filter(Boolean) || [],
        minRating: Number.parseInt(params.get("minRating") || "0"),
        showNewOnly: params.get("showNewOnly") === "true",
        sortBy: params.get("sortBy") || "featured",
        viewMode: (params.get("viewMode") as "grid" | "list") || "grid",
      }
    
    default:
      return state
  }
}

// Filter logic function
function applyFilters(products: Product[], filters: FilterState): Product[] {
  let filtered = [...products]

  // Apply availability filter
  if (filters.availability.length > 0) {
    filtered = filtered.filter((product) => {
      if (filters.availability.includes("in-stock")) return product.inStock
      if (filters.availability.includes("out-of-stock")) return !product.inStock
      return true
    })
  }

  // Apply product type filter
  if (filters.productTypes.length > 0) {
    filtered = filtered.filter((product) =>
      filters.productTypes.some((type) =>
        product.name.toLowerCase().includes(type.toLowerCase().replace("-", " "))
      )
    )
  }

  // Apply brand filter
  if (filters.brands.length > 0) {
    filtered = filtered.filter((product) =>
      filters.brands.some((brand) => product.brand.toLowerCase() === brand.toLowerCase())
    )
  }

  // Apply price range filter
  filtered = filtered.filter(
    (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
  )

  // Apply rating filter
  if (filters.minRating > 0) {
    filtered = filtered.filter((product) => (product.rating || 0) >= filters.minRating)
  }

  // Apply new arrivals filter
  if (filters.showNewOnly) {
    filtered = filtered.filter((product) => product.isNew)
  }

  // Apply sorting
  switch (filters.sortBy) {
    case "price-low-high":
      filtered.sort((a, b) => a.price - b.price)
      break
    case "price-high-low":
      filtered.sort((a, b) => b.price - a.price)
      break
    case "newest":
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      break
    case "rating":
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      break
    case "alphabetical":
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "featured":
    default:
      // Keep original order for featured
      break
  }

  return filtered
}

// Create context
const FilterContext = createContext<FilterContextType | undefined>(undefined)

// Filter provider component
export function FilterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize reducer with extended state
  const [state, dispatch] = useReducer(filterReducer, {
    ...initialState,
    allProducts: [],
    isLoading: false,
  })

  // Initialize from URL parameters on mount (only once)
  useEffect(() => {
    dispatch({ type: "INIT_FROM_URL", params: searchParams })
  }, []) // Empty dependency array - only run once on mount

    // Update URL when filters change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams()

      // Add filter parameters to URL
      if (state.priceRange[0] !== 0) params.set("minPrice", state.priceRange[0].toString())
      if (state.priceRange[1] !== 300000) params.set("maxPrice", state.priceRange[1].toString())
      if (state.productTypes.length > 0) params.set("productTypes", state.productTypes.join(","))
      if (state.brands.length > 0) params.set("brands", state.brands.join(","))
      if (state.availability.length > 0) params.set("availability", state.availability.join(","))
      if (state.minRating > 0) params.set("minRating", state.minRating.toString())
      if (state.showNewOnly) params.set("showNewOnly", "true")
      if (state.sortBy !== "featured") params.set("sortBy", state.sortBy)
      if (state.viewMode !== "grid") params.set("viewMode", state.viewMode)

      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
      router.replace(newUrl, { scroll: false })
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [
    // Use primitive values to avoid array reference issues
    state.priceRange[0],
    state.priceRange[1],
    state.productTypes.join(","),
    state.brands.join(","),
    state.availability.join(","),
    state.minRating,
    state.showNewOnly,
    state.sortBy,
    state.viewMode,
    pathname,
    router,
  ])

  // Action functions (memoized)
  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    dispatch({ type: "SET_LOADING", loading: true })
    dispatch({ type: "UPDATE_FILTER", key, value })
    // Loading will be set to false after a short delay to show visual feedback
    setTimeout(() => {
      dispatch({ type: "SET_LOADING", loading: false })
    }, 100)
  }, [])

  const clearFilters = useCallback(() => {
    dispatch({ type: "CLEAR_FILTERS" })
  }, [])

  const resetFilter = useCallback(<K extends keyof FilterState>(key: K) => {
    dispatch({ type: "RESET_FILTER", key })
  }, [])

  const setProducts = useCallback((products: Product[]) => {
    dispatch({ type: "SET_PRODUCTS", products })
  }, [])

  // Calculate filter counts for UI display (memoized)
  const getFilterCounts = useCallback(() => {
    const { allProducts } = state
    
    return {
      availability: {
        "in-stock": allProducts.filter(p => p.inStock).length,
        "out-of-stock": allProducts.filter(p => !p.inStock).length,
      },
      brands: allProducts.reduce((acc, product) => {
        const brand = product.brand.toLowerCase()
        acc[brand] = (acc[brand] || 0) + 1
        return acc
      }, {} as { [key: string]: number }),
      productTypes: {
        "pressure-washer": allProducts.filter(p => p.name.toLowerCase().includes("pressure washer")).length,
        "drill": allProducts.filter(p => p.name.toLowerCase().includes("drill")).length,
        "hammer": allProducts.filter(p => p.name.toLowerCase().includes("hammer")).length,
        "screwdriver": allProducts.filter(p => p.name.toLowerCase().includes("screwdriver")).length,
        "grinder": allProducts.filter(p => p.name.toLowerCase().includes("grinder")).length,
      },
      totalProducts: allProducts.length,
    }
  }, [state.allProducts])

    // Apply filters to get filtered products (memoized)
  const filteredProducts = useMemo(() => {
    return applyFilters(state.allProducts, state)
  }, [state.allProducts, state.priceRange, state.productTypes, state.brands, state.availability, state.minRating, state.showNewOnly, state.sortBy])

  // Context value (memoized)
  const contextValue = useMemo((): FilterContextType => ({
    filters: state,
    filteredProducts,
    allProducts: state.allProducts,
    isLoading: state.isLoading,
    updateFilter,
    clearFilters,
    resetFilter,
    setProducts,
    getFilterCounts,
  }), [state, filteredProducts, updateFilter, clearFilters, resetFilter, setProducts, getFilterCounts])

  return <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>
}

// Hook to use filter context
export function useFilter() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider")
  }
  return context
}

// Utility function to create URL with filters (for navigation)
export function createFilterUrl(baseUrl: string, filters: Partial<FilterState>): string {
  const params = new URLSearchParams()
  
  if (filters.priceRange && filters.priceRange[0] !== 0) params.set("minPrice", filters.priceRange[0].toString())
  if (filters.priceRange && filters.priceRange[1] !== 300000) params.set("maxPrice", filters.priceRange[1].toString())
  if (filters.productTypes && filters.productTypes.length > 0) params.set("productTypes", filters.productTypes.join(","))
  if (filters.brands && filters.brands.length > 0) params.set("brands", filters.brands.join(","))
  if (filters.availability && filters.availability.length > 0) params.set("availability", filters.availability.join(","))
  if (filters.minRating && filters.minRating > 0) params.set("minRating", filters.minRating.toString())
  if (filters.showNewOnly) params.set("showNewOnly", "true")
  if (filters.sortBy && filters.sortBy !== "featured") params.set("sortBy", filters.sortBy)
  if (filters.viewMode && filters.viewMode !== "grid") params.set("viewMode", filters.viewMode)
  
  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl
}
