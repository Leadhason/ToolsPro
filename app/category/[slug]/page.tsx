import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getProductsByCategory, getCategories } from "@/lib/data"; // Re-added server-side data fetching functions
import CategoryHero from "@/components/CategoryHero";
import Footer from "@/components/Footer";
import CategoryPageContent from "@/components/CategoryPageContent"; // Kept CategoryPageContent
import FeatureBar from "@/components/FeatureBar";
// Removed imports for ProductCard, FilterSidebar, useProductFilters, useSearchParams

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params; // Reverted to server-side params access
  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(slug),
  ]);

  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CategoryHero category={category} />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <CategoryPageContent products={products} /> {/* Pass products prop */}
      </div>
      <FeatureBar />
      <Footer />
    </div>
  );
}
