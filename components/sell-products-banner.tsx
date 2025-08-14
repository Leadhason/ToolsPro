import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SellProductsBanner() {
  return (
    <section className="bg-emerald-900 text-white py-6  mx-6 sm:py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h2 className="text-lg sm:text-xl font-medium mb-1">Sell Your Products on Tools Pro</h2>
          <p className="text-xs sm:text-sm font-light text-gray-300">Become one of our Exclusive Suppliers</p>
        </div>
        <Link href="/signup-supplier">
          <Button className="bg-white text-xs font-medium text-black hover:bg-gray-300 px-6 py-3 rounded-full">
            SIGN UP FOR FREE
          </Button>
        </Link>
      </div>
    </section>
  )
}
