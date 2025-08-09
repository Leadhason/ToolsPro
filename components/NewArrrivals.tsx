import Link from "next/link"
import ProductCard from "./ProductCard"
import type { Product } from "@/lib/data"

interface NewArrivalsSectionProps {
  products: Product[]
}

export default function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">What's New: Fresh Stock & Hot Deals!</h2>
          <Link href="/fresh-stock" className="text-black underline text-sm font-light">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5 sm:gap-4 lg:gap-8">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
