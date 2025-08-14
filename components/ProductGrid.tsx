"use client"

import ProductCard from "@/components/ProductCard"
import type { Product } from "@/lib/data"
import { useFilter } from "@/context/filter-context"

interface ProductGridProps {
  products: Product[]
  showCompare?: boolean
}

export default function ProductGrid({ products, showCompare = true }: ProductGridProps) {
  const { filters, isLoading } = useFilter()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
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

  const gridClasses =
    filters.viewMode === "list"
      ? "grid grid-cols-1 gap-4 mt-6"
      : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6"

  return (
    <div className={gridClasses}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} showCompare={showCompare} viewMode={filters.viewMode} />
      ))}
    </div>
  )
}
