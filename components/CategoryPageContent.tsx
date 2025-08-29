"use client"

import { useEffect, useState } from "react"
import type { Product } from "@/lib/data"
import TopControls from "@/components/TopControls"
import ProductGrid from "@/components/ProductGrid"
import FilterSidebar from "@/components/FilterSidebar"
import { useFilter } from "@/context/filter-context"

interface CategoryPageContentProps {
  products: Product[]
}

export default function CategoryPageContent({ products }: CategoryPageContentProps) {
  const { setProducts, filteredProducts } = useFilter()
  const [showFilters, setShowFilters] = useState(true)

  // Set products in filter context when component mounts or products change
  useEffect(() => {
    setProducts(products)
  }, [products, setProducts])

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
        <ProductGrid showCompare={true} />

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

