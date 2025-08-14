"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { Product } from "@/lib/data"
import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"

interface ProductCardProps {
  product: Product
  showCompare?: boolean
}

export default function ProductCard({ product, showCompare = false }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(product.image)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const isProductInWishlist = isInWishlist(product.id)

  const handleMouseEnter = () => {
    if (product.hoverImage) {
      setCurrentImage(product.hoverImage)
    }
  }

  const handleMouseLeave = () => {
    setCurrentImage(product.image)
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
    })
  }

  const handleToggleWishlist = () => {
    if (isProductInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        rating: product.rating,
        reviewCount: product.reviewCount,
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 w-full">
      <div className="relative w-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {showCompare && (
          <div className="absolute top-2 left-2 z-10 flex items-center space-x-2 bg-white/80 px-2 py-1 rounded-md">
            <Checkbox id={`compare-${product.id}`} className="h-4 w-4" />
            <label htmlFor={`compare-${product.id}`} className="text-[10px] font-light cursor-pointer">
              Compare
            </label>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white rounded-full shadow-md hover:bg-gray-100"
          onClick={handleToggleWishlist}
        >
          <Heart className={`h-4 w-4 ${isProductInWishlist ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
        </Button>

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
          <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">{product.discount}% off</Badge>
        )}
        {product.isNew && <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">New arrival</Badge>}
      </div>

      <div className="p-3 sm:p-4 w-full">
        <div className="text-[10px] sm:text-xs text-gray-600 mb-1 font-light">{product.brand}</div>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-[10px] sm:text-xs mb-2 line-clamp-2 hover:text-red-600 leading-tight font-light">
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
          <span className="font-bold text-xs sm:text-sm lg:text-base font-medium">GH₵{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-[10px] sm:text-xs text-gray-500 line-through font-light">
              GH₵{product.originalPrice.toFixed(2)}
            </span>
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
            <Button variant="outline" className="w-full text-[10px] sm:text-xs font-light bg-transparent h-8 sm:h-9">
              Choose options
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full text-[10px] sm:text-xs font-light bg-transparent h-8 sm:h-9 hover:bg-emerald-800 hover:text-white"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
