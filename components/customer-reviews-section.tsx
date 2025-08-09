import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CustomerReviewsSection() {
  return (
    <div className="border rounded-lg p-6 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex text-yellow-400">
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6" />
          <Star className="w-6 h-6 text-gray-300" />
        </div>
        <p className="text-gray-700">Be the first to write a review</p>
      </div>
      <Button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-md">Write a review</Button>
    </div>
  )
}
