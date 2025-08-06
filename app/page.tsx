import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import PopularBrands from "@/components/PopularBrands"
import CategoryGrid from "@/components/CategoryGrid"
import ProductSection from "@/components/ProductSection"
import PromoBanner from "@/components/PromoBanner"
import FeaturesBar from "@/components/FeatureBar"
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
