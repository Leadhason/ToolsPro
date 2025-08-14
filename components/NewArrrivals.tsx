import Link from "next/link"
import ProductCard from "./ProductCard"
import type { Product } from "@/lib/data"

interface NewArrivalsSectionProps {
  products: Product[]
}

export default function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
  return (
    <section className="py-8 mx- sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg lg:text-xl font-medium">What's New: Fresh Stock & Hot Deals!</h2>
          <Link href="/fresh-stock" className="text-xs font-light underline">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-y-8 lg:gap-8">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
