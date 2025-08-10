"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Star } from "lucide-react"

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      brand: item.brand,
    })
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">Wishlist</h1>
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <p className="text-gray-600 mb-8">Your wishlist is empty</p>
            <Link href="/">
              <Button className="bg-black hover:bg-gray-800">Discover more</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Wishlist</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 relative group">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-white rounded-full shadow-md"
                onClick={() => removeFromWishlist(item.id)}
              >
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </Button>

              <Link href={`/product/${item.id}`}>
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              </Link>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">{item.brand}</p>
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-medium line-clamp-2 hover:text-red-600">{item.name}</h3>
                </Link>

                {item.rating && (
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(item.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    {item.reviewCount && <span className="text-xs text-gray-500">({item.reviewCount})</span>}
                  </div>
                )}

                <p className="font-bold text-lg">GH₵{item.price.toFixed(2)}</p>

                <div className="space-y-2 pt-2">
                  <Button className="w-full bg-gray-800 hover:bg-gray-900" onClick={() => handleAddToCart(item)}>
                    Add to cart
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove from wishlist
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
