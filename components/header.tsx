"use client"

import { Search, User, Heart, ShoppingCart, ChevronDown, Camera, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="w-full">
      {/* Top bar - hidden on mobile */}
      <div className="bg-black text-white text-xs sm:text-sm py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
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
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 sm:py-4">
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
                    <h3 className="font-semibold">Categories</h3>
                    <div className="space-y-1 pl-4">
                      <Link href="/category/tools" className="block py-2 hover:text-red-600">
                        Tools
                      </Link>
                      <Link href="/category/outdoor-equipment" className="block py-2 hover:text-red-600">
                        Outdoor Equipment
                      </Link>
                      <Link href="/category/building-materials" className="block py-2 hover:text-red-600">
                        Building Materials
                      </Link>
                      <Link href="/category/home-essentials" className="block py-2 hover:text-red-600">
                        Home Essentials & Decor
                      </Link>
                      <Link href="/b2b" className="block py-2 hover:text-red-600">
                        B2B Solutions
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link href="/top-sellers" className="block py-2 hover:text-red-600">
                      Top Sellers
                    </Link>
                    <Link href="/fresh-stock" className="block py-2 hover:text-red-600">
                      Just In: Fresh Stock
                    </Link>
                    <Link href="/reviews" className="block py-2 hover:text-red-600">
                      Reviews
                    </Link>
                    <Link href="/divisions" className="block py-2 hover:text-red-600">
                      Divisions
                    </Link>
                    <Link href="/loyalty" className="block py-2 hover:text-red-600">
                      Loyalty Program
                    </Link>
                  </div>
                  <Button className="w-full bg-gray-800 hover:bg-gray-900">Contact Us</Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold">SUPPLY</span>
              <span className="text-lg sm:text-xl lg:text-2xl font-light text-gray-600">MASTER</span>
            </Link>

            {/* Search - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="flex w-full">
                <select className="border border-r-0 rounded-l-md px-3 py-2 bg-gray-50 text-sm min-w-[80px]">
                  <option>All</option>
                  <option>Tools</option>
                  <option>Outdoor</option>
                  <option>Building</option>
                </select>
                <div className="relative flex-1">
                  <Input
                    placeholder="Search by name or brand"
                    className="rounded-none border-l-0 border-r-0 focus-visible:ring-0"
                  />
                </div>
                <Button className="rounded-l-none bg-gray-100 hover:bg-gray-200 text-gray-600 border border-l-0">
                  <Camera className="h-4 w-4" />
                </Button>
                <Button className="rounded-l-none">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Search toggle for mobile/tablet */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            {/* User actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  0
                </span>
              </Button>
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
      <div className="bg-white border-b hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-4 lg:gap-8">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm lg:text-base font-medium">
                    Tools <ChevronDown className="ml-1 h-3 w-3 lg:h-4 lg:w-4" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[800px] p-6">
                      <div className="grid grid-cols-4 gap-8">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Hand Tools</h3>
                          <div className="space-y-2">
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Screwdrivers
                            </Link>
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Hammers
                            </Link>
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Wrenches
                            </Link>
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Pliers
                            </Link>
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Tool Sets
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Power Tools</h3>
                          <div className="space-y-2">
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Drills
                            </Link>
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Grinders
                            </Link>
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Saws
                            </Link>
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Sanders
                            </Link>
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Rotary Hammers
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Measuring Tools</h3>
                          <div className="space-y-2">
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Tape Measures
                            </Link>
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Levels
                            </Link>
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Calipers
                            </Link>
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Squares
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Safety Equipment</h3>
                          <div className="space-y-2">
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Safety Helmets
                            </Link>
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Work Gloves
                            </Link>
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Safety Glasses
                            </Link>
                            <Link href="/category/tools" className="block text-sm text-gray-600 hover:text-red-600">
                              Ear Protection
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm lg:text-base font-medium">
                    Outdoor Equipment <ChevronDown className="ml-1 h-3 w-3 lg:h-4 lg:w-4" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[800px] p-6">
                      <div className="grid grid-cols-4 gap-8">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Generators</h3>
                          <div className="space-y-2">
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Gasoline Generators
                            </Link>
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Diesel Generators
                            </Link>
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Inverter Generators
                            </Link>
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Portable Generators
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Water Pumps</h3>
                          <div className="space-y-2">
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Peripheral Pumps
                            </Link>
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Centrifugal Pumps
                            </Link>
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Submersible Pumps
                            </Link>
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Pressure Washers
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Garden Tools</h3>
                          <div className="space-y-2">
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Grass Trimmers
                            </Link>
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Lawn Mowers
                            </Link>
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Hedge Trimmers
                            </Link>
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Chainsaws
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Cleaning Equipment</h3>
                          <div className="space-y-2">
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Pressure Washers
                            </Link>
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Vacuum Cleaners
                            </Link>
                            <Link
                              href="/category/outdoor-equipment"
                              className="block text-sm text-gray-600 hover:text-red-600"
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
                  <NavigationMenuTrigger className="text-sm lg:text-base font-medium">
                    Building Materials <ChevronDown className="ml-1 h-3 w-3 lg:h-4 lg:w-4" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[1000px] p-6">
                      <div className="grid grid-cols-5 gap-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Plumbing & Swimming Pool</h3>
                          <div className="space-y-2">
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Drains
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Taps & Faucet
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Plumbing Parts & Fittings
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Plumbing Accessories
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Water Filtration & Treatment
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Swimming Pool
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Electrical</h3>
                          <div className="space-y-2">
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Power Management & Protection
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Smart Home
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Switches & Sockets
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Cables & Wires
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Electrical Accessories
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Paints, Chemicals, and Adhesives</h3>
                          <div className="space-y-2">
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Adhesive & Glue
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Caulk & Sealants
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Paint
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Paint Tools & Equipment
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Waterproofing Products
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Hardware Accessories</h3>
                          <div className="space-y-2">
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Adhesives & Tapes
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Hanging & Mounting
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Padlocks & Accessories
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Security & Surveillance Systems
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Ladder & Access Equipment
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Door & Window Hardware</h3>
                          <div className="space-y-2">
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Door Handles & Knobs
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Door Locks
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Window Hardware
                            </Link>
                            <Link
                              href="/category/building-materials"
                              className="block text-sm text-gray-600 hover:text-red-600"
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
                  <NavigationMenuTrigger className="text-sm lg:text-base font-medium">
                    Home Essentials & Decor <ChevronDown className="ml-1 h-3 w-3 lg:h-4 lg:w-4" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[800px] p-6">
                      <div className="grid grid-cols-4 gap-8">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Kitchen Appliances</h3>
                          <div className="space-y-2">
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Electric Kettles
                            </Link>
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Hot Plates
                            </Link>
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Blenders
                            </Link>
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Rice Cookers
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Bathroom</h3>
                          <div className="space-y-2">
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Water Heaters
                            </Link>
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Shower Systems
                            </Link>
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Bathroom Accessories
                            </Link>
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Soap Dispensers
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Lighting</h3>
                          <div className="space-y-2">
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              LED Bulbs
                            </Link>
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Ceiling Lights
                            </Link>
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Wall Lights
                            </Link>
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Outdoor Lighting
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Home Decor</h3>
                          <div className="space-y-2">
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Wall Art
                            </Link>
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Mirrors
                            </Link>
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Storage Solutions
                            </Link>
                            <Link
                              href="/category/home-essentials"
                              className="block text-sm text-gray-600 hover:text-red-600"
                            >
                              Curtains & Blinds
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm lg:text-base font-medium">
                    B2B Solutions <ChevronDown className="ml-1 h-3 w-3 lg:h-4 lg:w-4" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-6">
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Bulk Orders</h3>
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
                          <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
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
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/top-sellers" className="text-sm lg:text-base font-medium hover:text-red-600">
                      Top Sellers
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/fresh-stock" className="text-sm lg:text-base font-medium hover:text-red-600">
                      Just In: Fresh Stock
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden lg:flex items-center gap-6">
              <Link href="/reviews" className="text-gray-600 hover:text-red-600 text-sm">
                Reviews
              </Link>
              <Link href="/divisions" className="text-gray-600 hover:text-red-600 text-sm">
                Divisions
              </Link>
              <Link href="/loyalty" className="text-gray-600 hover:text-red-600 text-sm">
                Loyalty Program
              </Link>
              <Button className="bg-gray-800 hover:bg-gray-900 text-sm">Contact Us</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Promo bar - Responsive */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center lg:justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-8 overflow-x-auto">
              <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-gray-800 rounded-full"></div>
                </div>
                <span className="hidden sm:inline">Free Accra delivery over GH₵200</span>
                <span className="sm:hidden">Free delivery GH₵200+</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-gray-800 rounded-full"></div>
                </div>
                <span>Pay on Delivery</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-gray-800 rounded-full"></div>
                </div>
                <span className="hidden lg:inline">Delivery within 48-Hours</span>
                <span className="lg:hidden">48hr Delivery</span>
              </div>
              <div className="hidden md:flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-gray-800 rounded-full"></div>
                </div>
                <span className="hidden lg:inline">Weekend orders process on Mondays</span>
                <span className="lg:hidden">Weekend orders Mon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
