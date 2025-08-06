import { notFound } from "next/navigation"
import Header from "@/components/Header"
import ProductCard from "@/components/ProductCard"
import { getProductsByCategory, getCategories } from "@/lib/data"

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

    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-600 text-sm sm:text-base">{category.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  </div>
)
}
