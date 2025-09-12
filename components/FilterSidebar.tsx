"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useProductFilters } from "@/context/filter-context"; // Corrected import
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Category } from "@/lib/data"; // Import Category
import { Product } from "@/lib/data"; // Import Product

interface FilterSidebarProps {
  className?: string
}

export default function FilterSidebar({ className }: FilterSidebarProps) {
  const router = useRouter();
  const {
    filters,
    updateFilter,
    clearFilters,
    getFilterCounts,
    allCategories,
    allProducts, // Destructure allProducts here
    availableBrands,
    minPriceOverall,
    maxPriceOverall,
    getDescendantCategoryIds, // Destructure from useProductFilters
  } = useProductFilters();
  const counts = getFilterCounts();

  // Local state for price range to handle slider interaction smoothly
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(filters.priceRange);

  useEffect(() => {
    // Initialize local price range when global filters update, but only if they are different
    if (filters.priceRange[0] !== localPriceRange[0] || filters.priceRange[1] !== localPriceRange[1]) {
      setLocalPriceRange(filters.priceRange);
    }
  }, [filters.priceRange]);

  // Filter options with dynamic counts
  const availabilityOptions = [
    { label: "In stock", count: counts.availability["in-stock"] || 0, value: "in-stock" },
    { label: "Out of stock", count: counts.availability["out-of-stock"] || 0, value: "out-of-stock" },
  ];

  // Dynamic Product Type Options (child categories of the current category slug)
  const productTypeOptions = React.useMemo(() => {
    const currentCategory = allCategories.find(cat => cat.slug === filters.currentCategorySlug);
    let categoriesToDisplay: Category[] = [];

    if (currentCategory) {
      const childrenOfCurrent = allCategories.filter(cat => cat.parentId === currentCategory.id);
      if (childrenOfCurrent.length > 0) {
        // If current category is a top-level category (parentId === null), show its children's children (grandchildren)
        if (currentCategory.parentId === null) {
          childrenOfCurrent.forEach(child => {
            categoriesToDisplay.push(...allCategories.filter(cat => cat.parentId === child.id));
          });
        } else {
          // If current category is a second-level category or deeper, show its direct children
          categoriesToDisplay = childrenOfCurrent;
        }

      } else {
        // If current category has no children (it's a leaf), display itself
        categoriesToDisplay = [currentCategory];
      }
    } else {
      // If no specific category is selected, show all top-level categories (parentId === null)
      categoriesToDisplay = allCategories.filter(cat => cat.parentId === null);
    }

    return categoriesToDisplay.map(cat => {
      const descendantIds = getDescendantCategoryIds(cat.id, allCategories);
      const count = allProducts.filter((product: Product) => descendantIds.includes(product.categoryId)).length;
      return {
        label: cat.name,
        count: count,
        value: cat.id,
      };
    });
  }, [allCategories, filters.currentCategorySlug, allProducts, getDescendantCategoryIds]); // Depend on allProducts

  // Dynamic Brand Options
  const brandOptions = React.useMemo(() => {
    return availableBrands.map(brandName => ({
      label: brandName,
      count: counts.brands[brandName.toLowerCase()] || 0,
      value: brandName.toLowerCase(),
    }));
  }, [availableBrands, counts.brands]);

  // Event handlers
  const handleAvailabilityChange = (value: string, checked: boolean) => {
    const newAvailability = checked
      ? [...filters.availability, value]
      : filters.availability.filter((item: string) => item !== value); // Explicitly type item as string
    updateFilter("availability", newAvailability);
  };

  const handleProductTypeChange = (value: string, checked: boolean) => {
    const newActiveCategoryIds = checked
      ? [...filters.activeCategoryIds, value]
      : filters.activeCategoryIds.filter((item: string) => item !== value); // Explicitly type item as string
    updateFilter("activeCategoryIds", newActiveCategoryIds);
  };

  const handleBrandChange = (value: string, checked: boolean) => {
    const newSelectedBrands = checked
      ? [...filters.selectedBrands, value]
      : filters.selectedBrands.filter((item: string) => item !== value); // Explicitly type item as string
    updateFilter("selectedBrands", newSelectedBrands);
  };

  const handlePriceRangeCommit = (value: [number, number]) => {
    updateFilter("priceRange", value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    setLocalPriceRange([newMin, localPriceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    setLocalPriceRange([localPriceRange[0], newMax]);
  };

  const handleReset = () => {
    clearFilters();
    router.push("/category/all-products");
  };

  const hasActiveFilters = (
    filters.availability.length > 0 ||
    filters.activeCategoryIds.length > 0 ||
    filters.selectedBrands.length > 0 ||
    filters.searchQuery !== "" ||
    filters.activeTags.length > 0 ||
    filters.priceRange[0] !== minPriceOverall ||
    filters.priceRange[1] !== maxPriceOverall
  );

  return (
    <div className={`bg-white p-6 rounded-none border-r border-gray-200 h-full overflow-y-auto scrollbar-hide sticky top-4 ${className || ''}`}>
      <div className="flex items-center justify-between mb-4">
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset} // Use handleReset
            className="text-sm underline font-light text-blue-600 hover:text-blue-700 p-0 h-auto"
          >
            Clear all
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["availability", "product-type", "price", "brand"]} className="w-full">
        <AccordionItem value="availability">
          <AccordionTrigger className="text-md font-light text-gray-800 hover:no-underline">
            Availability
            <span className="text-gray-500 text-md font-light ml-2">
              ({counts.availability["in-stock"] + counts.availability["out-of-stock"]})
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
                    className="text-md font-light text-gray-700 cursor-pointer"
                  >
                    {option.label} ({option.count})
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="product-type">
          <AccordionTrigger className="text-md font-light text-gray-800 hover:no-underline">
            Product Type
            <span className="text-gray-500 text-md font-light ml-2">
              ({productTypeOptions.reduce((sum, opt) => sum + (opt.count || 0), 0)})
            </span>
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="space-y-3">
              {productTypeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <Checkbox
                    id={`product-type-${option.value}`}
                    className="h-4 w-4"
                    checked={filters.activeCategoryIds.includes(option.value)}
                    onCheckedChange={(checked) => handleProductTypeChange(option.value, checked as boolean)}
                  />
                  <label
                    htmlFor={`product-type-${option.value}`}
                    className="text-md font-light text-gray-700 cursor-pointer"
                  >
                    {option.label} ({option.count})
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-md font-light text-gray-800 hover:no-underline">Price</AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="flex items-center gap-3 mb-4">
              <Input
                type="number"
                value={localPriceRange[0]}
                onChange={handleMinPriceChange}
                onBlur={() => handlePriceRangeCommit(localPriceRange)} // Commit on blur
                className="w-full text-md font-light border-gray-300 focus:border-gray-500 focus:ring-0"
                placeholder="Min"
              />
              <span className="text-gray-500 text-md font-light">-</span>
              <Input
                type="number"
                value={localPriceRange[1]}
                onChange={handleMaxPriceChange}
                onBlur={() => handlePriceRangeCommit(localPriceRange)} // Commit on blur
                className="w-full text-md font-light border-gray-300 focus:border-gray-500 focus:ring-0"
                placeholder="Max"
              />
            </div>
            <Slider
              min={minPriceOverall}
              max={maxPriceOverall}
              step={100}
              value={[localPriceRange[0], localPriceRange[1]]}
              onValueChange={(value: number[]) => setLocalPriceRange(value as [number, number])} // Cast to tuple type
              onValueCommit={handlePriceRangeCommit} // Commit to global state on release
              className="w-full"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-md font-light text-gray-800 hover:no-underline">
            Brand
            <span className="text-gray-500 text-md font-light ml-2">
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
                    checked={filters.selectedBrands.includes(option.value)}
                    onCheckedChange={(checked) => handleBrandChange(option.value, checked as boolean)}
                  />
                  <label htmlFor={`brand-${option.value}`} className="text-md font-light text-gray-700 cursor-pointer">
                    {option.label} ({option.count})
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}