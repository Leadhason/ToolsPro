"use client"

import { useFilter } from "@/context/filter-context"
import Header from "@/components/Header"
import ProductCard from "@/components/ProductCard"
import CategoryHero from "@/components/CategoryHero"
import FilterSidebar from "@/components/FilterSidebar"
import TopControls from "@/components/TopControls"
import Footer from "@/components/Footer"
import FeatureBar from "@/components/FeatureBar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useState, useEffect, useRef } from "react"
import type { Category, Product } from "@/lib/data"

interface CategoryPageContentProps {
  category: Category
  products: Product[]
}

export default function CategoryPageContent({ category, products }: CategoryPageContentProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const { filteredProducts, setProducts } = useFilter()
  const productsSetRef = useRef(false)

  // Set products in the filter context when component mounts, but only once
  useEffect(() => {
    if (!productsSetRef.current && products.length > 0) {
      setProducts(products)
      productsSetRef.current = true
    }
  }, [products, setProducts])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CategoryHero category={category} />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className={`lg:w-1/4 lg:block ${mobileFilterOpen ? "block" : "hidden"}`}>
            <FilterSidebar allProducts={products} />
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            <TopControls
              onMobileFilterToggle={() => setMobileFilterOpen(!mobileFilterOpen)}
              productCount={filteredProducts.length}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} showCompare={true} />
              ))}
            </div>

            {filteredProducts.length === 0 && products.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your filters.</p>
              </div>
            )}

            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <FeatureBar />
      <Footer />
    </div>
  )
}
