import Image from "next/image"
import type { Category } from "@/lib/data"

interface CategoryHeroProps {
  category: Category
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <section className="bg-gray-800 text-white py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
          <div className="lg:w-2/3 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {category.name}
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              {category.bannerDescription || category.description}
            </p>
          </div>
          <div className="lg:w-1/3 flex justify-center lg:justify-end">
            {category.bannerImage && (
              <Image
                src={category.bannerImage || "/placeholder.svg"}
                alt={category.name}
                width={400}
                height={300}
                className="rounded-lg object-cover max-h-[200px] sm:max-h-[250px] lg:max-h-[300px] w-full lg:w-auto"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
