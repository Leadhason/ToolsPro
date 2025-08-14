// app/category/[slug]/page.tsx
import { notFound } from "next/navigation"
import { getProductsByCategory, getCategories } from "@/lib/data"
import CategoryPageContent from "./CategoryPageContent"
import { FilterProvider } from "@/context/filter-context"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(), 
    getProductsByCategory(slug)
  ])

  const category = categories.find((cat) => cat.slug === slug)

  if (!category) {
    notFound()
  }

  return <FilterProvider><CategoryPageContent category={category} products={products} /></FilterProvider>
}