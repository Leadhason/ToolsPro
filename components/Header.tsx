"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import CartSidebar from "@/components/cart-sidebar"

const categories = [
  {
    name: "Power Tools",
    href: "/category/power-tools",
    items: [
      { name: "Drills", href: "/category/power-tools?type=drill" },
      { name: "Saws", href: "/category/power-tools?type=saw" },
      { name: "Grinders", href: "/category/power-tools?type=grinder" },
      { name: "Sanders", href: "/category/power-tools?type=sander" },
    ],
  },
  {
    name: "Hand Tools",
    href: "/category/hand-tools",
    items: [
      { name: "Hammers", href: "/category/hand-tools?type=hammer" },
      { name: "Screwdrivers", href: "/category/hand-tools?type=screwdriver" },
      { name: "Wrenches", href: "/category/hand-tools?type=wrench" },
      { name: "Pliers", href: "/category/hand-tools?type=plier" },
    ],
  },
  {
    name: "Garden Tools",
    href: "/category/garden-tools",
    items: [
      { name: "Lawn Mowers", href: "/category/garden-tools?type=mower" },
      { name: "Trimmers", href: "/category/garden-tools?type=trimmer" },
      { name: "Pruners", href: "/category/garden-tools?type=pruner" },
      { name: "Hoses", href: "/category/garden-tools?type=hose" },
    ],
  },
  {
    name: "Automotive",
    href: "/category/automotive",
    items: [
      { name: "Wrenches", href: "/category/automotive?type=wrench" },
      { name: "Jacks", href: "/category/automotive?type=jack" },
      { name: "Diagnostic", href: "/category/automotive?type=diagnostic" },
      { name: "Cleaning", href: "/category/automotive?type=cleaning" },
    ],
  },
]

const brands = [
  { name: "Karcher", href: "/brand/karcher" },
  { name: "Bosch", href: "/brand/bosch" },
  { name: "Stanley", href: "/brand/stanley" },
  { name: "Ingco", href: "/brand/ingco" },
  { name: "Total Tools", href: "/brand/total-tools" },
  { name: "Einhell", href: "/brand/einhell" },
]

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { items } = useCart()
  const { items: wishlistItems } = useWishlist()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/placeholder-logo.svg" alt="SupplyMaster" width={40} height={40} className="h-8 w-8" />
              <span className="text-lg font-bold text-gray-900">SupplyMaster</span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                      {categories.map((category) => (
                        <div key={category.name}>
                          <h3 className="text-sm font-medium text-gray-900 mb-2">{category.name}</h3>
                          <ul className="space-y-1">
                            {category.items.map((item) => (
                              <li key={item.name}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={item.href}
                                    className="text-xs font-light text-gray-600 hover:text-gray-900 transition-colors"
                                  >
                                    {item.name}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">Brands</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] grid-cols-2 gap-3 p-4">
                      {brands.map((brand) => (
                        <NavigationMenuLink key={brand.name} asChild>
                          <Link
                            href={brand.href}
                            className="text-xs font-light text-gray-600 hover:text-gray-900 transition-colors block p-2 rounded-md hover:bg-gray-50"
                          >
                            {brand.name}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[300px] p-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Popular Tools</h3>
                      <ul className="space-y-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/category/power-tools?type=drill"
                              className="text-xs font-light text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              Power Drills
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/category/power-tools?type=saw"
                              className="text-xs font-light text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              Circular Saws
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/category/hand-tools?type=hammer"
                              className="text-xs font-light text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              Hammers
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/category/garden-tools?type=mower"
                              className="text-xs font-light text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              Lawn Mowers
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for tools..."
                  className="pl-10 pr-4 py-2 w-full text-sm font-light border-gray-300 focus:border-gray-500 focus:ring-0"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Mobile Search */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-600">
                    {totalItems}
                  </Badge>
                )}
              </Button>

              {/* User Account */}
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="flex flex-col space-y-4 mt-4">
                    <Link href="/" className="text-sm font-medium text-gray-900">
                      Home
                    </Link>
                    {categories.map((category) => (
                      <div key={category.name}>
                        <Link href={category.href} className="text-sm font-medium text-gray-900 block mb-2">
                          {category.name}
                        </Link>
                        <div className="ml-4 space-y-1">
                          {category.items.map((item) => (
                            <Link key={item.name} href={item.href} className="text-xs font-light text-gray-600 block">
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden py-3 border-t">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for tools..."
                  className="pl-10 pr-4 py-2 w-full text-sm font-light"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
