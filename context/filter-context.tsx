"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import type { Product } from "@/lib/data"

export interface FilterState {
  availability: string[]
  productTypes: string[]
  brands: string[]
  priceRange: [number, number]
  sortBy: string
  viewMode: "grid" | "list"
  searchQuery: string
}

interface FilterContextType {
  filters: FilterState
  filteredProducts: Product[]
  isLoading: boolean
  updateFilter: (key: keyof FilterState, value: any) => void
  clearFilters: () => void
  setProducts: (products: Product[]) => void
}

type FilterAction =
  | { type: "UPDATE_FILTER"; key: keyof FilterState; value: any }
  | { type: "CLEAR_FILTERS" }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_PRODUCTS"; products: Product[] }
  | { type: "INIT_FROM_URL"; params: URLSearchParams }

const initialState: FilterState = {
  availability: [],
  productTypes: [],
  brands: [],
  priceRange: [0, 300000],
  sortBy: "featured",
  viewMode: "grid",
  searchQuery: "",
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

function filterReducer(state: FilterState & { products: Product[]; isLoading: boolean }, action: FilterAction) {
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
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.loading,
      }
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.products,
        isLoading: false,
      }
    case "INIT_FROM_URL":
      const params = action.params
      return {
        ...state,
        availability: params.get("availability")?.split(",").filter(Boolean) || [],
        productTypes: params.get("productTypes")?.split(",").filter(Boolean) || [],
        brands: params.get("brands")?.split(",").filter(Boolean) || [],
        priceRange: [
          Number.parseInt(params.get("minPrice") || "0"),
          Number.parseInt(params.get("maxPrice") || "300000"),
        ] as [number, number],
        sortBy: params.get("sortBy") || "featured",
        viewMode: (params.get("viewMode") as "grid" | "list") || "grid",
        searchQuery: params.get("search") || "",
      }
    default:
      return state
  }
}

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
      filters.productTypes.some((type) => product.name.toLowerCase().includes(type.toLowerCase().replace("-", " "))),
    )
  }

  // Apply brand filter
  if (filters.brands.length > 0) {
    filtered = filtered.filter((product) =>
      filters.brands.some((brand) => product.brand.toLowerCase() === brand.toLowerCase()),
    )
  }

  // Apply price range filter
  filtered = filtered.filter(
    (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
  )

  // Apply search query
  if (filters.searchQuery) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchQuery.toLowerCase()),
    )
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
    case "featured":
    default:
      // Keep original order for featured
      break
  }

  return filtered
}

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [state, dispatch] = useReducer(filterReducer, {
    ...initialState,
    products: [],
    isLoading: false,
  })

  // Initialize from URL on mount
  useEffect(() => {
    dispatch({ type: "INIT_FROM_URL", params: searchParams })
  }, [searchParams])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()

    if (state.availability.length > 0) params.set("availability", state.availability.join(","))
    if (state.productTypes.length > 0) params.set("productTypes", state.productTypes.join(","))
    if (state.brands.length > 0) params.set("brands", state.brands.join(","))
    if (state.priceRange[0] !== 0) params.set("minPrice", state.priceRange[0].toString())
    if (state.priceRange[1] !== 300000) params.set("maxPrice", state.priceRange[1].toString())
    if (state.sortBy !== "featured") params.set("sortBy", state.sortBy)
    if (state.viewMode !== "grid") params.set("viewMode", state.viewMode)
    if (state.searchQuery) params.set("search", state.searchQuery)

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
    router.replace(newUrl, { scroll: false })
  }, [
    state.availability,
    state.productTypes,
    state.brands,
    state.priceRange,
    state.sortBy,
    state.viewMode,
    state.searchQuery,
    pathname,
    router,
  ])

  const updateFilter = (key: keyof FilterState, value: any) => {
    dispatch({ type: "SET_LOADING", loading: true })
    setTimeout(() => {
      dispatch({ type: "UPDATE_FILTER", key, value })
      dispatch({ type: "SET_LOADING", loading: false })
    }, 100) // Small delay to show loading state
  }

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" })
  }

  const setProducts = (products: Product[]) => {
    dispatch({ type: "SET_PRODUCTS", products })
  }

  const filteredProducts = applyFilters(state.products, state)

  return (
    <FilterContext.Provider
      value={{
        filters: state,
        filteredProducts,
        isLoading: state.isLoading,
        updateFilter,
        clearFilters,
        setProducts,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider")
  }
  return context
}
