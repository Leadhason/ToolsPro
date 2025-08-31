"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Star, CheckCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/data"
import { getReviews } from "@/lib/data"; // Import getReviews function
import { Review } from "@/lib/data"; // Import Review interface
import { useState, useEffect } from "react";

interface ReviewsPageProps {
  // No props needed now that reviews are fetched internally
}

export default function ReviewsPage({}: ReviewsPageProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      const fetchedReviews = await getReviews();
      setReviews(fetchedReviews);
      setLoading(false);
    }
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center text-gray-500">
          Loading reviews...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="relative h-96 bg-gray-300 bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-3xl font-semibold mb-4">EDMAX Customer Reviews</h1>
            <p className="text-base mb-8">
              See what our customers say about their EDMAX shopping experience
            </p>
          </div>
        </div>
        </div>

      <div className="py-16 bg-gray-50 flex flex-col items-center justify-center">
        <div className="container w-full mx-auto px-10 flex flex-col items-center justify-center">
          <div className="flex gap-8 items-center mb-8 flex-col lg:flex-col sm:flex-row">
            {/* Rating summary */}
            <div className="w-80 border-x-1 p-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />
                </div>
                  <span className="text-base font-medium">4.53 out of 5</span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs text-gray-600">Based on 910 reviews</span>
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
                      <span className="text-xs text-gray-600 w-8">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Write review button */}
            <div className="flex-1 flex justify-center mb-8">
                <Button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full text-sm">
                Write a Store Review
              </Button>
            </div>
          </div>

          {/* Review tabs */}
          <div className="flex gap-4 items-center justify-between w-full mb-6  border-b p-2">
            <div className="flex gap-4">
              <Button variant="secondary" className="bg-gray-200 text-gray-800 rounded-full px-6 text-sm">
                Product Reviews (901)
              </Button>
                <Button variant="ghost" className="text-gray-600 underline hover:no-underline text-sm">
                Shop Reviews (9)
              </Button>
            </div>

            {/* Sort dropdown */}
            <div className="">
                <select className="border rounded px-3 py-2 text-xs bg-white">
                <option>Most Recent</option>
                <option>Highest Rated</option>
                <option>Lowest Rated</option>
              </select>
            </div>
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
                          <p className="text-xs text-gray-600 mb-2">
                          about <Link href={`/product/${review.product}`} className="text-blue-600 underline">{review.product}</Link>
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
                            <span className="font-medium text-gray-800 text-sm">{review.author}</span>
                          {review.verified && (
                            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Verified</span>
                          )}
                        </div>
                      </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-700 whitespace-pre-line text-sm">{review.content}</p>
                    </div>

                    {/* Supply Master Reply */}
                    {review.supplyMasterReply && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-gray-800">&gt;&gt; EDMAX</span>
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

      <Footer />
    </div>
  )
}
