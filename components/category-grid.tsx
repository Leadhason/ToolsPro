import Image from "next/image"
import { Button } from "@/components/ui/button"

const categoryCards = [
  {
    id: "best-deals",
    title: "Best Deals",
    image: "/placeholder.svg?height=400&width=600&text=Best+Deals",
    buttonText: "Best Deals",
    buttonColor: "bg-red-500 hover:bg-red-600",
    href: "/deals",
  },
  {
    id: "outdoor-equipment",
    title: "Outdoor Equipment",
    subtitle: "Water Pumps, Generators & More...",
    image: "/placeholder.svg?height=400&width=600&text=Outdoor+Equipment",
    buttonText: "Shop Now",
    buttonColor: "bg-red-500 hover:bg-red-600",
    href: "/category/outdoor-equipment",
  },
  {
    id: "building-materials",
    title: "Building Materials",
    subtitle: "Plumbing, Electricals & More...",
    image: "/placeholder.svg?height=400&width=600&text=Building+Materials",
    buttonText: "Explore More",
    buttonColor: "bg-red-500 hover:bg-red-600",
    href: "/category/building-materials",
  },
  {
    id: "hand-power-tools",
    title: "Hand & Power Tools",
    subtitle: "Drills, Grinders & More...",
    image: "/placeholder.svg?height=400&width=600&text=Hand+Power+Tools",
    buttonText: "Best Deals",
    buttonColor: "bg-red-500 hover:bg-red-600",
    href: "/category/tools",
  },
  {
    id: "home-essentials",
    title: "Home Essentials & Decor",
    subtitle: "Bath, Kitchen, Lighting & More...",
    image: "/placeholder.svg?height=400&width=600&text=Home+Essentials",
    buttonText: "Shop the Collection",
    buttonColor: "bg-red-500 hover:bg-red-600",
    href: "/category/home-essentials",
  },
]

export default function CategoryGrid() {
  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Mobile: Stack all cards vertically */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Best Deals - Large card on desktop, normal on mobile */}
          <div className="lg:row-span-2 relative group overflow-hidden rounded-lg">
            <Image
              src={categoryCards[0].image || "/placeholder.svg"}
              alt={categoryCards[0].title}
              width={600}
              height={800}
              className="w-full h-48 sm:h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
              <Button
                className={`${categoryCards[0].buttonColor} text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 font-semibold text-sm sm:text-base`}
              >
                {categoryCards[0].buttonText}
              </Button>
            </div>
          </div>

          {/* Other category cards */}
          {categoryCards.slice(1).map((card, index) => (
            <div key={card.id} className="relative group overflow-hidden rounded-lg">
              <Image
                src={card.image || "/placeholder.svg"}
                alt={card.title}
                width={600}
                height={400}
                className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-1">{card.title}</h3>
                <p className="text-xs sm:text-sm mb-2 sm:mb-3 underline">{card.subtitle}</p>
                <Button className={`${card.buttonColor} text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm`}>
                  {card.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
