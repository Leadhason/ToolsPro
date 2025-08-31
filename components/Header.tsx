"use client"

import { Search, Heart, ShoppingCart, Camera, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Truck } from "lucide-react"
import { Package } from "lucide-react"
import { CreditCard } from "lucide-react"
import { Headset } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"

import { CartSidebar } from "./cart-sidebar"


export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false)
  const { itemCount: cartItemCount } = useCart()
  const { itemCount: wishlistItemCount } = useWishlist()

  return (
    <header className="w-full z-50">
      {/* Top bar - hidden on mobile */}
      <div className="bg-black text-white font-light text-xs sm:text-sm py-2 hidden md:block">
        <div className="container mx-auto px-4 text-sm flex justify-between items-center">
          <span className="truncate">Weekend orders are processed on Mondays!</span>
          <div className="flex gap-2 sm:gap-4 text-xs">
            <Link href="#" className="hover:underline whitespace-nowrap">
              Android App
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline whitespace-nowrap">
              iOS App
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white">
        <div className="container mx-auto -mb-4 px-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Mobile menu trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="space-y-4 mt-8">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-xs">Categories</h3>
                    <div className="space-y-1 pl-4">
                      <Link href="/category/tools" className="block py-2 hover:text-red-600 text-[10px]">
                        Tools
                      </Link>
                      <Link href="/category/outdoor-equipment" className="block py-2 hover:text-red-600 text-[10px]">
                        Outdoor Equipment
                      </Link>
                      <Link href="/category/building-materials" className="block py-2 hover:text-red-600 text-[10px]">
                        Building Materials
                      </Link>
                      <Link href="/category/home-essentials" className="block py-2 hover:text-red-600 text-[10px]">
                        Home Essentials & Decor
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link href="/reviews" className="block py-2 hover:text-red-600 text-[10px]">
                      Reviews
                    </Link>
                    <Link href="/top-sellers" className="block py-2 hover:text-red-600 text-[10px]">
                      Top Sellers
                    </Link>
                    <Link href="/fresh-stock" className="block py-2 hover:text-red-600 text-[10px]">
                      Just In: Fresh Stock
                    </Link>
                  </div>
                  <Button className="w-full bg-gray-800 hover:bg-gray-900 text-xs font-light">Contact Us</Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 -ml-4">
              <Image 
                src="/EDMAX.png" 
                alt="EDMAX Logo" 
                width={100}
                height={100}
                className=""
              />
              <div className="hidden md:flex flex-col -ml-4">
                <span className="text-sm font-medium leading-tight">EDMAX</span>
                <span className="text-xs font-light text-gray-600 leading-tight">Tools and Power Technologies</span>
              </div>
            </Link>

            {/* Search - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-4xl mx-4 bg-white p-1 rounded-md">
              <div className="flex w-full">
                <select className="border-none outline-none rounded-l-md px-3 bg-gray-100 text-xs min-w-[120px]">
                  <option>All</option>
                  <option>Tools</option>
                  <option>Outdoor</option>
                  <option>Building</option>
                </select>
                <div className="lg:flex flex-1 mx-[2px] bg-gray-100 p-1 rounded-r-md">
                  <div className="relative flex-1 ">
                    <Input
                      placeholder="Search by name or brand"
                      className="rounded-none border-none outline-none pr-10 shadow-none"
                    />
                  </div>
                  <Button className="bg-transparent text-black mr-5 shadow-none">
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button className="bg-transparent text-black shadow-none">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Search toggle for mobile/tablet */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            {/* User actions */}
            <div className="flex items-center gap-1 sm:gap-2 -ml-6 p-1">
              <Button
                variant="ghost"
                size="default"
                className="relative rounded-full bg-gray-100 cursor-pointer"
                onClick={() => setIsCartSidebarOpen(true)}
              >
                <ShoppingCart className="h-8 w-8" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                    {cartItemCount}
                  </span>
                )}
              </Button>
              <Link href="/wishlist">
                <Button variant="ghost" size="default" className="relative rounded-full bg-gray-100 cursor-pointer">
                  <Heart className="h-8 w-8 " />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                      {wishlistItemCount}
                    </span>
                  )}
                </Button>
              </Link>

              <Link href="/signin" className="hidden sm:flex">
                <Button variant="ghost" className="rounded-full border text-sm font-light cursor-pointer hover:bg-black hover:text-white px-6">
                  Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile search bar */}
          {isSearchOpen && (
            <div className="mt-4 lg:hidden">
              <div className="flex">
                <div className="relative flex-1">
                  <Input placeholder="Search by name or brand" className="pr-10" />
                  <Button size="icon" className="absolute right-0 top-0 h-full rounded-l-none">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation - Desktop only */}
      <div className="bg-white hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between p-2 ">
            <div className="flex-col w-full">
              <div className="flex md:flex-1 justify-between items-center w-full">
                <NavigationMenu>
                  <NavigationMenuList className="flex gap-4 lg:gap-8 text-[10px] font-light">
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-sm font-semibold">Tools</NavigationMenuTrigger>
                      <NavigationMenuContent className="w-full">
                        <div className="w-[800px] p-6">
                          <div className="grid grid-cols-4 gap-8">
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Hand Tools</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Screwdrivers
                                </Link>
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Hammers
                                </Link>
                                <Link
                                  href="/category/tools"
                                  className="block text-[10px] text-gray-600 hover:text-red-600"
                                >
                                  Wrenches
                                </Link>
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Pliers
                                </Link>
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Tool Sets
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Power Tools</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Drills
                                </Link>
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Grinders
                                </Link>
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Saws
                                </Link>
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Sanders
                                </Link>
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Rotary Hammers
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Measuring Tools</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Tape Measures
                                </Link>
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Levels
                                </Link>
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Calipers
                                </Link>
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Squares
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Safety Equipment</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Safety Helmets
                                </Link>
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Work Gloves
                                </Link>
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Safety Glasses
                                </Link>
                                <Link
                                  href="/category/tools"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Ear Protection
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-sm font-semibold">Outdoor Equipment</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[800px] p-6">
                          <div className="grid grid-cols-4 gap-8">
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Generators</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Gasoline Generators
                                </Link>
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Diesel Generators
                                </Link>
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Inverter Generators
                                </Link>
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Portable Generators
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Water Pumps</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Peripheral Pumps
                                </Link>
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Centrifugal Pumps
                                </Link>
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Submersible Pumps
                                </Link>
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Pressure Washers
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Garden Tools</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Grass Trimmers
                                </Link>
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Lawn Mowers
                                </Link>
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Hedge Trimmers
                                </Link>
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Chainsaws
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Cleaning Equipment</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Pressure Washers
                                </Link>
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Vacuum Cleaners
                                </Link>
                                <Link
                                  href="/category/outdoor-equipment"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Steam Cleaners
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-sm font-semibold">Building Materials</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[1000px] p-6">
                          <div className="grid grid-cols-5 gap-6">
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Plumbing & Swimming Pool</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Drains
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Taps & Faucet
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Plumbing Parts & Fittings
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Plumbing Accessories
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Water Filtration & Treatment
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Swimming Pool
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Electrical</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Power Management & Protection
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Smart Home
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Switches & Sockets
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Cables & Wires
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Electrical Accessories
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">
                                Paints, Chemicals, and Adhesives
                              </h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Adhesive & Glue
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Caulk & Sealants
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Paint
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Paint Tools & Equipment
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Waterproofing Products
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Hardware Accessories</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Adhesives & Tapes
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Hanging & Mounting
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Padlocks & Accessories
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Security & Surveillance Systems
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Ladder & Access Equipment
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Door & Window Hardware</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Door Handles & Knobs
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Door Locks
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Window Hardware
                                </Link>
                                <Link
                                  href="/category/building-materials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Hinges & Brackets
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-sm font-semibold">
                        Home Essentials & Decor
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[800px] p-6">
                          <div className="grid grid-cols-4 gap-8">
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Kitchen Appliances</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Electric Kettles
                                </Link>
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Hot Plates
                                </Link>
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Blenders
                                </Link>
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Rice Cookers
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Bathroom</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Water Heaters
                                </Link>
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Shower Systems
                                </Link>
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Bathroom Accessories
                                </Link>
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Soap Dispensers
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Lighting</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  LED Bulbs
                                </Link>
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Ceiling Lights
                                </Link>
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Wall Lights
                                </Link>
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Outdoor Lighting
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-xs text-gray-900 mb-3">Home Decor</h3>
                              <div className="space-y-2">
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Wall Art
                                </Link>
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Mirrors
                                </Link>
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Storage Solutions
                                </Link>
                                <Link
                                  href="/category/home-essentials"
                                  className="block text-xs text-gray-600 hover:text-red-600"
                                >
                                  Curtains & Blinds
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                <div className="hidden lg:flex items-center gap-6 ml-8 font-medium text-sm">
                  <Link href="/fresh-stock" className="text-gray-600 hover:text-red-600">
                    New Arrivals
                  </Link>
                  <Link href="/best-sellers" className="text-gray-600 hover:text-red-600">
                    Best Sellers
                  </Link>
                  <Link href="/reviews" className="text-gray-600 hover:text-red-600">
                  Reviews
                  </Link>
                  <Link href="/contact">
                    <Button className="bg-[#003561] hover:bg-[#00274d] rounded-full font-light text-sm cursor-pointer ml-4">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>

              {/*<div className="flex flex-col mt-2">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-sm font-semibold">B2B Solutions</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[600px] p-6">
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <h3 className="font-semibold text-sm text-gray-900 mb-3">Bulk Orders</h3>
                              <div className="space-y-2">
                                <Link href="/b2b" className="block text-sm text-gray-600 hover:text-red-600">
                                  Construction Projects
                                </Link>
                                <Link href="/b2b" className="block text-sm text-gray-600 hover:text-red-600">
                                  Industrial Supply
                                </Link>
                                <Link href="/b2b" className="block text-sm text-gray-600 hover:text-red-600">
                                  Wholesale Pricing
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm text-gray-900 mb-3">Services</h3>
                              <div className="space-y-2">
                                <Link href="/b2b" className="block text-sm text-gray-600 hover:text-red-600">
                                  Custom Quotes
                                </Link>
                                <Link href="/b2b" className="block text-sm text-gray-600 hover:text-red-600">
                                  Delivery Services
                                </Link>
                                <Link href="/b2b" className="block text-sm text-gray-600 hover:text-red-600">
                                  Account Management
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem> */}

                    {/* <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/top-sellers" className="text-sm font-semibold hover:text-red-600">
                          Top Sellers
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/fresh-stock" className="text-sm font-semibold hover:text-red-600">
                          Just In: Fresh Stock
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Promo bar - Responsive */}
      <div className="bg-[#003561] text-white py-2 mt-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center lg:justify-between w-full">
            <div className="flex items-center gap-8 text-xs sm:gap-6 lg:gap-12 justify-between w-full">
              <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                <div className="bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#E86514]" />
                </div>
                <span className="hidden sm:inline">Free Accra delivery over GH₵200</span>
                <span className="sm:hidden">Free delivery GH₵200+</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                <div className="bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#E86514]" />
                </div>
                <span>Pay on Delivery</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                <div className="bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#E86514]" />
                </div>
                <span className="hidden lg:inline">Delivery within 48-Hours</span>
                <span className="lg:hidden">48hr Delivery</span>
              </div>
              <div className="hidden md:flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                <div className="bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <Headset className="w-5 h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#E86514]" />
                </div>
                <span className="hidden lg:inline">Weekend orders process on Mondays</span>
                <span className="lg:hidden">Weekend orders Mon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CartSidebar isOpen={isCartSidebarOpen} onClose={() => setIsCartSidebarOpen(false)} />
    </header>
  )
}
