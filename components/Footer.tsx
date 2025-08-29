import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <>
      {/* Support Links Section */}
      <section className="bg-gray-50 py-6">
        <div className="text-center">
          <Link href="#" className="font-light text-xs hover:underline">
            Back to top
          </Link>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-[#003561] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center justify-center gap-1 bg-white border border-gray-300 rounded-md p-2 mb-6">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <img 
                    src="/EDMAX.png" 
                    alt="EDMAX Logo" 
                    className="h-12 w-auto"
                  />
                </div>
                <div className="flex flex-col -mt-4">
                  <span className="text-sm font-medium leading-tight">EDMAX</span>
                  <span className="text-xs font-light text-gray-400 leading-tight">Tools and Power Technologies</span>
                </div>
              </div>
              <h3 className="font-medium text-sm mb-2">You Build, We Deliver</h3>
              <p className="text-gray-400 text-xs mb-6">
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
              <h3 className="font-medium text-sm mb-4">Get to Know Us</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-white text-xs font-light">
                  About
                </Link>
                <Link href="/divisions" className="block text-gray-400 hover:text-white text-xs font-light">
                  Divisions
                </Link>
                <Link href="/sell" className="block text-gray-400 hover:text-white text-xs font-light">
                  Sell on EDMAX
                </Link>
                <Link href="/payment" className="block text-gray-400 hover:text-white text-xs font-light">
                  Buy Now, Pay Later
                </Link>
                <Link href="/blog" className="block text-gray-400 hover:text-white text-xs font-light">
                  Blog
                </Link>
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <h3 className="font-medium text-sm mb-4">Product Categories</h3>
              <div className="space-y-2">
                <Link href="/category/tools" className="block text-gray-400 hover:text-white text-xs font-light">
                  Tools
                </Link>
                <Link
                  href="/category/outdoor-equipment"
                  className="block text-gray-400 hover:text-white text-xs font-light"
                >
                  Outdoor Equipment
                </Link>
                <Link
                  href="/category/building-materials"
                  className="block text-gray-400 hover:text-white text-xs font-light"
                >
                  Building Materials
                </Link>
                <Link
                  href="/category/home-essentials"
                  className="block text-gray-400 hover:text-white text-xs font-light"
                >
                  Home Essentials & Decor
                </Link>
                <Link href="/collections" className="block text-gray-400 hover:text-white text-xs font-light">
                  All collections
                </Link>
              </div>
            </div>

            {/* Customer Support */}
            <div>
              <h3 className="font-medium text-sm mb-4">Customer Support & Policies</h3>
              <div className="space-y-2">
                <Link href="/contact" className="block text-gray-400 hover:text-white text-xs font-light">
                  Contact Us
                </Link>
                <Link href="/returns" className="block text-gray-400 hover:text-white text-xs font-light">
                  Request Return
                </Link>
                <Link href="/faq" className="block text-gray-400 hover:text-white text-xs font-light">
                  FAQ
                </Link>
                <Link href="/return-policy" className="block text-gray-400 hover:text-white text-xs font-light">
                  Return & Refund Policy
                </Link>
                <Link href="/shipping" className="block text-gray-400 hover:text-white text-xs font-light">
                  Shipping Policy
                </Link>
                <Link href="/privacy" className="block text-gray-400 hover:text-white text-xs font-light">
                  Privacy Policy
                </Link>
                <Link href="/account-deletion" className="block text-gray-400 hover:text-white text-xs font-light">
                  Account Deletion Request
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-xs font-light">© 2025 EDMAX.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
