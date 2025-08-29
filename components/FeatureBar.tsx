import { MessageCircle, Undo2, Container, BadgeCheck } from "lucide-react"
import Link from "next/link"

export default function FeaturesBar() {
  return (
    <section className="bg-gray-100 py-4 border border-gray-200 text-black sm:py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <Link href="/support" className="flex flex-col">
              <h3 className="font-medium text-sm">Visit our support center</h3>
              <p className="text-xs font-light text-gray-600">Expert help & advice</p>
            </Link>
          </div>
          <Link href="/top-sellers" className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <BadgeCheck className="w-6 h-6 " />
            </div>
            <div>
              <h3 className="font-medium text-sm">Shop Best Sellers</h3>
              <p className="text-xs font-light text-gray-600">Explore our top-selling products</p>
            </div>
          </Link>
          <Link href="/returns" className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <Undo2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Returns & exchanges</h3>
              <p className="text-xs font-light text-gray-600">All you need to know</p>
            </div>
          </Link>
          <Link href="" className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <Container className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Become our Supplier</h3>
              <p className="text-xs font-light text-gray-600">Sell on EDMAX</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
