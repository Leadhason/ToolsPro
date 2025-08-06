import { Button } from "@/components/ui/button"

export default function HeroSection() {
return (
  <section 
    className="relative text-white min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: "url('/Hero-image.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}
  >
    {/* Dark overlay for better text readability */}
    <div className="absolute inset-0 bg-black/50 z-10"></div>

    <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
      <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-8">
        Shop Ghana's #1 for Tools & Building Materials
      </h1>
      <p className="text-lg font-light sm:text-xl mb-6 text-gray-100">
        5+ Years of Consistent, Reliable Supply Nationwide
      </p>
      <p className="text-md font-bold sm:text-lg mb-8 text-gray-200">
        Trusted by 60,000+ Ghanaians | 75,000+ Orders Delivered
      </p>
      <Button size="lg" className="bg-white text-black hover:bg-gray-300 p-4 text-md cursor-pointer">
        Shop Our Top Sellers
      </Button>
    </div>

    {/* Trust indicators */}
    <div className="absolute z-20 bottom-0 bg-transparent text-gray-800 py-3 sm:py-4">
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
          <span className="text-yellow-600 font-semibold text-sm sm:text-base">✓ Verified</span>
        </div>
      </div>
    </div>
  </section>
)
}
