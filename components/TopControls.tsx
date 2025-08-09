"use client"

import { Filter, LayoutGrid, List, ToggleLeft, ToggleRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

export default function TopControls() {
  const [isCompareActive, setIsCompareActive] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // 'grid' or 'list'

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-gray-200 mb-6">
      {/* Filter button (for mobile/tablet sidebar toggle) */}
      <Button
        variant="outline"
        className="lg:hidden flex items-center gap-2 text-gray-700 hover:bg-gray-100 bg-transparent"
      >
        <Filter className="h-4 w-4" />
        Filter
      </Button>

      {/* Sort by dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-1 text-gray-800 hover:bg-gray-100 bg-transparent"
            >
              Featured <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Featured</DropdownMenuItem>
            <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
            <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
            <DropdownMenuItem>Newest Arrivals</DropdownMenuItem>
            <DropdownMenuItem>Top Rated</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Compare toggle and View as */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Compare</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCompareActive(!isCompareActive)}
            className="p-0 h-auto w-auto"
          >
            {isCompareActive ? (
              <ToggleRight className="h-6 w-6 text-blue-600" />
            ) : (
              <ToggleLeft className="h-6 w-6 text-gray-400" />
            )}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">View as</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "text-gray-900 bg-gray-100" : "text-gray-400 hover:bg-gray-50"}
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "text-gray-900 bg-gray-100" : "text-gray-400 hover:bg-gray-50"}
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
