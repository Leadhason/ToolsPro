import Image from "next/image"
import { getBrands } from "@/lib/data"

export default async function PopularBrands() {
  const brands = await getBrands()

  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Popular Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
          {brands.map((brand) => (
            <div key={brand.id} className="bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={120}
                height={60}
                className="h-8 sm:h-10 lg:h-12 w-auto object-contain mx-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
