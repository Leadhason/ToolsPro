"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Product, Category, getProducts, getCategories } from "@/lib/data" // Removed 'type' for getProducts and getCategories

// Filter state interface
export interface FilterState {
  // Search
  searchQuery: string;

  // Price filtering
  priceRange: [number, number];

  // Category filtering (replaces productTypes)
  activeCategoryIds: string[];
  currentCategorySlug: string | null; // The slug from the URL

  // Tag filtering (replaces showNewOnly)
  activeTags: string[]; // E.g., ["new-arrival", "best-seller", "discount"]
  
  // Brand filtering
  selectedBrands: string[]; // Renamed from 'brands'
  
  // Availability filtering
  availability: string[]; // ["in-stock", "out-of-stock"]
  
  // Rating filtering
  minRating: number;
  
  // Sorting
  sortBy: string; // "featured" | "price-low-high" | "price-high-low" | "newest" | "rating" | "alphabetical"
  
  // View mode
  viewMode: "grid" | "list";

}

// Product Filter context type
interface FilterContextType {
  // Current filter state
  filters: FilterState;
  
  // Filtered products
  filteredProducts: Product[];

  // All products and categories (source data)
  allProducts: Product[];
  allCategories: Category[];
  availableBrands: string[];
  minPriceOverall: number;
  maxPriceOverall: number;

  
  // Loading state
  isLoading: boolean;
  
  // Actions
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  clearFilters: () => void;
  resetFilter: <K extends keyof FilterState>(key: K) => void;
  setProducts: (products: Product[]) => void;
  // New action to set all initial data (products and categories)
  setAllData: (products: Product[], categories: Category[]) => void;
  
  // Filter counts (for UI display)
  getFilterCounts: () => {
    availability: { [key: string]: number };
    brands: { [key: string]: number };
    // We'll remove productTypes count as it's dynamic now
    totalProducts: number;
  };
  getDescendantCategoryIds: (categoryId: string, allCategories: Category[]) => string[]; // Expose helper
}

// Filter actions
type FilterAction =
  | { type: "UPDATE_FILTER"; key: keyof FilterState; value: any }
  | { type: "CLEAR_FILTERS" }
  | { type: "RESET_FILTER"; key: keyof FilterState }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_PRODUCTS"; products: Product[] }
  | { type: "SET_ALL_DATA"; products: Product[]; categories: Category[] } // New action
  | { type: "INIT_FROM_URL"; params: URLSearchParams; allCategories: Category[] }; // Pass allCategories for hierarchical logic

// Initial filter state
const initialState: FilterState = {
  searchQuery: "",
  priceRange: [0, 300000], // Default max price, will be updated dynamically
  activeCategoryIds: [],
  currentCategorySlug: null,
  activeTags: [],
  selectedBrands: [], // Renamed from 'brands'
  availability: [],
  minRating: 0,
  sortBy: "featured",
  viewMode: "grid",
};

// Extended state for reducer (includes products, categories, loading)
interface ExtendedFilterState extends FilterState {
  allProducts: Product[];
  allCategories: Category[];
  availableBrands: string[];
  minPriceOverall: number;
  maxPriceOverall: number;
  isLoading: boolean;
}

// Initial extended state to ensure all numeric properties are defined.
const initialExtendedState: ExtendedFilterState = {
  ...initialState,
  allProducts: [],
  allCategories: [],
  availableBrands: [],
  minPriceOverall: initialState.priceRange[0], // Initialize with default min price
  maxPriceOverall: initialState.priceRange[1], // Initialize with default max price
  isLoading: false,
};

// Helper function to get all descendant category IDs
const getDescendantCategoryIds = (categoryId: string, allCategories: Category[]): string[] => {
  const descendants: string[] = [categoryId];
  let children = allCategories.filter((cat) => cat.parentId === categoryId);

  while (children.length > 0) {
    const newChildren: Category[] = [];
    children.forEach((child) => {
      descendants.push(child.id);
      newChildren.push(...allCategories.filter((cat) => cat.parentId === child.id));
    });
    children = newChildren;
  }
  return descendants;
};

