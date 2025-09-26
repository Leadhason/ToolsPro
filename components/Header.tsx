"use client"

import { Search, Heart, ShoppingCart, Camera, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react" // Added useEffect
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Truck, Package, CreditCard, Headset, User } from "lucide-react"
import {
  Sheet, SheetContent, SheetTrigger
} from "@/components/ui/sheet"
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
import { useRouter, useSearchParams } from "next/navigation"; // Imported useRouter and useSearchParams
import { useFilter } from "@/context/filter-context"; // Imported useProductFilters
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import DropdownMenu components

import { CartSidebar } from "./cart-sidebar"
import { Category } from "@/lib/data"; // Import Category interface
import { getPublicImageUrl } from "@/lib/supabase/image-utils"; // Import getPublicImageUrl


export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false)
  const [searchInputValue, setSearchInputValue] = useState(""); // Local state for search input
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null); // State to hold user session

  const router = useRouter();
  const searchParams = useSearchParams();

  const { itemCount: cartItemCount } = useCart()
  const { itemCount: wishlistItemCount } = useWishlist()
  const {
    filters: { searchQuery: currentSearchQuery, ...otherFilters }, // Corrected destructuring
    updateFilter,
    allCategories,
    allProducts
  } = useFilter();

  // Check for user session from JWT token
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  // Sync local search input with context search query
  useEffect(() => {
    setSearchInputValue(currentSearchQuery); // Use currentSearchQuery
  }, [currentSearchQuery]);

  const handleSearch = () => {
    if (searchInputValue.trim()) {
      updateFilter("searchQuery", searchInputValue.trim());
      updateFilter("currentCategorySlug", "all-products"); // Reset category when searching
      updateFilter("activeCategoryIds", []); // Clear active categories
      updateFilter("activeTags", []); // Clear active tags
      router.push(`/category/all-products?search=${encodeURIComponent(searchInputValue.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    const category = allCategories.find(cat => cat.id === categoryId);
    if (category) {
      updateFilter("currentCategorySlug", category.slug);
      updateFilter("searchQuery", ""); // Clear search query
      updateFilter("activeTags", []); // Clear active tags
      router.push(`/category/${category.slug}`);
    }
  };

  const handleTagClick = (tag: string) => {
    updateFilter("activeTags", [tag]);
    updateFilter("searchQuery", ""); // Clear search query
    updateFilter("currentCategorySlug", "all-products"); // Go to generic all products page
    updateFilter("activeCategoryIds", []); // Clear active categories
    router.push(`/category/all-products?tags=${encodeURIComponent(tag)}`);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push("/signin"); // Redirect to sign-in page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getChildCategories = (parentId: string | null) => {
    return allCategories.filter(cat => cat.parentId === parentId);
  };

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
            <div className="hidden lg:flex flex-1 max-w-4xl mx-4 bg-white rounded-none p-1 border border-gray-300">
              <div className="flex w-full">
                <select
                  className="border-none outline-none rounded-none px-3 bg-transparent  text-xs min-w-[120px]"
                  onChange={(e) => {
                    const selectedSlug = e.target.value;
                    if (selectedSlug) {
                      const category = allCategories.find(cat => cat.slug === selectedSlug);
                      if (category) {
                        handleCategoryClick(category.id);
                      } else if (selectedSlug === "all-products") {
                        updateFilter("currentCategorySlug", "all-products");
                        router.push("/category/all-products");
                      }
                    }
                  }}
                  value={searchParams.get("categorySlug") || "all-products"} // Use categorySlug from URL
                >
                  <option value="all-products">All</option>
                  {allCategories.filter(cat => cat.parentId === null).map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
                <div className="lg:flex flex-1 mx-[2px] bg-transparent rounded-none border-l">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Search by name or brand"
                      className="rounded-none bg-transparent border-none outline-none pr-10 text-black shadow-none"
                      value={searchInputValue}
                      onChange={(e) => setSearchInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                    />
                  </div>
                  <Button className="bg-transparent hover:bg-transparent cursor-pointer text-black mr-5 shadow-none">
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button className="bg-transparent hover:bg-transparent cursor-pointer text-black shadow-none" onClick={handleSearch}>
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
                className="relative bg-transparent cursor-pointer"
                onClick={() => setIsCartSidebarOpen(true)}
              >
                <ShoppingCart className="h-10 w-10 font-light" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                    {cartItemCount}
                  </span>
                )}
              </Button>
              <Link href="/wishlist">
                <Button variant="ghost" size="default" className="relative bg-transparent cursor-pointer">
                  <Heart className="h-8 w-8 " />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                      {wishlistItemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="default" className="relative rounded-full bg-gray-100 cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={user.email || "User Avatar"} />
                        <AvatarFallback>{user.email?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/order-history")}>
                      Shopping History
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/signin" className="hidden sm:flex">
                <Button variant="ghost" className="rounded-none p-5 border text-sm font-light cursor-pointer hover:bg-black hover:text-white px-6">
                  <User className="inline mr-1 h-4 w-4" /> Login
                </Button>
              </Link>
              )}
            </div>
          </div>

          {/* Mobile search bar */}
          {isSearchOpen && (
            <div className="mt-4 lg:hidden">
              <div className="flex">
                <div className="relative flex-1">
                  <Input 
                    placeholder="Search by name or brand" 
                    className="pr-10" 
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                  <Button size="icon" className="absolute right-0 top-0 h-full rounded-l-none" onClick={handleSearch}>
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
                <NavigationMenu className="w-full">
                  <NavigationMenuList className="flex gap-4 lg:gap-8 text-[10px] font-light w-full"> {/* Reverted font size */}
                    {getChildCategories(null).map(rootCategory => (
                      <NavigationMenuItem key={rootCategory.id} className="w-full">
                        <NavigationMenuTrigger className="text-sm font-semibold cursor-pointer" onClick={() => handleCategoryClick(rootCategory.id)}>
                          {rootCategory.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="">
                          <div className="w-[800px] border-0 shadow-none p-6 grid grid-cols-3 gap-8">
                            {getChildCategories(rootCategory.id).map(childCategory => (
                              <div key={childCategory.id}>
                                <h3 
                                  className="font-semibold text-xs text-gray-900 mb-3 cursor-pointer" /* Reverted font size and removed cursor-pointer/hover */
                                  onClick={() => handleCategoryClick(childCategory.id)}
                                >
                                  {childCategory.name}
                              </h3>
                              <div className="space-y-2">
                                  {getChildCategories(childCategory.id).map(grandchildCategory => (
                                <Link
                                      key={grandchildCategory.id}
                                      href={`/category/${grandchildCategory.slug}`}
                                      className="block text-xs text-gray-600 hover:text-red-600" /* Reverted font size */
                                      onClick={() => handleCategoryClick(grandchildCategory.id)}
                                    >
                                      {grandchildCategory.name}
                                </Link>
                                  ))}
                            </div>
                              </div>
                            ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
                <div className="hidden lg:flex items-center gap-6 ml-8 font-medium text-sm"> {/* Reverted font size and weight */}
                  <Link href="/category/all-products?tags=new-arrival" className="text-gray-600 hover:text-red-600" onClick={() => handleTagClick("new-arrival")}>
                    New Arrivals
                  </Link>
                  <Link href="/category/all-products?tags=best-seller" className="text-gray-600 hover:text-red-600" onClick={() => handleTagClick("best-seller")}>
                    Best Sellers
                  </Link>
                  <Link href="/reviews" className="text-gray-600 hover:text-red-600">
                    Reviews
                  </Link>
                  <Link href="/contact">
                    <Button className="bg-black hover:bg-gray-800 rounded-none font-semibold p-5 text-sm cursor-pointer ml-4">
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
      <div className="bg-black text-white py-2 mt-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center lg:justify-between w-full">
            <div className="flex items-center gap-8 text-xs sm:gap-6 lg:gap-12 justify-between w-full">
              <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                <div className="bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <span className="hidden sm:inline">Free Accra delivery over GH₵200</span>
                <span className="sm:hidden">Free delivery GH₵200+</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                <div className="bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <span>Pay on Delivery</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                <div className="bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <span className="hidden lg:inline">Delivery within 48-Hours</span>
                <span className="lg:hidden">48hr Delivery</span>
              </div>
              <div className="hidden md:flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                <div className="bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <Headset className="w-5 h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
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
