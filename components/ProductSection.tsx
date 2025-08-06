import Link from "next/link"
import ProductCard from "./ProductCard"
import type { Product } from "@/lib/data"

interface ProductSectionProps {
  title: string
  products: Product[]
  viewAllLink?: string
}

export default function ProductSection({ title, products, viewAllLink }: ProductSectionProps) {
  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">{title}</h2>
          {viewAllLink && (
            <Link href={viewAllLink} className="text-blue-600 hover:underline text-sm sm:text-base">
              View all
            </Link>
          )}
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
