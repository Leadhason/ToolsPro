"use client"

import { useEffect, useState } from "react"
import type { Product } from "@/lib/data"
import ProductGrid from "@/components/ProductGrid"
import TopControls from "@/components/TopControls"
import FilterSidebar from "@/components/FilterSidebar"
import { useFilter } from "@/context/filter-context"

interface BrandPageContentProps {
  products: Product[]
  brandName: string
}

export default function BrandPageContent({ products, brandName }: BrandPageContentProps) {
  const { setProducts, filteredProducts } = useFilter()
  const [showFilters, setShowFilters] = useState(true)

  // Set products in filter context when component mounts
  useEffect(() => {
    setProducts(products)
  }, [products, setProducts])

  const handleFilterToggle = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-medium mb-2">{brandName} Products</h1>
        <p className="text-sm font-light">
          Discover our complete range of {brandName} tools and equipment
        </p>
        <p className="text-xs text-gray-500 mt-2">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} available
        </p>
      </div>

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
              <p className="text-sm font-light">No products found for this brand.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

