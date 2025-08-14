"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
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
  viewMode?: "grid" | "list"
}

export default function ProductCard({ product, showCompare = false, viewMode = "grid" }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (viewMode === "list") {
    return (
      <Link href={`/product/${product.id}`}>
        <div className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
          <div className="relative w-32 h-32 flex-shrink-0">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-md"
              onLoad={() => setImageLoaded(true)}
            />
            {product.isNew && (
              <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs font-light px-2 py-1">New</Badge>
            )}
            {product.discount && (
              <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs font-light px-2 py-1">
                -{product.discount}%
              </Badge>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-xs font-light text-gray-600 mb-3 line-clamp-2">{product.description}</p>

            <div className="flex items-center gap-2 mb-3">
              {product.rating && (
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(product.rating!) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-light text-gray-500">({product.reviewCount || 0})</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm font-light text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className="h-8 w-8 hover:bg-gray-100"
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                </Button>
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-light px-3 py-1"
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="flex flex-col items-center justify-between bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 w-full">
      <div className="relative w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
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
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
        </Button>

        <Link href={`/product/${product.id}`}>
          <Image
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-36 sm:h-40 lg:h-48 object-cover rounded-t-xl border-b border-gray-200 transition-all duration-300"
            onLoad={() => setImageLoaded(true)}
          />
        </Link>
        {product.discount && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">-{product.discount}%</Badge>
        )}
        {product.isNew && <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">New</Badge>}
      </div>

      <div className="p-3 sm:p-4 w-full">
        <div className="text-[10px] sm:text-xs text-gray-600 mb-1 font-light">{product.brand}</div>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-[10px] sm:text-xs mb-2 line-clamp-2 hover:text-red-600 leading-tight font-light group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating!) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {product.reviewCount && <span className="text-xs text-gray-500">({product.reviewCount})</span>}
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-xs sm:text-sm lg:text-base font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[10px] sm:text-xs text-gray-500 line-through font-light">
              {formatPrice(product.originalPrice)}
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

        {/* Stock Status */}
        <div className="mt-2">
          <span className={`text-xs font-light ${product.inStock ? "text-green-600" : "text-red-600"}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
    </div>
  )
}
