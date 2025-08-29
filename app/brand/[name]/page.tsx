import { notFound } from "next/navigation"
import Header from "@/components/Header"
import { getProductsByBrand, getBrands } from "@/lib/data"
import BrandPageContent from "@/components/BrandPageContent"

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
        <BrandPageContent products={products} brandName={brand.name} />
      </div>
    </div>
  )
}
