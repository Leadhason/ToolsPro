"use client"
import ProductCard from "./ProductCard"
import type { Product } from "@/lib/data"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

interface SimilarProductsCarouselProps {
  products: Product[]
}

export default function SimilarProductsCarousel({ products }: SimilarProductsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth / 2 // Scroll half the width
      if (direction === "left") {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Compare with similar items</h2>
        </div>

        <div className="relative">
          <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4">
            {products.map((product) => (
              <div key={product.id} className="flex-none w-[200px] sm:w-[220px] lg:w-[240px]">
                <ProductCard product={product} showCompare={true} />
              </div>
            ))}
          </div>
          {products.length > 4 && ( // Show arrows only if there are more than 4 products
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md z-10"
                onClick={() => scroll("left")}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md z-10"
                onClick={() => scroll("right")}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
