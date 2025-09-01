import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { FilterProvider } from "@/context/filter-context"
import { CompareProvider } from "@/context/compare-context"; 
import { Toaster } from "@/components/ui/sonner"; 


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EDMAX - Tools and Power Technologies",
  description: "Shop Ghana's largest selection of tools and building materials with fast delivery",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>EDMAX - Tools and Power Technologies</title>
        <meta
          name="description"
          content="EDMAX is Ghana's leading supplier of quality building materials and power technologies"
        />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <FilterProvider>
            <CartProvider>
              <WishlistProvider>
                <CompareProvider>{children}</CompareProvider>
              </WishlistProvider>
            </CartProvider>
          </FilterProvider>
        </Suspense>
        <Toaster />
      </body>
    </html>
  )
}
