import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import PopularBrands from "@/components/PopularBrands"
import CategoryGrid from "@/components/CategoryGrid"
import ProductSection from "@/components/ProductSection"
import PromoBanner from "@/components/PromoBanner"
import FeaturesBar from "@/components/FeatureBar"
import NewArrivalsSection from "@/components/NewArrrivals"
import Footer from "@/components/Footer"
import { getProductsByBrand, getProducts, getNewArrivals, getBuildingEssentials, getLightingProducts } from "@/lib/data"

export default async function HomePage() {
  const [
    ingcoProducts,
    totalProducts,
    homeAppliances,
    karcherProducts,
    newArrivals,
    buildingEssentials,
    lightingProducts,
  ] = await Promise.all([
    getProductsByBrand("Ingco"),
    getProductsByBrand("Total Tools"),
    getProducts().then((products) => products.filter((p) => p.category === "home-essentials")),
    getProductsByBrand("Karcher"),
    getNewArrivals(),
    getBuildingEssentials(),
    getLightingProducts(),
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
      />

      <ProductSection
        title="Best Deals on Home & Kitchen Appliances"
        products={homeAppliances}
        viewAllLink="/category/home-essentials"
        className="border-b-[1.5px] border-gray-300"
      />

      <ProductSection title="Power Up with Total Tools"
        products={totalProducts} 
        viewAllLink="/brand/total-tools"
        className="border-b-[1.5px] border-gray-300"
      />

      <ProductSection
        title="Building Essentials Picks: Bath, Kitchen & Lights"
        products={buildingEssentials}
        viewAllLink="/category/building-materials"
      />

      <PromoBanner
        title="Vast Selection"
        description="Discover thousands of products from top brands all in one place!"
      />

      <ProductSection
        title="Get Karcher Cleaning Equipment & Pressure Washers"
        products={karcherProducts}
        viewAllLink="/brand/karcher"
        className="border-b-[1.5px] border-gray-300"
      />

      <ProductSection
        title="Explore our Range of Top-tier Lighting Products"
        products={lightingProducts}
        viewAllLink="/category/home-essentials"
      />

      <PromoBanner
        title="Shop Smart, Save More"
        description="Skip the traffic, parking, and long lines by choosing our convenient online shopping experience"
      />

      <NewArrivalsSection products={newArrivals} />

      <FeaturesBar />

      <Footer />
    </div>
  )
}
