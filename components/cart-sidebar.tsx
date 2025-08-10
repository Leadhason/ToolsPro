"use client"

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, total, updateQuantity, removeFromCart } = useCart()

  const freeShippingThreshold = 500
  const progressPercentage = Math.min((total / freeShippingThreshold) * 100, 100)
  const remainingForFreeShipping = Math.max(freeShippingThreshold - total, 0)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold">Your cart</SheetTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Button onClick={onClose} className="bg-gray-800 hover:bg-gray-900">
                Start shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Free shipping progress */}
              {total < freeShippingThreshold && (
                <div className="p-4 bg-green-50 border-b">
                  <p className="text-sm text-green-800 mb-2">Your order is eligible for free shipping!</p>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Add GH₵{remainingForFreeShipping.toFixed(2)} more for free shipping
                  </p>
                </div>
              )}

              {total >= freeShippingThreshold && (
                <div className="p-4 bg-green-50 border-b">
                  <p className="text-sm text-green-800 font-medium">🎉 Your order is eligible for free shipping!</p>
                </div>
              )}

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-xs text-gray-600">{item.brand}</p>
                        <p className="font-semibold">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <h3 className="text-sm font-medium line-clamp-2 mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">GH₵{item.price.toFixed(2)}</p>

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

              {/* Footer */}
              <div className="border-t p-4 space-y-4">
                <div className="text-sm text-gray-600">
                  <p>Taxes, discounts and shipping calculated at checkout.</p>
                </div>

                <div className="space-y-2">
                  <Link href="/cart" onClick={onClose}>
                    <Button variant="outline" className="w-full bg-transparent">
                      View cart
                    </Button>
                  </Link>
                  <Button className="w-full bg-gray-800 hover:bg-gray-900">Checkout - GH₵{total.toFixed(2)}</Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
