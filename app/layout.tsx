import type React from "react"
import type { Metadata } from "next"
import { Barlow } from "next/font/google"
import "./globals.css"

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Supply Master - Ghana's #1 for Tools & Building Materials",
  description:
    "Shop the best tools and building materials in Ghana. Trusted by 60,000+ Ghanaians with 75,000+ orders delivered. Fast delivery, unbeatable prices.",
  keywords: "tools, building materials, Ghana, Ingco, Total Tools, Karcher, hardware store",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={barlow.className}>{children}</body>
    </html>
  )
}
