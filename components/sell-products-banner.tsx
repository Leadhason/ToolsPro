import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SellProductsBanner() {
  return (
    <section className="bg-emerald-900 text-white py-6 sm:py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold mb-1">Sell Your Products on Supply Master</h2>
          <p className="text-sm sm:text-base text-gray-300">Become one of our Exclusive Suppliers</p>
        </div>
        <Link href="/signup-supplier">
          <Button className="bg-white text-black hover:bg-gray-300 px-6 py-3 rounded-md font-semibold">
            SIGN UP FOR FREE
          </Button>
        </Link>
      </div>
    </section>
  )
}
