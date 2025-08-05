import { notFound } from "next/navigation"
import Header from "@/components/header"
import ProductCard from "@/components/product-card"
import { getProductsByBrand, getBrands } from "@/lib/data"

interface BrandPageProps {
  params: {
    name: string
  }
}

export default async function BrandPage({ params }: BrandPageProps) {
  const brandName = params.name.replace("-", " ")
  const [brands, products] = await Promise.all([getBrands(), getProductsByBrand(brandName)])

  const brand = brands.find((b) => b.name.toLowerCase() === brandName.toLowerCase())

  if (!brand) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{brand.name} Products</h1>
          <p className="text-gray-600">Discover our complete range of {brand.name} tools and equipment</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found for this brand.</p>
          </div>
        )}
      </div>
    </div>
  )
}
