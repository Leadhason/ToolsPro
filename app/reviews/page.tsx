import { Header } from "@/components/header"
import Footer from "@/components/Footer"
import { Star, CheckCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const reviews = [
  {
    id: 1,
    product: "Decakila 1.8L Stainless Steel Electric Kettle 1500W - KEKT031M",
    rating: 4,
    date: "08/27/2025",
    author: "Ruth Ann",
    verified: true,
    content: "Great kettle, heats water quickly and efficiently.",
    productImage: "/stainless-steel-electric-kettle.png",
    supplyMasterReply: {
      content:
        "Hi Ruth Ann, thank you for taking the time to leave a review for our Decakila 1.8L Stainless Steel Electric Kettle. We are excited to hear that you had a positive experience with us and that our delivery was fast. We strive to provide efficient and timely service to all of our customers. Thank you for choosing Supply Master! Have a great day!",
      date: "08/28/2025",
    },
  },
  {
    id: 2,
    product: "Decakila Triple Burner Gas Stove - KMGS009B",
    rating: 3,
    date: "08/27/2025",
    author: "OWUSU RICHMOND",
    verified: true,
    content: "Nice\nBut yet to use",
    productImage: "/triple-burner-gas-stove-black.png",
    supplyMasterReply: {
      content:
        "Thank you for your review, Osei! We're glad to hear that you find our Decakila Double Hot Plate to be very nice and good for cooking. Happy cooking!",
      date: "08/28/2025",
    },
  },
  {
    id: 3,
    product: "Wadlow Safety Goggles - WSG2801",
    rating: 5,
    date: "08/25/2025",
    author: "Rollie Khay",
    verified: true,
    content: "Safety goggles\nFantastic PPE that help me during working",
    productImage: "/safety-goggles-clear-with-blue-straps.png",
    supplyMasterReply: {
      content:
        "Hi Rollie! Thank you for your positive review of our Wadlow Safety Goggles. We're so glad to hear that they have been a great help to you during your work. Your safety is our top priority and we're happy to provide you with reliable PPE. Thank you for choosing Supply Master! Stay safe.",
      date: "08/26/2025",
    },
  },
  {
    id: 4,
    product: "Akfix Waterguard Acrylic Waterproofing Membrane - EM600",
    rating: 5,
    date: "08/24/2025",
    author: "Michael Kwofie Keelson",
    verified: true,
    content: "Good\nDelivery was fast",
    productImage: "/waterproofing-membrane-bucket-white.png",
    supplyMasterReply: {
      content:
        "Hi Michael, thank you for taking the time to leave a review for our Akfix Waterguard Acrylic Waterproofing Membrane. We are excited to hear that you had a positive experience with us and that our delivery was fast. We strive to provide efficient and timely service to all of our customers. Thank you for choosing Supply Master! Have a great day!",
      date: "08/25/2025",
    },
  },
  {
    id: 5,
    product: "Decakila Double Hot Plate 2000W - KECC002B",
    rating: 5,
    date: "08/24/2025",
    author: "Osei Evans",
    verified: true,
    content: "Very nice and very good for cooking",
    productImage: "/double-hot-plate-black-electric-cooktop.png",
    supplyMasterReply: {
      content:
        "Thank you for your review, Osei! We're glad to hear that you find our Decakila Double Hot Plate to be very nice and good for cooking. Happy cooking!",
      date: "08/25/2025",
    },
  },
  {
    id: 6,
    product: "Kumtel Digital Scale 260x260mm - HDB 02 HDB 03",
    rating: 5,
    date: "08/22/2025",
    author: "LERA KATIMBA",
    verified: true,
    content: "Kumtel Digital Scale 260x260mm - HDB 02 HDB 03",
    productImage: "/digital-scale-black-with-blue-display.png",
  },
]

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">EDMAX Customer Reviews</h1>
          <p className="text-lg text-gray-600 mb-8">
            See what our customers say about their EDMAX shopping experience
          </p>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Experience a symphony of customer satisfaction at Supply Master! Explore glowing reviews showcasing our
            top-tier tools, superior building materials, and reliable hardware solutions. Join countless patrons on
            their exceptional journey with us.
          </p>
        </div>

        <div className="flex gap-12 items-start mb-12">
          {/* Rating summary */}
          <div className="w-80">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />
              </div>
              <span className="text-lg font-medium">4.53 out of 5</span>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-gray-600">Based on 910 reviews</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>

            {/* Rating breakdown */}
            <div className="space-y-2 mb-8">
              {[
                { stars: 5, count: 619, width: "75%" },
                { stars: 4, count: 197, width: "24%" },
                { stars: 3, count: 64, width: "8%" },
                { stars: 2, count: 13, width: "2%" },
                { stars: 1, count: 17, width: "2%" },
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < item.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-600 h-2 rounded-full" style={{ width: item.width }}></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Write review button */}
          <div className="flex-1 flex justify-end">
            <Button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full">
              Write a Store Review
            </Button>
          </div>
        </div>

        {/* Review tabs */}
        <div className="flex gap-4 mb-6">
          <Button variant="secondary" className="bg-gray-200 text-gray-800 rounded-full px-6">
            Product Reviews (901)
          </Button>
          <Button variant="ghost" className="text-gray-600 underline hover:no-underline">
            Shop Reviews (9)
          </Button>
        </div>

        {/* Sort dropdown */}
        <div className="mb-8">
          <select className="border rounded px-3 py-2 text-sm bg-white">
            <option>Most Recent</option>
            <option>Highest Rated</option>
            <option>Lowest Rated</option>
          </select>
        </div>

        {/* Reviews list */}
        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-8">
              <div className="flex gap-6">
                {/* Product image */}
                <div className="w-48 h-48 flex-shrink-0">
                  <Image
                    src={review.productImage || "/placeholder.svg"}
                    alt={review.product}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Review content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2">
                        about <span className="text-blue-600 underline">{review.product}</span>
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-800">{review.author}</span>
                        {review.verified && (
                          <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Verified</span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-700 whitespace-pre-line">{review.content}</p>
                  </div>

                  {/* Supply Master Reply */}
                  {review.supplyMasterReply && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-800">&gt;&gt; Supply Master</span>
                        <span className="text-xs text-gray-500">replied:</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{review.supplyMasterReply.content}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
