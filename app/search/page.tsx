
"use client"

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/FilterSidebar";
import TopControls from "@/components/TopControls";
import ProductGrid from "@/components/ProductGrid";
import { useFilter } from "@/context/filter-context";
import { Product, Category } from "@/lib/data"; // Import interfaces
import { toast } from "sonner";
import { Button } from "@/components/ui/button"; // Import Button component

export default function SearchResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, updateFilter, setAllData } = useFilter();
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Effect to initialize filters from URL on mount
  useEffect(() => {
    const initialSearchQuery = searchParams.get("search") || "";
    const initialCategorySlug = searchParams.get("categorySlug") || "all-products";
    const initialBrands = searchParams.getAll("brand") || [];
    const initialTags = searchParams.getAll("tags") || [];
    const initialMinPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
    const initialMaxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;
    const initialSortBy = searchParams.get("sortBy") || "featured";

    updateFilter("searchQuery", initialSearchQuery);
    updateFilter("currentCategorySlug", initialCategorySlug);
    updateFilter("selectedBrands", initialBrands);
    updateFilter("activeTags", initialTags);
    updateFilter("priceRange", [
      initialMinPrice !== undefined ? initialMinPrice : 0,
      initialMaxPrice !== undefined ? initialMaxPrice : Number.MAX_SAFE_INTEGER,
    ]);
    updateFilter("sortBy", initialSortBy);

    // Trigger actual fetch after filters are initialized
    // The fetch will be handled by the fetchProducts effect below
  }, [searchParams, updateFilter]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.searchQuery) params.set("searchQuery", filters.searchQuery);
      if (filters.currentCategorySlug) params.set("categorySlug", filters.currentCategorySlug);
      filters.selectedBrands.forEach(brand => params.append("brand", brand));
      filters.activeTags.forEach(tag => params.append("tags", tag));
      if (filters.priceRange && filters.priceRange.length === 2) {
        params.set("minPrice", filters.priceRange[0]?.toString() || "");
        params.set("maxPrice", filters.priceRange[1]?.toString() || "");
      }
      params.set("sortBy", filters.sortBy);

      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: Product[] = await response.json();

      setSearchResults(data);
      setAllData(data, []); // Update the filter context with fetched data and empty categories for now

    } catch (error) {
      console.error("Error fetching search results:", error);
      toast.error("Failed to load search results.");
      setSearchResults([]);
      setAllData([], []);
    } finally {
      setLoading(false);
    }
  }, [filters, setAllData]);

  useEffect(() => {
    fetchProducts();
  }, [filters, fetchProducts]); // Re-fetch whenever filters change

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-8 text-center">
          Loading search results...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Search Results</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar for Filters */}
          <div className="lg:col-span-1">
            <FilterSidebar />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <TopControls />
            <div className="mt-6">
              {searchResults.length > 0 ? (
                <ProductGrid products={searchResults} />
              ) : (
                <div className="text-center py-10">
                  <p className="text-lg text-gray-600">No products found matching your search and filters.</p>
                  <Button onClick={() => router.push("/category/all-products")} className="mt-4">Browse All Products</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
