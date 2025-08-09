"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export default function FilterSidebar() {
  const availabilityOptions = [
    { label: "In stock", count: 45, value: "in-stock" },
    { label: "Out of stock", count: 2, value: "out-of-stock" },
  ]

  const productTypeOptions = [
    { label: "Pressure Washer", count: 47, value: "pressure-washer" },
    { label: "Drill", count: 15, value: "drill" },
    { label: "Hammer", count: 10, value: "hammer" },
    { label: "Screwdriver", count: 20, value: "screwdriver" },
    { label: "Grinder", count: 8, value: "grinder" },
  ]

  const brandOptions = [
    { label: "Einhell", count: 3, value: "einhell" },
    { label: "Karcher", count: 32, value: "karcher" },
    { label: "Silverline", count: 1, value: "silverline" },
    { label: "Stayer", count: 5, value: "stayer" },
    { label: "Total", count: 5, value: "total" },
    { label: "Wadfow", count: 1, value: "wadfow" },
    { label: "Ingco", count: 10, value: "ingco" },
    { label: "Bosch", count: 2, value: "bosch" },
  ]

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 294330])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Filters</h2>

      <Accordion type="multiple" defaultValue={["availability", "product-type", "price", "brand"]} className="w-full">
        <AccordionItem value="availability">
          <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
            Availability
            <span className="text-gray-500 text-sm ml-2">
              ({availabilityOptions.reduce((sum, opt) => sum + opt.count, 0)})
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="space-y-3">
              {availabilityOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <Checkbox id={`availability-${option.value}`} className="h-4 w-4" />
                  <label htmlFor={`availability-${option.value}`} className="text-base text-gray-700 cursor-pointer">
                    {option.label} ({option.count})
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="product-type">
          <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
            Product Type
            <span className="text-gray-500 text-sm ml-2">
              ({productTypeOptions.reduce((sum, opt) => sum + opt.count, 0)})
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="space-y-3">
              {productTypeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <Checkbox id={`product-type-${option.value}`} className="h-4 w-4" />
                  <label htmlFor={`product-type-${option.value}`} className="text-base text-gray-700 cursor-pointer">
                    {option.label} ({option.count})
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">Price</AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="flex items-center gap-3 mb-4">
              <Input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full text-base border-gray-300 focus:border-gray-500 focus:ring-0"
                placeholder="Min"
              />
              <span className="text-gray-500">-</span>
              <Input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full text-base border-gray-300 focus:border-gray-500 focus:ring-0"
                placeholder="Max"
              />
            </div>
            <Slider
              min={0}
              max={300000}
              step={100}
              value={priceRange}
              onValueChange={(value: [number, number]) => setPriceRange(value)}
              className="w-full"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
            Brand
            <span className="text-gray-500 text-sm ml-2">
              ({brandOptions.reduce((sum, opt) => sum + opt.count, 0)})
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="space-y-3">
              {brandOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <Checkbox id={`brand-${option.value}`} className="h-4 w-4" />
                  <label htmlFor={`brand-${option.value}`} className="text-base text-gray-700 cursor-pointer">
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
