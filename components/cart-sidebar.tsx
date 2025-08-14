"use client"

import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
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
      <SheetContent side="right" className="w-full sm:w-[400px] p-2">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 py-5 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xs font-medium text-gray-900">Your cart</SheetTitle>
              <div className="flex items-center gap-4">
                <Link href="/cart" onClick={onClose} className="">
                  <Button
                    variant="ghost"
                    className="text-xs font-light text-gray-600 hover:text-gray-900 p-0 pointer-cursor h-auto font-light underline"
                  >
                    View cart
                  </Button>
                </Link>
              </div>
            </div>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-sm font-light text-gray-600 mb-4">Your cart is empty</p>
              <Button onClick={onClose} className="bg-gray-800 hover:bg-gray-900 font-light">
                Start shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Free shipping progress */}
              {total < freeShippingThreshold && (
                <div className="p-4 bg-green-50 border-b">
                  <p className="text-[10px] font-light text-center text-green-800 mb-2">
                    Your order is eligible for free shipping!
                  </p>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] font-light text-center text-green-700 mt-1">
                    Add GH₵{remainingForFreeShipping.toFixed(2)} more for free shipping
                  </p>
                </div>
              )}

              {total >= freeShippingThreshold && (
                <div className="p-4 bg-green-50 border-b">
                  <p className="text-xs text-green-800 text-center font-light">
                    🎉 Your order is eligible for free shipping!
                  </p>
                </div>
              )}

              {/* Cart items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg?height=80&width=80&query=product"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover bg-gray-50"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-light text-gray-900 line-clamp-2 mb-2 leading-5">{item.name}</h3>
                      <p className="text-xs font-light text-gray-600 mb-4">GH₵{item.price.toLocaleString()}.00</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-gray-50 text-xs font-light"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-3 py-1 text-xs font-light min-w-[2rem] text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-gray-50 text-xs font-light"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-xs font-light text-gray-400 hover:text-gray-600 hover:bg-gray-50"
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
                <div className="text-xs font-light text-center text-gray-600">
                  <p>Taxes, discounts and shipping calculated at checkout.</p>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-gray-800 text-xs font-light hover:bg-gray-900">
                    Checkout - GH₵{total.toFixed(2)}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
