"use client"

import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function CartPage() {
  const { items, total, updateQuantity, removeFromCart } = useCart()

  const freeShippingThreshold = 500
  const progressPercentage = Math.min((total / freeShippingThreshold) * 100, 100)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/">
              <Button className="bg-gray-800 hover:bg-gray-900">Continue Shopping</Button>
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
        <h1 className="text-2xl font-bold mb-8">Your cart</h1>

        {/* Free shipping progress */}
        {total < freeShippingThreshold && (
          <div className="mb-8 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 mb-2">Your order is eligible for free shipping!</p>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {total >= freeShippingThreshold && (
          <div className="mb-8 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 font-medium">🎉 Your order is eligible for free shipping!</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">GH₵{item.price.toFixed(2)}</p>
                    </div>
                    <p className="font-semibold">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="px-3 py-1 text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Order summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">GH₵{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                <p>Taxes, discounts and shipping calculated at checkout.</p>
              </div>

              <Button className="w-full bg-gray-800 hover:bg-gray-900 mb-3">Checkout</Button>

              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
