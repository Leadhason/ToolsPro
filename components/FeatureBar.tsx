import { Truck, CreditCard, Clock, Award } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Top-Quality Products",
    description: "Premium tools and materials",
  },
  {
    icon: CreditCard,
    title: "Unbeatable Prices",
    description: "Best value for your money",
  },
  {
    icon: Truck,
    title: "Shop Anytime, Anywhere",
    description: "24/7 online shopping",
  },
  {
    icon: Clock,
    title: "Lightning-Fast Delivery",
    description: "Quick and reliable shipping",
  },
]

export default function FeaturesBar() {
  return (
    <section className="bg-gray-900 text-white py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
              <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm sm:text-base">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
