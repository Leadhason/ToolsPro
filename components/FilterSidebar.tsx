"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useFilter } from "@/context/filter-context"
import type { Product } from "@/lib/data"

interface FilterSidebarProps {
  allProducts?: Product[]
}

export default function FilterSidebar({ allProducts = [] }: FilterSidebarProps) {
  const { filters, updateFilter, clearFilters, isLoading } = useFilter()
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(filters.priceRange)

  // Update local price range when filters change
  useEffect(() => {
    setLocalPriceRange(filters.priceRange)
  }, [filters.priceRange])

  // Calculate dynamic counts based on current filters (excluding the current filter being counted)
  const getAvailabilityCount = (value: string) => {
    const otherFilters = { ...filters, availability: [] }
    let filtered = allProducts

    if (otherFilters.productTypes.length > 0) {
      filtered = filtered.filter((product) =>
        otherFilters.productTypes.some((type) =>
          product.name.toLowerCase().includes(type.toLowerCase().replace("-", " ")),
        ),
      )
    }
    if (otherFilters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        otherFilters.brands.some((brand) => product.brand.toLowerCase() === brand.toLowerCase()),
      )
    }
    filtered = filtered.filter(
      (product) => product.price >= otherFilters.priceRange[0] && product.price <= otherFilters.priceRange[1],
    )

    if (value === "in-stock") return filtered.filter((p) => p.inStock).length
    if (value === "out-of-stock") return filtered.filter((p) => !p.inStock).length
    return 0
  }

  const getProductTypeCount = (value: string) => {
    const otherFilters = { ...filters, productTypes: [] }
    let filtered = allProducts

    if (otherFilters.availability.length > 0) {
      filtered = filtered.filter((product) => {
        if (otherFilters.availability.includes("in-stock")) return product.inStock
        if (otherFilters.availability.includes("out-of-stock")) return !product.inStock
        return true
      })
    }
    if (otherFilters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        otherFilters.brands.some((brand) => product.brand.toLowerCase() === brand.toLowerCase()),
      )
    }
    filtered = filtered.filter(
      (product) => product.price >= otherFilters.priceRange[0] && product.price <= otherFilters.priceRange[1],
    )

    return filtered.filter((product) => product.name.toLowerCase().includes(value.toLowerCase().replace("-", " ")))
      .length
  }

  const getBrandCount = (value: string) => {
    const otherFilters = { ...filters, brands: [] }
    let filtered = allProducts

    if (otherFilters.availability.length > 0) {
      filtered = filtered.filter((product) => {
        if (otherFilters.availability.includes("in-stock")) return product.inStock
        if (otherFilters.availability.includes("out-of-stock")) return !product.inStock
        return true
      })
    }
    if (otherFilters.productTypes.length > 0) {
      filtered = filtered.filter((product) =>
        otherFilters.productTypes.some((type) =>
          product.name.toLowerCase().includes(type.toLowerCase().replace("-", " ")),
        ),
      )
    }
    filtered = filtered.filter(
      (product) => product.price >= otherFilters.priceRange[0] && product.price <= otherFilters.priceRange[1],
    )

    return filtered.filter((product) => product.brand.toLowerCase() === value.toLowerCase()).length
  }

  const availabilityOptions = [
    { label: "In stock", count: getAvailabilityCount("in-stock"), value: "in-stock" },
    { label: "Out of stock", count: getAvailabilityCount("out-of-stock"), value: "out-of-stock" },
  ]

  const productTypeOptions = [
    { label: "Pressure Washer", count: getProductTypeCount("pressure-washer"), value: "pressure-washer" },
    { label: "Drill", count: getProductTypeCount("drill"), value: "drill" },
    { label: "Hammer", count: getProductTypeCount("hammer"), value: "hammer" },
    { label: "Screwdriver", count: getProductTypeCount("screwdriver"), value: "screwdriver" },
    { label: "Grinder", count: getProductTypeCount("grinder"), value: "grinder" },
  ]

  const brandOptions = [
    { label: "Einhell", count: getBrandCount("einhell"), value: "einhell" },
    { label: "Karcher", count: getBrandCount("karcher"), value: "karcher" },
    { label: "Silverline", count: getBrandCount("silverline"), value: "silverline" },
    { label: "Stayer", count: getBrandCount("stayer"), value: "stayer" },
    { label: "Total Tools", count: getBrandCount("total tools"), value: "total tools" },
    { label: "Wadfow", count: getBrandCount("wadfow"), value: "wadfow" },
    { label: "Ingco", count: getBrandCount("ingco"), value: "ingco" },
    { label: "Bosch", count: getBrandCount("bosch"), value: "bosch" },
  ]

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
    const newBrands = checked ? [...filters.brands, value] : filters.brands.filter((item) => item !== value)
    updateFilter("brands", newBrands)
  }

  const handlePriceRangeChange = (value: [number, number]) => {
    setLocalPriceRange(value)
  }

  const handlePriceRangeCommit = () => {
    updateFilter("priceRange", localPriceRange)
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value)
    const newRange: [number, number] = [newMin, localPriceRange[1]]
    setLocalPriceRange(newRange)
    updateFilter("priceRange", newRange)
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value)
    const newRange: [number, number] = [localPriceRange[0], newMax]
    setLocalPriceRange(newRange)
    updateFilter("priceRange", newRange)
  }

  const hasActiveFilters =
    filters.availability.length > 0 ||
    filters.productTypes.length > 0 ||
    filters.brands.length > 0 ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 300000

  return (
    <div className="bg-white p-6 rounded-none h-full overflow-y-auto scrollbar-hide relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-800">Filters</h3>
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

      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}

      <Accordion type="multiple" defaultValue={["availability", "product-type", "price", "brand"]} className="w-full">
        <AccordionItem value="availability">
          <AccordionTrigger className="text-sm font-medium text-gray-800 hover:no-underline">
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
          <AccordionTrigger className="text-sm font-medium text-gray-800 hover:no-underline">
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
          <AccordionTrigger className="text-sm font-medium text-gray-800 hover:no-underline">Price</AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="flex items-center gap-3 mb-4">
              <Input
                type="number"
                value={localPriceRange[0]}
                onChange={handleMinPriceChange}
                className="w-full text-sm border-gray-300 focus:border-gray-500 focus:ring-0"
                placeholder="Min"
              />
              <span className="text-gray-500">-</span>
              <Input
                type="number"
                value={localPriceRange[1]}
                onChange={handleMaxPriceChange}
                className="w-full text-sm border-gray-300 focus:border-gray-500 focus:ring-0"
                placeholder="Max"
              />
            </div>
            <Slider
              min={0}
              max={300000}
              step={100}
              value={localPriceRange}
              onValueChange={handlePriceRangeChange}
              onValueCommit={handlePriceRangeCommit}
              className="w-full"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-sm font-medium text-gray-800 hover:no-underline">
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
