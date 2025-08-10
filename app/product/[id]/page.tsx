"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import { Star, Minus, Plus, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"
import { getProduct, getCategories, getSimilarProducts } from "@/lib/data"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ProductDetailAccordion from "@/components/product-detail-accordion"
import PaymentMethodsSection from "@/components/payment-methods-section"
import CustomerReviewsSection from "@/components/customer-reviews-section"
import SellProductsBanner from "@/components/sell-products-banner"
import SimilarProductsCarousel from "@/components/similar-products-carousel"
import Link from "next/link"
import React, { use, useState, useEffect } from "react"
import Footer from "@/components/Footer" // Import Footer component

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<any>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [similarProducts, setSimilarProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState<any>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    days: 0,
    targetMonth: "",
    targetDay: 0,
  })
  const [mainImage, setMainImage] = useState<string>("")
  const {id} = use(params);

   useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const fetchedProduct = await getProduct(id)
      const fetchedCategories = await getCategories()
      const fetchedSimilarProducts = await getSimilarProducts(id)

      setProduct(fetchedProduct)
      setCategories(fetchedCategories)
      setSimilarProducts(fetchedSimilarProducts)
      if (fetchedProduct) {
        setMainImage(fetchedProduct.image || "/placeholder.svg")
      }
      setLoading(false)
    }
    fetchData()
  }, [id])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const targetDate = new Date()
      targetDate.setDate(now.getDate() + (now.getHours() < 16 ? 0 : 1)) // If past 4 PM, target next day
      targetDate.setHours(16, 0, 0, 0) // Set target to 4 PM today or tomorrow

      let difference = targetDate.getTime() - now.getTime()

      let timeLeft = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        days: 0,
        targetMonth: "",
        targetDay: 0,
      }

      if (difference <= 0) {
        // If the target time has passed for today, set it for tomorrow
        targetDate.setDate(now.getDate() + 1)
        targetDate.setHours(16, 0, 0, 0)
        difference = targetDate.getTime() - now.getTime()
      }

      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        targetMonth: targetDate.toLocaleString("default", { month: "long" }),
        targetDay: targetDate.getDate(),
      }

      return timeLeft
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer) // Use clearInterval for cleanup
  }, []) // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const timerComponents: React.ReactNode[] = []

  if (timeLeft.hours > 0) {
    timerComponents.push(
      <span key="hours" className="font-bold text-green-600">
        {timeLeft.hours} {timeLeft.hours === 1 ? "hour" : "hours"}
      </span>,
    )
  }
  if (timeLeft.minutes > 0 || timeLeft.hours > 0) {
    timerComponents.push(
      <span key="minutes" className="font-bold text-green-600">
        {timeLeft.minutes} {timeLeft.minutes === 1 ? "minute" : "minutes"}
      </span>,
    )
  }
  timerComponents.push(
    <span key="seconds" className="font-bold text-green-600">
      {timeLeft.seconds} {timeLeft.seconds === 1 ? "second" : "seconds"}
    </span>,
  )

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading product details...</div>
  }

  if (!product) {
    notFound()
  }

  const category = categories.find((cat) => cat.slug === product?.category)

  // Define additional placeholder images for demonstration
  const additionalImages = [
    product.hoverImage || "/product-image-2.png",
    "/product-image-3.png",
    "/product-image-4.png",
  ]

  const allProductImages = [product.image, ...additionalImages].filter(Boolean)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {category && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/category/${category.slug}`}>{category.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Images Column */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={mainImage || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full rounded-lg object-contain max-h-[600px]"
              />
              {product.detailImageOverlay && (
                <Image
                  src={product.detailImageOverlay || "/placeholder.svg"}
                  alt="Product details overlay"
                  width={300}
                  height={100}
                  className="absolute bottom-4 left-4 w-auto h-auto max-w-[80%] object-contain"
                />
              )}
              {product.discount && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">{product.discount}% off</Badge>
              )}
              {product.isNew && <Badge className="absolute top-4 right-4 bg-green-500 text-white">New arrival</Badge>}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {allProductImages.map((imgSrc: string, index: number) => (
                <div
                  key={index}
                  className={`relative w-full h-24 cursor-pointer rounded-lg overflow-hidden border-2 ${
                    mainImage === imgSrc ? "border-gray-800" : "border-transparent"
                  }`}
                  onClick={() => setMainImage(imgSrc)}
                >
                  <Image
                    src={imgSrc || "/placeholder.svg"}
                    alt={`Product thumbnail ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="hover:opacity-75 transition-opacity"
                  />
                </div>
              ))}
            </div>

            {/* Accordion Sections (Description, Processing, Free Shipping) and Payment Section - Visible on large screens, hidden on small */}
            <div className="pt-4 border-t hidden lg:block">
              <ProductDetailAccordion title="Description">
                <p>{product.description}</p>
                <p className="mt-2">
                  This {product.name} from {product.brand} is designed for optimal performance and durability. Ideal for
                  both professional and DIY use.
                </p>
              </ProductDetailAccordion>
              <ProductDetailAccordion title="Processing & Fulfillment">
                <p>
                  Orders are typically processed within 24 hours. Delivery within Accra is usually within 48 hours,
                  while regional deliveries may take 3-5 business days. Weekend orders are processed on Mondays.
                </p>
              </ProductDetailAccordion>
              <ProductDetailAccordion title="Free Shipping and Other Policies">
                <p>
                  Enjoy free delivery on all orders over GH₵500 within Accra. For our full shipping, return, and privacy
                  policies, please visit our dedicated policy pages linked in the footer.
                </p>
              </ProductDetailAccordion>
            </div>

            <div className="hidden lg:block">
              <PaymentMethodsSection />
            </div>
          </div>

          {/* Product Info Column */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="text-sm text-gray-600 mb-2">SM Essential Bundles</div>
              <div className="text-sm text-gray-800 mb-4">{product.brand}</div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-tight">{product.name}</h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-bold">GH₵{product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">GH₵{product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>

              {product.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  {product.reviewCount && (
                    <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
                  )}
                </div>
              )}
            </div>

            {/* Delivery Countdown */}
            <div className="mb-6 text-sm text-gray-700">
              <p>
                Order within{" "}
                {timerComponents.map((comp, index) => (
                  <React.Fragment key={index}>
                    {comp}
                    {index < timerComponents.length - 1 && " "}
                  </React.Fragment>
                ))}{" "}
                to get it by{" "}
                <span className="font-bold text-red-600">
                  {timeLeft.targetMonth} {timeLeft.targetDay}
                </span>
                !
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border rounded-md w-fit">
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">1</span>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="flex-1 sm:flex-none sm:min-w-[200px] bg-gray-800 hover:bg-gray-900">
                  Add to cart
                </Button>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Buy it now
              </Button>
              <Link
                href="/wishlist"
                className="flex items-center justify-center gap-2 text-blue-600 hover:underline text-sm"
              >
                <Heart className="h-4 w-4" />
                Add to Wishlist
              </Link>
            </div>

            {/* Delivery Guarantees */}
            <div className="pt-4 border-t space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Pay on Delivery</span> |{" "}
                <span className="font-semibold">Next-Day Delivery</span> |{" "}
                <span className="font-semibold">Free Delivery Over GH₵500</span>
              </p>
              <p className="text-xs text-gray-500">
                Add to cart, checkout, and receive it at your door - pay on delivery!
              </p>
              <p className="text-xs text-gray-500">Over 75,000+ orders delivered across Ghana.</p>
            </div>

            {/* Accordion Sections (How to Place Order, Pay on Delivery) - Always visible in this column */}
            <div className="pt-4 border-t">
              <ProductDetailAccordion title="How to Place an Order" defaultOpen={true}>
                <p>
                  Placing an order is simple! Browse our categories, add desired products to your cart, and proceed to
                  checkout. Follow the prompts to enter your delivery details and choose your payment method.
                </p>
              </ProductDetailAccordion>
              <ProductDetailAccordion title="Pay on Delivery Options">
                <p>
                  We offer convenient Pay on Delivery options for most locations. You can pay with cash, mobile money
                  (MTN, Vodafone, AirtelTigo), or card upon receiving your order.
                </p>
              </ProductDetailAccordion>
            </div>

            {/* Accordion Sections (Description, Processing, Free Shipping) and Payment Section - Visible on small screens, hidden on large */}
            <div className="pt-4 border-t block lg:hidden">
              <ProductDetailAccordion title="Description">
                <p>{product.description}</p>
                <p className="mt-2">
                  This {product.name} from {product.brand} is designed for optimal performance and durability. Ideal for
                  both professional and DIY use.
                </p>
              </ProductDetailAccordion>
              <ProductDetailAccordion title="Processing & Fulfillment">
                <p>
                  Orders are typically processed within 24 hours. Delivery within Accra is usually within 48 hours,
                  while regional deliveries may take 3-5 business days. Weekend orders are processed on Mondays.
                </p>
              </ProductDetailAccordion>
              <ProductDetailAccordion title="Free Shipping and Other Policies">
                <p>
                  Enjoy free delivery on all orders over GH₵500 within Accra. For our full shipping, return, and privacy
                  policies, please visit our dedicated policy pages linked in the footer.
                </p>
              </ProductDetailAccordion>
            </div>

            <div className="block lg:hidden">
              <PaymentMethodsSection />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="container mx-auto px-4 py-8">
        <CustomerReviewsSection />
      </div>

      {/* Compare with Similar Items */}
      <SimilarProductsCarousel products={similarProducts} />

      {/* Sell Products Banner (Remains after Similar Products Carousel) */}
      <SellProductsBanner />

      <Footer />
    </div>
  )
}
