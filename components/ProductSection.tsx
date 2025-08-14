import Link from "next/link"
import ProductCard from "./ProductCard"
import type { Product } from "@/lib/data"

interface ProductSectionProps {
  title: string
  products: Product[]
  viewAllLink?: string
  className?: string
}

export default function ProductSection({ title, products, viewAllLink, className }: ProductSectionProps) {
  return (
    <section className={`py-8 sm:py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4 sm:mb-5">
          <h2 className="text-base sm:text-lg lg:text-xl font-medium">{title}</h2>
          {viewAllLink && (
            <Link href={viewAllLink} className="text-xs font-light">
              View all
            </Link>
          )}
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-y-8 lg:gap-8">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
