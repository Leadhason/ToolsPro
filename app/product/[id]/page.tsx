import { notFound } from "next/navigation"
import Image from "next/image"
import { Star, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { getProduct } from "@/lib/data"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full rounded-lg"
              />
              {product.discount && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">{product.discount}% off</Badge>
              )}
              {product.isNew && <Badge className="absolute top-4 right-4 bg-green-500 text-white">New arrival</Badge>}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="text-sm text-gray-600 mb-2">SM Essential Bundles</div>
              <div className="text-sm text-gray-800 mb-4">{product.brand}</div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-tight">{product.name}</h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-bold">GH₵{product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">GH₵{product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>

              {product.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  {product.reviewCount && (
                    <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
                  )}
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border rounded-md w-fit">
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">1</span>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="flex-1 sm:flex-none sm:min-w-[200px] bg-gray-800 hover:bg-gray-900">
                  Add to cart
                </Button>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Buy it now
              </Button>
            </div>

            <div className="pt-4 border-t">
              <Button variant="link" className="text-blue-600 p-0">
                Full details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
