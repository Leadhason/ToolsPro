import Image from "next/image"
import type { Category } from "@/lib/data"
import { getPublicImageUrl } from "@/lib/supabase/image-utils"; // Import getPublicImageUrl

interface CategoryHeroProps {
  category: Category
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <section className="relative my-10 bg-black py-2 sm:py-4 lg:py-6 overflow-hidden mx-8 rounded-2xl">
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8  lg:gap-16">
          <div className="lg:w-2/3 text-center lg:text-left">
            <h1 className="text-xl sm:text-lg lg:text-xl font-bold text-gray-900 mb-4 leading-tight">
              {category.name}
            </h1>
            <p className="text-medium font-light text-white max-w-2xl mx-auto lg:mx-0">
              {category.bannerDescription || category.description}
            </p>
          </div>
          <div className="lg:w-1/3 h-full flex justify-end">
            {category.bannerImage && (
              <Image
                src={getPublicImageUrl(category.bannerImage || "placeholder.svg", "Category_Images")}
                alt={category.name}
                width={500}
                height={350}
                className="rounded-lg shadow-lg object-cover min-h-full sm:max-h-[300px] lg:min-h-full w-full lg:w-auto transform transition-transform duration-500 hover:scale-105"
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
