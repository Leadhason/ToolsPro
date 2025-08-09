import Image from "next/image"
import type { Category } from "@/lib/data"

interface CategoryHeroProps {
  category: Category
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <section className="relative bg-gray-100 py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="lg:w-2/3 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              {category.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto lg:mx-0">
              {category.bannerDescription || category.description}
            </p>
          </div>
          <div className="lg:w-1/3 flex justify-center lg:justify-end">
            {category.bannerImage && (
              <Image
                src={category.bannerImage || "/placeholder.svg"}
                alt={category.name}
                width={500}
                height={350}
                className="rounded-lg shadow-lg object-cover max-h-[250px] sm:max-h-[300px] lg:max-h-[350px] w-full lg:w-auto transform transition-transform duration-500 hover:scale-105"
              />
            )}
          </div>
        </div>
      </div>
      {/* Subtle background pattern or shape for modern feel */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="pattern-circles" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="#d1d5db" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </div>
    </section>
  )
}
