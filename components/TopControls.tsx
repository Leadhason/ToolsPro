"use client"

import { Filter, LayoutGrid, List, ToggleLeft, ChevronDown, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { useProductFilters } from "@/context/filter-context"; // Renamed import
import { useCompare } from "@/context/compare-context"; // Import useCompare hook

interface TopControlsProps {
  onMobileFilterToggle?: () => void
  onFilterToggle?: () => void
  showFilters?: boolean
  productCount?: number
}

export default function TopControls({ onMobileFilterToggle, onFilterToggle, showFilters = true, productCount }: TopControlsProps) {
  const { filters, updateFilter, filteredProducts } = useProductFilters()
  const { isCompareEnabled, toggleCompare } = useCompare(); // Get isCompareEnabled and toggleCompare from context
  
  // Use filtered product count if not provided
  const displayCount = productCount ?? filteredProducts.length
  
  const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price-low-high" },
    { label: "Price: High to Low", value: "price-high-low" },
    { label: "Newest Arrivals", value: "newest" },
    { label: "Top Rated", value: "rating" },
    { label: "Alphabetical", value: "alphabetical" },
  ]

  const currentSortLabel = sortOptions.find(option => option.value === filters.sortBy)?.label || "Featured"

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      {/* Left side - Filter buttons */}
      <div className="flex items-center gap-4">
        {/* Desktop Filter Toggle */}
        <Button
          variant="outline"
          onClick={onFilterToggle}
          className={`hidden lg:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-xs font-light hover:bg-gray-50 transition-colors ${
            showFilters ? "bg-gray-100 text-gray-900" : "text-gray-700"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>

        {/* Mobile Filter Toggle */}
        <Button
          variant="outline"
          onClick={onMobileFilterToggle}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-xs font-light hover:bg-gray-50 lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </Button>
        
        {/* Product count */}
        <span className="text-xs font-light text-gray-600">
          {displayCount} {displayCount === 1 ? "product" : "products"} found
        </span>
      </div>

      {/* Right side - Sort, Compare, View controls */}
      <div className="flex items-center gap-6">
        {/* Sort by */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-light text-gray-600">Sort by</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-3 py-2 text-xs font-light text-gray-700 hover:bg-gray-50 rounded-md"
              >
                {currentSortLabel} 
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => updateFilter("sortBy", option.value)}
                  className={filters.sortBy === option.value ? "bg-gray-100 font-medium" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Compare toggle */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-light text-gray-600">Compare</span>
          <Switch 
            checked={isCompareEnabled}
            onCheckedChange={toggleCompare}
            className="data-[state=checked]:bg-[#003561]" // Updated to brand color
          />
        </div>

        {/* View as */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-light text-gray-600">View as</span>
          <div className="flex items-center border border-gray-300 rounded-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateFilter("viewMode", "list")}
              className={`px-2 py-1 rounded-l-md rounded-r-none border-r border-gray-300 ${
                filters.viewMode === "list" 
                  ? "bg-gray-100 text-gray-900" 
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateFilter("viewMode", "grid")}
              className={`px-2 py-1 rounded-r-md rounded-l-none ${
                filters.viewMode === "grid" 
                  ? "bg-gray-100 text-gray-900" 
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
