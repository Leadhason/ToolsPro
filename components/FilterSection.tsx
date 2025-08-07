'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from "react"
import { cn } from "@/lib/utils"

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  count?: number
  defaultOpen?: boolean
}

export default function FilterSection({ title, children, count, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-gray-800 hover:text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {count !== undefined && <span className="text-gray-500 text-sm">({count})</span>}
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
      </button>
      {isOpen && <div className="mt-4 space-y-2">{children}</div>}
    </div>
  )
}
