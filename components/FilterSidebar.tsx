"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useFilter } from "@/context/filter-context"

interface FilterSidebarProps {
  className?: string
}

export default function FilterSidebar({ className }: FilterSidebarProps) {
  const { filters, updateFilter, clearFilters, getFilterCounts } = useFilter()
  const counts = getFilterCounts()

  // Filter options with dynamic counts
  const availabilityOptions = [
    { label: "In stock", count: counts.availability["in-stock"] || 0, value: "in-stock" },
    { label: "Out of stock", count: counts.availability["out-of-stock"] || 0, value: "out-of-stock" },
  ]

  const productTypeOptions = [
    { label: "Pressure Washer", count: counts.productTypes["pressure-washer"] || 0, value: "pressure-washer" },
    { label: "Drill", count: counts.productTypes["drill"] || 0, value: "drill" },
    { label: "Hammer", count: counts.productTypes["hammer"] || 0, value: "hammer" },
    { label: "Screwdriver", count: counts.productTypes["screwdriver"] || 0, value: "screwdriver" },
    { label: "Grinder", count: counts.productTypes["grinder"] || 0, value: "grinder" },
  ]

  const brandOptions = [
    { label: "Einhell", count: counts.brands["einhell"] || 0, value: "einhell" },
    { label: "Karcher", count: counts.brands["karcher"] || 0, value: "karcher" },
    { label: "Silverline", count: counts.brands["silverline"] || 0, value: "silverline" },
    { label: "Stayer", count: counts.brands["stayer"] || 0, value: "stayer" },
    { label: "Total Tools", count: counts.brands["total tools"] || 0, value: "total tools" },
    { label: "Wadfow", count: counts.brands["wadfow"] || 0, value: "wadfow" },
    { label: "Ingco", count: counts.brands["ingco"] || 0, value: "ingco" },
    { label: "Bosch", count: counts.brands["bosch"] || 0, value: "bosch" },
  ]

  // Event handlers
  const handleAvailabilityChange = (value: string, checked: boolean) => {
    const newAvailability = checked
      ? [...filters.availability, value]
      : filters.availability.filter((item) => item !== value)
    updateFilter("availability", newAvailability)
  }

  const handleProductTypeChange = (value: string, checked: boolean) => {
    const newProductTypes = checked
      ? [...filters.productTypes, value]
      : filters.productTypes.filter((item) => item !== value)
    updateFilter("productTypes", newProductTypes)
  }

  const handleBrandChange = (value: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, value]
      : filters.brands.filter((item) => item !== value)
    updateFilter("brands", newBrands)
  }

  const handlePriceRangeChange = (value: [number, number]) => {
    updateFilter("priceRange", value)
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value)
    const newRange: [number, number] = [newMin, filters.priceRange[1]]
    updateFilter("priceRange", newRange)
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value)
    const newRange: [number, number] = [filters.priceRange[0], newMax]
    updateFilter("priceRange", newRange)
  }

  const hasActiveFilters =
    filters.availability.length > 0 ||
    filters.productTypes.length > 0 ||
    filters.brands.length > 0 ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 300000

  return (
    <div className={`bg-white p-6 rounded-none h-full overflow-y-auto scrollbar-hide sticky top-4 ${className || ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-light text-gray-800">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}  
            className="text-xs font-light text-blue-600 hover:text-blue-800 p-0 h-auto"
          >
            Clear all
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["availability", "product-type", "price", "brand"]} className="w-full">
        <AccordionItem value="availability">
          <AccordionTrigger className="text-xs font-light text-gray-800 hover:no-underline">
            Availability
            <span className="text-gray-500 text-xs font-light ml-2">
              ({availabilityOptions.reduce((sum, opt) => sum + opt.count, 0)})
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="space-y-3">
              {availabilityOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <Checkbox
                    id={`availability-${option.value}`}
                    className="h-4 w-4"
                    checked={filters.availability.includes(option.value)}
                    onCheckedChange={(checked) => handleAvailabilityChange(option.value, checked as boolean)}
                  />
                  <label
                    htmlFor={`availability-${option.value}`}
                    className="text-xs font-light text-gray-700 cursor-pointer"
                  >
                    {option.label} ({option.count})
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="product-type">
          <AccordionTrigger className="text-xs font-light text-gray-800 hover:no-underline">
            Product Type
            <span className="text-gray-500 text-xs font-light ml-2">
              ({productTypeOptions.reduce((sum, opt) => sum + opt.count, 0)})
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="space-y-3">
              {productTypeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <Checkbox
                    id={`product-type-${option.value}`}
                    className="h-4 w-4"
                    checked={filters.productTypes.includes(option.value)}
                    onCheckedChange={(checked) => handleProductTypeChange(option.value, checked as boolean)}
                  />
                  <label
                    htmlFor={`product-type-${option.value}`}
                    className="text-xs font-light text-gray-700 cursor-pointer"
                  >
                    {option.label} ({option.count})
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-xs font-light text-gray-800 hover:no-underline">Price</AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="flex items-center gap-3 mb-4">
              <Input
                type="number"
                value={filters.priceRange[0]}
                onChange={handleMinPriceChange}
                className="w-full text-xs font-light border-gray-300 focus:border-gray-500 focus:ring-0"
                placeholder="Min"
              />
              <span className="text-gray-500 text-xs font-light">-</span>
              <Input
                type="number"
                value={filters.priceRange[1]}
                onChange={handleMaxPriceChange}
                className="w-full text-xs font-light border-gray-300 focus:border-gray-500 focus:ring-0"
                placeholder="Max"
              />
            </div>
            <Slider
              min={0}
              max={300000}
              step={100}
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onValueChange={handlePriceRangeChange}
              className="w-full"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-xs font-light text-gray-800 hover:no-underline">
            Brand
            <span className="text-gray-500 text-xs font-light ml-2">
              ({brandOptions.reduce((sum, opt) => sum + opt.count, 0)})
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="space-y-3">
              {brandOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <Checkbox
                    id={`brand-${option.value}`}
                    className="h-4 w-4"
                    checked={filters.brands.includes(option.value)}
                    onCheckedChange={(checked) => handleBrandChange(option.value, checked as boolean)}
                  />
                  <label htmlFor={`brand-${option.value}`} className="text-xs font-light text-gray-700 cursor-pointer">
                    {option.label} ({option.count})
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}