// Filter reducer
function filterReducer(state: ExtendedFilterState, action: FilterAction): ExtendedFilterState {
  switch (action.type) {
    case "UPDATE_FILTER":
      return {
        ...state,
        [action.key]: action.value,
      };
    
    case "CLEAR_FILTERS":
      return {
        ...initialExtendedState, // Use initialExtendedState to reset all extended properties
        allProducts: state.allProducts, // Preserve loaded products
        allCategories: state.allCategories, // Preserve loaded categories
        // The rest will reset to initialExtendedState defaults
        // minPriceOverall and maxPriceOverall from initialExtendedState will be used here.
      };
    
    case "RESET_FILTER":
      // For individual filter reset, use initialExtendedState for the specific key
      return {
        ...state,
        [action.key]: initialExtendedState[action.key],
      };
    
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.loading,
      };
    
    case "SET_PRODUCTS": // This action might not be heavily used after initial data load
      return {
        ...state,
        allProducts: action.products,
        isLoading: false,
      };

    case "SET_ALL_DATA":
      const allProducts = action.products;
      const allCategories = action.categories;
      const availableBrands = allProducts.map((p) => p.brand).filter((v, i, a) => a.indexOf(v) === i);
      const minPriceOverall = allProducts.length > 0 ? Math.min(...allProducts.map((p) => p.price)) : initialExtendedState.minPriceOverall;
      const maxPriceOverall = allProducts.length > 0 ? Math.max(...allProducts.map((p) => p.price)) : initialExtendedState.maxPriceOverall;

      return {
        ...state,
        allProducts: allProducts,
        allCategories: allCategories,
        availableBrands: availableBrands,
        minPriceOverall: minPriceOverall,
        maxPriceOverall: maxPriceOverall,
        // Set initial price range to overall min/max derived from data
        priceRange: [minPriceOverall, maxPriceOverall],
        isLoading: false,
      };
    
    case "INIT_FROM_URL":
      const params = action.params;
      const categoriesFromUrl = action.allCategories; // Use categories passed from action

      let initialActiveCategoryIds: string[] = [];
      const categorySlugFromUrl = params.get("categorySlug");
      if (categorySlugFromUrl && categoriesFromUrl.length > 0) {
        const category = categoriesFromUrl.find((cat) => cat.slug === categorySlugFromUrl);
        if (category) {
          initialActiveCategoryIds = getDescendantCategoryIds(category.id, categoriesFromUrl);
        }
      }

      return {
        ...state,
        // Parse URL parameters, using robust defaults if not set or if overall min/max are not yet available
        searchQuery: params.get("search") || initialExtendedState.searchQuery,
        priceRange: [
          Number.parseInt(params.get("minPrice") || state.minPriceOverall.toString()),
          Number.parseInt(params.get("maxPrice") || state.maxPriceOverall.toString()),
        ] as [number, number],
        activeCategoryIds: initialActiveCategoryIds.length > 0 ? initialActiveCategoryIds : initialExtendedState.activeCategoryIds,
        currentCategorySlug: categorySlugFromUrl || initialExtendedState.currentCategorySlug,
        activeTags: params.get("tags")?.split(",").filter(Boolean) || initialExtendedState.activeTags,
        selectedBrands: params.get("brands")?.split(",").filter(Boolean) || initialExtendedState.selectedBrands,
        availability: params.get("availability")?.split(",").filter(Boolean) || initialExtendedState.availability,
        minRating: Number.parseInt(params.get("minRating") || initialExtendedState.minRating.toString()),
        sortBy: params.get("sortBy") || initialExtendedState.sortBy,
        viewMode: (params.get("viewMode") as "grid" | "list") || initialExtendedState.viewMode,
      };
    
    default:
      return state;
  }
}

