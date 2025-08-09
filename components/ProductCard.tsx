"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { Product } from "@/lib/data"
import { useState } from "react"

interface ProductCardProps {
  product: Product
  showCompare?: boolean
}

export default function ProductCard({ product, showCompare = false }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(product.image)

  const handleMouseEnter = () => {
    if (product.hoverImage) {
      setCurrentImage(product.hoverImage)
    }
  }

  const handleMouseLeave = () => {
    setCurrentImage(product.image)
  }

  return (
    <div className="flex flex-col items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 w-full">
      <div className="relative w-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {showCompare && (
          <div className="absolute top-2 left-2 z-10 flex items-center space-x-2 bg-white/80 px-2 py-1 rounded-md">
            <Checkbox id={`compare-${product.id}`} className="h-4 w-4" />
            <label
              htmlFor={`compare-${product.id}`}
              className="text-gray-800 text-xs font-medium leading-none cursor-pointer"
            >
              Compare
            </label>
          </div>
        )}
        <Link href={`/product/${product.id}`}>
          <Image
            src={currentImage || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-36 sm:h-40 lg:h-48 object-cover rounded-t-xl border-b border-gray-200"
          />
        </Link>
        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">{product.discount}% off</Badge>
        )}
        {product.isNew && <Badge className="absolute top-2 right-2 bg-green-500 text-white text-xs">New arrival</Badge>}
      </div>

      <div className="p-3 sm:p-4 w-full">
        <div className="text-xs sm:text-sm text-gray-600 mb-1">{product.brand}</div>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-xs sm:text-sm mb-2 line-clamp-2 hover:text-red-600 leading-tight">
            {product.name}
          </h3>
        </Link>

        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            {product.reviewCount && <span className="text-xs text-gray-500">({product.reviewCount})</span>}
          </div>
        )}

        <div className="flex flex-col gap-0.5 mb-3">
          <span className="font-bold text-sm sm:text-base lg:text-lg">GH₵{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">GH₵{product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {product.colors && (
          <div className="flex gap-1 mb-3">
            {product.colors.map((color) => (
              <div
                key={color}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-gray-300 ${
                  color === "yellow"
                    ? "bg-yellow-400"
                    : color === "blue"
                      ? "bg-blue-500"
                      : color === "white"
                        ? "bg-white"
                        : color === "red"
                          ? "bg-red-500"
                          : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}

        <div className="space-y-2">
          {product.colors ? (
            <Button variant="outline" className="w-full text-xs sm:text-sm bg-transparent h-8 sm:h-9">
              Choose options
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full text-xs sm:text-sm h-8 sm:h-9 hover:bg-emerald-800 hover:text-white bg-transparent"
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
