import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { FilterProvider } from "@/context/filter-context"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ToolsPro - Ghana's #1 for Tools & Building Materials",
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
        <title>EDMAX - Building Materials and Power Technologies</title>
        <meta
          name="description"
          content="EDMAX is Ghana's leading supplier of quality building materials and power technologies"
        />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <FilterProvider>
            <CartProvider>
              <WishlistProvider>{children}</WishlistProvider>
            </CartProvider>
          </FilterProvider>
        </Suspense>
      </body>
    </html>
  )
}
