"use client"

import type React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface ProductDetailAccordionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export default function ProductDetailAccordion({ title, children, defaultOpen = false }: ProductDetailAccordionProps) {
  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? title : undefined} className="w-full">
      <AccordionItem value={title}>
        <AccordionTrigger className="text-base font-semibold text-gray-800 hover:no-underline py-4">
          {title}
        </AccordionTrigger>
        <AccordionContent className={cn("pt-2", defaultOpen ? "block" : "hidden")}>
          <div className="text-gray-700 leading-relaxed">{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
