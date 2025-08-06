"use client"

import { Button } from "@/components/ui/button"

export default function SMClubButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-gray-800 rounded-sm"></div>
          </div>
          <span className="text-sm font-medium">SM Club</span>
        </div>
      </Button>
    </div>
  )
}
