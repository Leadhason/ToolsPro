'use client'

import FilterSection from "./FilterSection"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider" // Assuming you have a Slider component
import { useState } from "react"

export default function FilterSidebar() {
// Mock data for filters - replace with actual data fetching/state management
const availabilityOptions = [
  { label: "In stock", count: 45, value: "in-stock" },
  { label: "Out of stock", count: 2, value: "out-of-stock" },
]

const productTypeOptions = [
  { label: "Pressure Washer", count: 47, value: "pressure-washer" },
  { label: "Drill", count: 15, value: "drill" },
  { label: "Hammer", count: 10, value: "hammer" },
]

const brandOptions = [
  { label: "Einhell", count: 3, value: "einhell" },
  { label: "Karcher", count: 32, value: "karcher" },
  { label: "Silverline", count: 1, value: "silverline" },
  { label: "Stayer", count: 5, value: "stayer" },
  { label: "Total", count: 5, value: "total" },
  { label: "Wadfow", count: 1, value: "wadfow" },
]

const [priceRange, setPriceRange] = useState<[number, number]>([0, 294330])

return (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-xl font-bold mb-4">Filter</h2>

    <FilterSection title="Availability" count={availabilityOptions.reduce((sum, opt) => sum + opt.count, 0)}>
      {availabilityOptions.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox id={`availability-${option.value}`} />
          <label htmlFor={`availability-${option.value}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label} ({option.count})
          </label>
        </div>
      ))}
    </FilterSection>

    <FilterSection title="Product type" count={productTypeOptions.reduce((sum, opt) => sum + opt.count, 0)}>
      {productTypeOptions.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox id={`product-type-${option.value}`} />
          <label htmlFor={`product-type-${option.value}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label} ({option.count})
          </label>
        </div>
      ))}
    </FilterSection>

    <FilterSection title="Price">
      <div className="flex items-center gap-2 mb-4">
        <Input
          type="number"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          className="w-24 text-sm"
          prefix="GH₵"
        />
        <span className="text-gray-500">-</span>
        <Input
          type="number"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-24 text-sm"
          prefix="GH₵"
        />
      </div>
      {/* Assuming a Slider component from shadcn/ui or similar */}
      {/* <Slider
        min={0}
        max={300000}
        step={100}
        value={priceRange}
        onValueChange={(value: [number, number]) => setPriceRange(value)}
        className="w-full"
      /> */}
    </FilterSection>

    <FilterSection title="Brand" count={brandOptions.reduce((sum, opt) => sum + opt.count, 0)}>
      {brandOptions.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox id={`brand-${option.value}`} />
          <label htmlFor={`brand-${option.value}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {option.label} ({option.count})
          </label>
        </div>
      ))}
    </FilterSection>
  </div>
)
}
