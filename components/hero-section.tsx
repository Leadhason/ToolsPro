import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              Shop Ghana's #1 for Tools & Building Materials
            </h1>
            <p className="text-lg sm:text-xl text-blue-100">5+ Years of Consistent, Reliable Supply Nationwide</p>
            <p className="text-base sm:text-lg text-blue-200">
              Trusted by 60,000+ Ghanaians | 75,000+ Orders Delivered
            </p>
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 w-full sm:w-auto">
              Shop Our Top Sellers
            </Button>
          </div>
          <div className="relative order-first lg:order-last">
            <Image
              src="/images/hero-workers.png"
              alt="Professional workers with tools"
              width={600}
              height={400}
              className="rounded-lg w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Trust indicators */}
      <div className="bg-white text-gray-800 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-xl sm:text-2xl font-bold text-yellow-500">4.5</span>
              <div className="flex text-yellow-500">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className={`text-sm sm:text-base ${i < 4 ? "text-yellow-500" : "text-gray-300"}`}>
                    {star}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-blue-600 underline text-sm sm:text-base">
              4.5 out of 5 stars based on 879 reviews
            </span>
            <span className="text-green-600 font-semibold text-sm sm:text-base">✓ Verified</span>
          </div>
        </div>
      </div>
    </section>
  )
}