// Filter logic function
function applyFilters(products: Product[], filters: FilterState, allCategories: Category[]): Product[] {
  let filtered = [...products];

  // 1. Apply search query
  if (filters.searchQuery) {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }

  // 2. Apply hierarchical category filter
  if (filters.activeCategoryIds.length > 0) {
    filtered = filtered.filter((product) =>
      filters.activeCategoryIds.includes(product.categoryId)
    );
  }

  // 3. Apply tag filter
  if (filters.activeTags.length > 0) {
    filtered = filtered.filter((product) =>
      filters.activeTags.some((tag) => product.tags.includes(tag)) // Product must have at least one of the active tags
    );
  }

  // 4. Apply availability filter
  if (filters.availability.length > 0) {
    filtered = filtered.filter((product) => {
      if (filters.availability.includes("in-stock")) return product.inStock;
      if (filters.availability.includes("out-of-stock")) return !product.inStock;
      return true;
    });
  }

  // 5. Apply brand filter
  if (filters.selectedBrands.length > 0) {
    filtered = filtered.filter((product) =>
      filters.selectedBrands.some((brand) => product.brand.toLowerCase() === brand.toLowerCase())
    );
  }

  // 6. Apply price range filter
  filtered = filtered.filter(
    (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
  );

  // 7. Apply rating filter
  if (filters.minRating > 0) {
    filtered = filtered.filter((product) => (product.rating || 0) >= filters.minRating);
  }

  // 8. Apply sorting
  switch (filters.sortBy) {
    case "price-low-high":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high-low":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      filtered.sort((a, b) => {
        const aIsNew = a.tags.includes("new-arrival");
        const bIsNew = b.tags.includes("new-arrival");
        if (aIsNew && !bIsNew) return -1; // a is new, b is not: a comes first
        if (!aIsNew && bIsNew) return 1;  // b is new, a is not: b comes first
        return a.name.localeCompare(b.name); // If both/neither are new, sort alphabetically
      });
      break;
    case "rating":
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "alphabetical":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "featured":
    default:
      // Keep original order for featured
      break;
  }

  return filtered;
}

