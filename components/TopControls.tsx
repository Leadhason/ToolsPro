"use client"

import { Filter, LayoutGrid, List, ToggleLeft, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useFilter } from "@/context/filter-context"

interface TopControlsProps {
  onMobileFilterToggle?: () => void
  productCount?: number
}

export default function TopControls({ onMobileFilterToggle, productCount = 0 }: TopControlsProps) {
  const { filters, updateFilter } = useFilter()

  const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price-low-high" },
    { label: "Price: High to Low", value: "price-high-low" },
    { label: "Newest Arrivals", value: "newest" },
    { label: "Top Rated", value: "rating" },
  ]

  const currentSortLabel = sortOptions.find((option) => option.value === filters.sortBy)?.label || "Featured"

  return (
    <div className="flex flex-wrap p-3 mt-3 items-center justify-between gap-4 py-4 border-b border-gray-200 mb-6">
      {/* Filter button and product count */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onMobileFilterToggle}
          className="lg:hidden flex items-center outline-none gap-2 text-gray-700 hover:bg-gray-100 bg-transparent"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>

        <span className="text-xs font-light text-gray-600">
          {productCount} {productCount === 1 ? "product" : "products"} found
        </span>
      </div>

      {/* Compare toggle and View as */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-600">View as</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => updateFilter("viewMode", "grid")}
            className={filters.viewMode === "grid" ? "text-gray-900 bg-gray-100" : "text-gray-400 hover:bg-gray-50"}
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => updateFilter("viewMode", "list")}
            className={filters.viewMode === "list" ? "text-gray-900 bg-gray-100" : "text-gray-400 hover:bg-gray-50"}
          >
            <List className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-light text-gray-600">Compare</span>
          <Button variant="ghost" size="icon" className="p-0 h-auto w-auto">
            <ToggleLeft className="h-6 w-6 text-gray-400" />
          </Button>
        </div>
      </div>

      {/* Sort by dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-600">Sort by:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-gray-800 hover:bg-gray-100 bg-transparent text-xs font-light"
            >
              {currentSortLabel} <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => updateFilter("sortBy", option.value)}
                className={filters.sortBy === option.value ? "bg-gray-100" : ""}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
