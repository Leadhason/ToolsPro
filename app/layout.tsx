import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"

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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