// Create context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Product Filter provider component
export function FilterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize reducer with initialExtendedState
  const [state, dispatch] = useReducer(filterReducer, initialExtendedState);

  // Fetch all products and categories once on mount and set initial data
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "SET_LOADING", loading: true });
      const productsData = await getProducts();
      const categoriesData = await getCategories();
      dispatch({ type: "SET_ALL_DATA", products: productsData, categories: categoriesData });
    };
    fetchData();
  }, []); // Empty dependency array - only run once on mount

  // Initialize from URL parameters whenever searchParams or allCategories change
  useEffect(() => {
    if (state.allCategories.length > 0) {
      dispatch({ type: "INIT_FROM_URL", params: searchParams, allCategories: state.allCategories });
    }
  }, [searchParams, state.allCategories]);

    // Update URL when filters change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();

      // Add filter parameters to URL
      if (state.searchQuery) params.set("search", state.searchQuery);
      // Ensure we use the actual minPriceOverall and maxPriceOverall from state for comparison
      if (state.priceRange[0] !== state.minPriceOverall) params.set("minPrice", state.priceRange[0].toString());
      if (state.priceRange[1] !== state.maxPriceOverall) params.set("maxPrice", state.priceRange[1].toString());
      // We will derive activeCategoryIds from currentCategorySlug in INIT_FROM_URL
      if (state.currentCategorySlug) params.set("categorySlug", state.currentCategorySlug);
      if (state.activeTags.length > 0) params.set("tags", state.activeTags.join(","));
      if (state.selectedBrands.length > 0) params.set("brands", state.selectedBrands.join(","));
      if (state.availability.length > 0) params.set("availability", state.availability.join(","));
      if (state.minRating > 0) params.set("minRating", state.minRating.toString());
      if (state.sortBy !== "featured") params.set("sortBy", state.sortBy);
      if (state.viewMode !== "grid") params.set("viewMode", state.viewMode);

      // Determine the base URL: if currentCategorySlug is set, use /category/[slug]
      const baseUrl = state.currentCategorySlug ? `/category/${state.currentCategorySlug}` : pathname;
      const newUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
      router.replace(newUrl, { scroll: false });
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [
    state.searchQuery,
    state.priceRange[0],
    state.priceRange[1],
    state.currentCategorySlug,
    state.activeTags.join(","),
    state.selectedBrands.join(","),
    state.availability.join(","),
    state.minRating,
    state.sortBy,
    state.viewMode,
    pathname,
    router,
    state.minPriceOverall, // Include in dependency array
    state.maxPriceOverall, // Include in dependency array
  ]);

  // Action functions (memoized)
  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    dispatch({ type: "SET_LOADING", loading: true });
    dispatch({ type: "UPDATE_FILTER", key, value });
    // Loading will be set to false after a short delay to show visual feedback
    setTimeout(() => {
      dispatch({ type: "SET_LOADING", loading: false });
    }, 100);
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: "CLEAR_FILTERS" });
    // Also reset URL parameters on clear
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const resetFilter = useCallback(<K extends keyof FilterState>(key: K) => {
    dispatch({ type: "RESET_FILTER", key });
  }, []);

  const setProducts = useCallback((products: Product[]) => {
    dispatch({ type: "SET_PRODUCTS", products });
  }, []);

  // New action to set all initial data (products and categories)
  const setAllData = useCallback((products: Product[], categories: Category[]) => {
    dispatch({ type: "SET_ALL_DATA", products, categories });
  }, []);

  // Calculate filter counts for UI display (memoized)
  const getFilterCounts = useCallback(() => {
    const { allProducts, allCategories, activeCategoryIds } = state; // Corrected access: filters.activeCategoryIds to activeCategoryIds

    // Apply current category filter to get base products for counts
    let productsForCounts = [...allProducts];
    if (activeCategoryIds.length > 0) {
      productsForCounts = productsForCounts.filter((product) =>
        activeCategoryIds.includes(product.categoryId)
      );
    }
    
    return {
      availability: {
        "in-stock": productsForCounts.filter(p => p.inStock).length,
        "out-of-stock": productsForCounts.filter(p => !p.inStock).length,
      },
      brands: productsForCounts.reduce((acc, product) => {
        const brand = product.brand.toLowerCase();
        acc[brand] = (acc[brand] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number }),
      totalProducts: productsForCounts.length,
    };
  }, [state.allProducts, state.allCategories, state.activeCategoryIds]); // Depend on activeCategoryIds

    // Apply filters to get filtered products (memoized)
  const filteredProducts = useMemo(() => {
    return applyFilters(state.allProducts, state, state.allCategories);
  }, [state.allProducts, state.allCategories, state.searchQuery, state.priceRange, state.activeCategoryIds, state.currentCategorySlug, state.activeTags, state.selectedBrands, state.availability, state.minRating, state.sortBy]);

  // Context value (memoized)
  const contextValue = useMemo((): FilterContextType => ({
    filters: state,
    filteredProducts,
    allProducts: state.allProducts,
    allCategories: state.allCategories,
    availableBrands: state.availableBrands,
    minPriceOverall: state.minPriceOverall,
    maxPriceOverall: state.maxPriceOverall,
    isLoading: state.isLoading,
    updateFilter,
    clearFilters,
    resetFilter,
    setProducts,
    setAllData,
    getFilterCounts,
    getDescendantCategoryIds, // Expose helper
  }), [state, filteredProducts, updateFilter, clearFilters, resetFilter, setProducts, setAllData, getFilterCounts]);

  return <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>;
}

// Hook to use filter context
export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}

// Utility function to create URL with filters (for navigation)
export function createFilterUrl(baseUrl: string, filters: Partial<FilterState>): string {
  const params = new URLSearchParams();

  if (filters.searchQuery) params.set("search", filters.searchQuery);
  if (filters.priceRange && filters.priceRange[0] !== 0) params.set("minPrice", filters.priceRange[0].toString());
  if (filters.priceRange && filters.priceRange[1] !== 300000) params.set("maxPrice", filters.priceRange[1].toString());
  // activeCategoryIds will be derived from categorySlug on page load, so we only set categorySlug here
  if (filters.currentCategorySlug) params.set("categorySlug", filters.currentCategorySlug);
  if (filters.activeTags && filters.activeTags.length > 0) params.set("tags", filters.activeTags.join(","));
  if (filters.selectedBrands && filters.selectedBrands.length > 0) params.set("brands", filters.selectedBrands.join(","));
  if (filters.availability && filters.availability.length > 0) params.set("availability", filters.availability.join(","));
  if (filters.minRating && filters.minRating > 0) params.set("minRating", filters.minRating.toString());
  if (filters.sortBy && filters.sortBy !== "featured") params.set("sortBy", filters.sortBy);
  if (filters.viewMode && filters.viewMode !== "grid") params.set("viewMode", filters.viewMode);

  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
}
