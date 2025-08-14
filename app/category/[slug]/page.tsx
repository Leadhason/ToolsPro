"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/Header"
import { getProductsByCategory, getCategories } from "@/lib/data"
import CategoryHero from "@/components/CategoryHero"
import FilterSidebar from "@/components/FilterSidebar"
import TopControls from "@/components/TopControls"
import ProductGrid from "@/components/ProductGrid"
import Footer from "@/components/Footer"
import FeatureBar from "@/components/FeatureBar"
import { FilterProvider, useFilter } from "@/context/filter-context"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { Product, Category } from "@/lib/data"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

function CategoryPageContent({ category, allProducts }: { category: Category; allProducts: Product[] }) {
  const { filteredProducts, setProducts } = useFilter()
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  useEffect(() => {
    setProducts(allProducts)
  }, [allProducts, setProducts])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CategoryHero category={category} />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-xs font-light">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs font-medium">{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:w-1/4 sticky top-8 h-[calc(100vh-6rem)]">
            <FilterSidebar allProducts={allProducts} />
          </div>

          {/* Mobile Filter Sheet */}
          <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
            <SheetContent side="left" className="w-80 p-0">
              <div className="h-full overflow-y-auto">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-medium">Filters</h2>
                </div>
                <FilterSidebar allProducts={allProducts} />
              </div>
            </SheetContent>
          </Sheet>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            <TopControls
              onMobileFilterToggle={() => setIsMobileFilterOpen(true)}
              productCount={filteredProducts.length}
            />
            <ProductGrid products={filteredProducts} showCompare={true} />
          </div>
        </div>
      </div>
      <FeatureBar />
      <Footer />
    </div>
  )
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const [categories, products] = await Promise.all([getCategories(), getProductsByCategory(slug)])

  const category = categories.find((cat) => cat.slug === slug)

  if (!category) {
    notFound()
  }

  return (
    <FilterProvider>
      <CategoryPageContent category={category} allProducts={products} />
    </FilterProvider>
  )
}
