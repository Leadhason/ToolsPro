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
import { toast } from "sonner"; // Import toast from sonner
import { getPublicImageUrl } from "@/lib/supabase/image-utils"; // Import getPublicImageUrl

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
    addToCart({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      hoverImage: product.hoverImage, // Pass hoverImage if available
    });
    toast.success(`${product.name} added to cart!`);
  }

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isWishlisted) {
      await removeFromWishlist(product.id)
      toast.info(`${product.name} removed from wishlist.`);
    } else {
      await addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        rating: product.rating,
        reviewCount: product.reviewCount,
        hoverImage: product.hoverImage,
      })
      toast.success(`${product.name} added to wishlist!`);
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
      <div className="flex items-center gap-6 p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200">
        {/* Product Image */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <Link href={`/product/${product.id}`}>
            <Image
              src={getPublicImageUrl(product.image, "Product_Images")}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              onLoad={() => setImageLoaded(true)}
            />
          </Link>
          {/* Badges Container */}
          {(product.tags.includes("new-arrival") || (product.discount && product.tags.includes("discount"))) && (
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
              {product.tags.includes("new-arrival") && (
                <Badge className="bg-green-500 text-white text-xs font-medium px-2 py-1">
              New
            </Badge>
          )}
              {product.discount && product.tags.includes("discount") && (
                <Badge className="bg-red-500 text-white text-xs font-medium px-2 py-1">
              -{product.discount}%
            </Badge>
              )}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-medium text-gray-900 mb-1 hover:text-blue-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center gap-4 mb-2">
            <span className="text-lg font-medium text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm font-light text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {product.rating && (
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating!) ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-light text-gray-500">({product.reviewCount || 0} reviews)</span>
            </div>
          )}

          <p className="text-sm font-medium text-gray-600 line-clamp-2 mb-2">
            {product.description}
          </p>

          <div className="flex items-center gap-4">
            <span className={`text-xs font-light ${product.inStock ? "text-green-600" : "text-red-600"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            {product.colors && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-light text-gray-500">Colors:</span>
                <div className="flex gap-1">
                  {product.colors.slice(0, 3).map((color) => (
                    <div
                      key={color}
                      className={`w-4 h-4 rounded-full border-2 border-gray-300 ${
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
                  {product.colors.length > 3 && (
                    <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 3}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 items-center">
          <Button
            onClick={handleAddToCart}
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full text-xs font-light"
            disabled={!product.inStock}
          >
            Add to cart
          </Button>
          
          <Button
            onClick={handleWishlistToggle}
            variant="outline"
            className="border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-full text-xs font-light"
          >
            View details
          </Button>
        </div>
      </div>
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
            src={isHovered && product.hoverImage ? getPublicImageUrl(product.hoverImage, "Product_Images") : getPublicImageUrl(product.image, "Product_Images")}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-36 sm:h-40 lg:h-48 object-cover rounded-t-xl border-b border-gray-200 transition-all duration-300"
            onLoad={() => setImageLoaded(true)}
          />
        </Link>
        {/* Badges Container */}
        {(product.tags.includes("new-arrival") || (product.discount && product.tags.includes("discount"))) && (
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {product.discount && product.tags.includes("discount") && (
              <Badge className="bg-red-500 text-white text-xs">-{product.discount}%</Badge>
            )}
            {product.tags.includes("new-arrival") && <Badge className="bg-green-500 text-white text-xs">New</Badge>}
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 w-full">
        <div className="text-sm font-light text-gray-600 mb-1">{product.brand}</div>

        <Link href={`/product/${product.id}`}>
          <p className="text-md font-light mb-2 line-clamp-2 hover:text-red-600 leading-tight group-hover:text-blue-600 transition-colors">
            {product.name}
          </p>
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
            {product.reviewCount && <span className="text-xs font-light text-gray-500">({product.reviewCount})</span>}
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="text-md font-light">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-md font-light text-gray-500 line-through">
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
            <Button variant="outline" className="w-full text-xm font-light bg-transparent h-8 sm:h-9">
              Choose options
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full text-sm font-light bg-transparent h-8 sm:h-9 hover:bg-[#003561] hover:text-white"
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
