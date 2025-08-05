import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import PopularBrands from "@/components/popular-brands"
import CategoryGrid from "@/components/category-grid"
import ProductSection from "@/components/product-section"
import PromoBanner from "@/components/promo-banner"
import FeaturesBar from "@/components/features-bar"
import { getProductsByBrand, getProducts } from "@/lib/data"

export default async function HomePage() {
  const [ingcoProducts, totalProducts, homeAppliances, allProducts] = await Promise.all([
    getProductsByBrand("Ingco"),
    getProductsByBrand("Total Tools"),
    getProducts().then((products) => products.filter((p) => p.category === "home-essentials")),
    getProducts(),
  ])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PopularBrands />
      <CategoryGrid />

      <ProductSection title="Ingco Tools for Any Project!" products={ingcoProducts} viewAllLink="/brand/ingco" />

      <PromoBanner
        title="Fast and Reliable Delivery"
        description="Get your orders delivered to your doorstep within 48-Hours & Pay on delivery!"
        bgColor="bg-gray-800"
      />

      <ProductSection
        title="Best Deals on Home & Kitchen Appliances"
        products={homeAppliances}
        viewAllLink="/category/home-essentials"
      />

      <ProductSection title="Power Up with Total Tools" products={totalProducts} viewAllLink="/brand/total-tools" />

      <PromoBanner
        title="Vast Selection"
        description="Discover thousands of products from top brands all in one place!"
        bgColor="bg-gray-800"
      />

      <FeaturesBar />
    </div>
  )
}
