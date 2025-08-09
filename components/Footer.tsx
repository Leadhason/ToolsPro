import Link from "next/link"
import { Facebook, Youtube, Instagram, MessageCircle, Twitter, Linkedin, Undo2, Container, BadgeCheck } from 'lucide-react'

export default function Footer() {
  return (
    <>
      {/* Support Links Section */}
      <section className="bg-gray-50 py-6">
        <div className="text-center">
          <Link href="#" className="font-light text-sm hover:underline">
            Back to top
          </Link>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-emerald-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold">TOOLS</span>
                <span className="text-xl font-light text-gray-400">PRO</span>
              </div>
              <h3 className="font-semibold mb-2">You Build, We Deliver</h3>
              <p className="text-gray-400 text-sm mb-6">
                A trailblazing digital innovator in Ghana, revolutionizing how brands engage with consumers!
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Get to Know Us */}
            <div>
              <h3 className="font-semibold mb-4">Get to Know Us</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-white text-sm">
                  About
                </Link>
                <Link href="/divisions" className="block text-gray-400 hover:text-white text-sm">
                  Divisions
                </Link>
                <Link href="/sell" className="block text-gray-400 hover:text-white text-sm">
                  Sell on ToolsPro
                </Link>
                <Link href="/payment" className="block text-gray-400 hover:text-white text-sm">
                  Buy Now, Pay Later
                </Link>
                <Link href="/blog" className="block text-gray-400 hover:text-white text-sm">
                  Blog
                </Link>
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <h3 className="font-semibold mb-4">Product Categories</h3>
              <div className="space-y-2">
                <Link href="/category/tools" className="block text-gray-400 hover:text-white text-sm">
                  Tools
                </Link>
                <Link href="/category/outdoor-equipment" className="block text-gray-400 hover:text-white text-sm">
                  Outdoor Equipment
                </Link>
                <Link href="/category/building-materials" className="block text-gray-400 hover:text-white text-sm">
                  Building Materials
                </Link>
                <Link href="/category/home-essentials" className="block text-gray-400 hover:text-white text-sm">
                  Home Essentials & Decor
                </Link>
                <Link href="/collections" className="block text-gray-400 hover:text-white text-sm">
                  All collections
                </Link>
              </div>
            </div>

            {/* Customer Support */}
            <div>
              <h3 className="font-semibold mb-4">Customer Support & Policies</h3>
              <div className="space-y-2">
                <Link href="/contact" className="block text-gray-400 hover:text-white text-sm">
                  Contact Us
                </Link>
                <Link href="/returns" className="block text-gray-400 hover:text-white text-sm">
                  Request Return
                </Link>
                <Link href="/faq" className="block text-gray-400 hover:text-white text-sm">
                  FAQ
                </Link>
                <Link href="/return-policy" className="block text-gray-400 hover:text-white text-sm">
                  Return & Refund Policy
                </Link>
                <Link href="/shipping" className="block text-gray-400 hover:text-white text-sm">
                  Shipping Policy
                </Link>
                <Link href="/privacy" className="block text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </Link>
                <Link href="/account-deletion" className="block text-gray-400 hover:text-white text-sm">
                  Account Deletion Request
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2025 ToolsPro.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
