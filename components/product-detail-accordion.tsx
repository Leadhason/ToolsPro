"use client"

import type React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface ProductDetailAccordionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string // Add className prop
}

export default function ProductDetailAccordion({ title, children, defaultOpen = false, className }: ProductDetailAccordionProps) {
  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? title : undefined} className={cn("w-full", className)}>
      <AccordionItem value={title}>
        <AccordionTrigger className="text-medium font-medium text-gray-800 hover:no-underline py-4">
          {title}
        </AccordionTrigger>
        <AccordionContent className={cn("pt-2 text-medium text-gray-600", defaultOpen ? "block" : "hidden")}>
          <div className="leading-relaxed">{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
