import { notFound } from "next/navigation"
import Header from "@/components/Header"
import ProductCard from "@/components/ProductCard"
import { getProductsByCategory, getCategories } from "@/lib/data"
import CategoryHero from "@/components/CategoryHero"
import FilterSidebar from "@/components/FilterSidebar"
import TopControls from "@/components/TopControls"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [categories, products] = await Promise.all([getCategories(), getProductsByCategory(params.slug)])

  const category = categories.find((cat) => cat.slug === params.slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CategoryHero category={category} />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4">
            <FilterSidebar />
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            <TopControls />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} showCompare={true} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
