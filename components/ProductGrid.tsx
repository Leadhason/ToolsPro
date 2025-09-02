"use client"

import ProductCard from "@/components/ProductCard"
import type { Product } from "@/lib/data"
import { useProductFilters } from "@/context/filter-context"; // Renamed import
import { useCompare } from "@/context/compare-context"; // Import useCompare hook

interface ProductGridProps {
  products?: Product[] // Made optional since we can use filtered products
  // No longer need showCompare here, it will be controlled by context
  // showCompare?: boolean
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { filteredProducts, filters } = useProductFilters()
  const { isCompareEnabled } = useCompare(); // Get isCompareEnabled from context
  
  // Use filtered products from context if available, otherwise use props
  const displayProducts = products || filteredProducts
  
  if (displayProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
            />
          </svg>
        </div>
        <p className="text-gray-500 text-sm font-light">No products found matching your filters.</p>
        <p className="text-gray-400 text-xs font-light mt-1">Try adjusting your search criteria.</p>
      </div>
    )
  }

  const gridClasses = filters.viewMode === "list" 
    ? "space-y-4 mt-6"
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"

  return (
    <div className={gridClasses}>
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} showCompare={isCompareEnabled} viewMode={filters.viewMode} />
      ))}
    </div>
  )
}
