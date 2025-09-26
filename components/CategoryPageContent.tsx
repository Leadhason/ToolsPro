"use client"

import { useEffect, useState } from "react"
import type { Product, Category } from "@/lib/data"; // Added Category import
import TopControls from "@/components/TopControls"
import ProductGrid from "@/components/ProductGrid"
import FilterSidebar from "@/components/FilterSidebar"
import { useFilter } from "@/context/filter-context";
import { useSearchParams } from "next/navigation"; // Import useSearchParams

interface CategoryPageContentProps {
  products: Product[]
}

export default function CategoryPageContent({ products }: CategoryPageContentProps) {
  const searchParams = useSearchParams();
  const {
    setAllData,
    updateFilter,
    filters,
    allCategories,
    minPriceOverall,
    maxPriceOverall,
    filteredProducts, // Destructure filteredProducts
  } = useFilter();
  const [showFilters, setShowFilters] = useState(true)

  // Set all initial data (products and categories) in filter context once
  useEffect(() => {
    if (products.length > 0 && allCategories.length === 0) { // Only set if categories are not yet loaded
      setAllData(products, allCategories); // Pass categories from context initial load
    }
  }, [products, setAllData, allCategories]);

  // Initialize filters from URL parameters when component mounts or searchParams/allCategories change
  useEffect(() => {
    if (allCategories.length === 0) return; // Wait for allCategories to be loaded

    // Derive currentCategorySlug from the products prop
    const initialCategorySlug = products.length > 0 
      ? allCategories.find(cat => cat.id === products[0].categoryId)?.slug || "all-products"
      : "all-products";

    // Set currentCategorySlug first to ensure hierarchical filtering in context
    updateFilter("currentCategorySlug", searchParams.get("categorySlug") || initialCategorySlug);

    // Initialize other filters from URL parameters
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      updateFilter("searchQuery", searchQuery);
    }

    const tags = searchParams.get("tags");
    if (tags) {
      updateFilter("activeTags", tags.split(",").filter(Boolean));
    }

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      updateFilter("priceRange", [
        Number.parseInt(minPrice || minPriceOverall.toString()),
        Number.parseInt(maxPrice || maxPriceOverall.toString()),
      ]);
    }

    const brands = searchParams.get("brands");
    if (brands) {
      updateFilter("selectedBrands", brands.split(",").filter(Boolean));
    }

    const availability = searchParams.get("availability");
    if (availability) {
      updateFilter("availability", availability.split(",").filter(Boolean));
    }

    const minRating = searchParams.get("minRating");
    if (minRating) {
      updateFilter("minRating", Number.parseInt(minRating));
    }

    const sortBy = searchParams.get("sortBy");
    if (sortBy) {
      updateFilter("sortBy", sortBy);
    }

    const viewMode = searchParams.get("viewMode");
    if (viewMode === "grid" || viewMode === "list") {
      updateFilter("viewMode", viewMode);
    }

  }, [products, searchParams, allCategories, updateFilter, setAllData, minPriceOverall, maxPriceOverall]);

  const handleFilterToggle = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filter Sidebar - Toggleable */}
      {showFilters && (
        <div className="lg:w-1/4 sticky top-8 h-[calc(100vh-6rem)]">
          <FilterSidebar />
        </div>
      )}
      
      {/* Main Content Area */}
      <div className={showFilters ? "lg:w-3/4" : "w-full"}>
        <TopControls onFilterToggle={handleFilterToggle} showFilters={showFilters} />
        <ProductGrid products={filteredProducts} /> {/* Removed showCompare and viewMode props */}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your filters.</p>
            <p className="text-gray-400 text-xs font-light mt-1">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

