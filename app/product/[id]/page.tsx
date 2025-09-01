"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import { Star, Minus, Plus, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"
import { getProduct, getCategories, getSimilarProducts } from "@/lib/data"
import { getProductImages } from "@/lib/data";
import { Input } from "@/components/ui/input"; // Import Input for quantity control
import { toast } from "sonner"; // Import toast from sonner
import { useCart, CartItem } from "@/context/cart-context"; // Import CartContext
import { useWishlist, WishlistItem } from "@/context/wishlist-context"; // Import WishlistContext
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
import React, { useState, useEffect } from "react"
import Footer from "@/components/Footer";
import { ProductAccordionDetail, getProductDetailAccordions } from "@/lib/data";
import { useParams } from 'next/navigation'; // Import useParams

interface ProductPageProps {
  // Removed params from interface
}

export default function ProductPage({  }: ProductPageProps) { // Removed params from function signature
  const { id } = useParams();

  if (typeof id !== 'string') {
    notFound(); // Handle case where id is undefined or an array
  }

  const productId: string = id;

  const [product, setProduct] = useState<any>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [similarProducts, setSimilarProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1); // State for product quantity
  const [timeLeft, setTimeLeft] = useState<any>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    days: 0,
    targetMonth: "",
    targetDay: 0,
  })
  const [allProductImages, setAllProductImages] = useState<string[]>([])
  const [mainImage, setMainImage] = useState<string>("")
  // Removed: const { id } = use(params as Readonly<{ id: string }>);
  const [productAccordions, setProductAccordions] = useState<ProductAccordionDetail[]>([])

  // Initialize Cart and Wishlist Contexts
  const { addToCart, updateQuantity: updateCartQuantity, items: cartItems } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  // Removed: const { toast } = useToast(); // Initialize toast

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const fetchedProduct = await getProduct(productId)
      const fetchedCategories = await getCategories()
      const fetchedSimilarProducts = await getSimilarProducts(productId)
      const fetchedProductAccordions = await getProductDetailAccordions(productId);

      setProduct(fetchedProduct)
      setCategories(fetchedCategories)
      setSimilarProducts(fetchedSimilarProducts)
      setProductAccordions(fetchedProductAccordions)
      if (fetchedProduct) {
        setMainImage(fetchedProduct.image || "/placeholder.svg")

        // Fetch all product images using the new centralized function
        const allImages = await getProductImages(productId);
        if (allImages.length > 0) {
          // Set main image from the fetched list, if the current mainImage is a placeholder
          if (!fetchedProduct.image || fetchedProduct.image.includes("placeholder.svg")) {
            setMainImage(allImages[0]);
          }
          setAllProductImages(allImages); // Corrected to use all images
        }
      }
      setLoading(false)
    }
    fetchData()
  }, [productId]) // Dependency updated to productId

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

  // Event handler for quantity change
  const handleQuantityChange = (type: 'increment' | 'decrement' | 'input', value?: string) => {
    setQuantity(prevQuantity => {
      let newQuantity = prevQuantity;
      if (type === 'increment') {
        newQuantity += 1;
      } else if (type === 'decrement') {
        newQuantity = Math.max(1, newQuantity - 1);
      } else if (value !== undefined) {
        const parsedValue = parseInt(value, 10);
        newQuantity = isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue; // Ensure quantity is at least 1
      }
      return newQuantity;
    });
  };

  // Event handler for adding to cart
  const handleAddToCart = () => {
    if (!product) return;

    // Create the item to add, ensuring it matches Omit<CartItem, "quantity">
    const itemToAdd: Omit<CartItem, "quantity"> = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
    };

    const existingCartItem = cartItems.find(item => item.id === product.id);

    if (existingCartItem) {
      // If item exists in cart, update its quantity by adding the new quantity
      const newQuantity = existingCartItem.quantity + quantity;
      updateCartQuantity(product.id, newQuantity);
      toast.success(`Updated Cart`, {
        description: `${quantity} more of ${product.name} added to your cart. Total: ${newQuantity}.`,
        duration: 3000,
      });
    } else {
      // If it's a new item, add it to cart (initially quantity 1),
      // then update to the desired quantity if it's more than 1.
      addToCart(itemToAdd);
      if (quantity > 1) {
        updateCartQuantity(product.id, quantity);
      }
      toast.success(`Added to Cart`, {
        description: `${quantity} x ${product.name} has been added to your cart.`,
        duration: 3000,
      });
    }

    setQuantity(1); // Reset quantity after adding to cart
  };

  // Event handler for toggling wishlist
  const handleToggleWishlist = () => {
    if (!product) return;

    const wishlistItem: WishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      rating: product.rating,
      reviewCount: product.reviewCount,
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info(`Removed from Wishlist`, {
        description: `${product.name} has been removed from your wishlist.`,
        duration: 3000,
      });
    } else {
      addToWishlist(wishlistItem);
      toast.success(`Added to Wishlist`, {
        description: `${product.name} has been added to your wishlist.`,
        duration: 3000,
      });
    }
  };

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
              {productAccordions.filter(accordion =>
                 ["description", "processing-fulfillment", "free-shipping-policies"].includes(accordion.id)
               ).map(accordion => (
                 <ProductDetailAccordion
                   key={accordion.id}
                   title={accordion.title}
                   className=""
                 >
                   <p>{accordion.content}</p>
                 </ProductDetailAccordion>
               ))}
            </div>

            <div className="hidden lg:block">
              <PaymentMethodsSection />
            </div>
          </div>

          {/* Product Info Column */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="text-md font-light mb-4">{product.brand}</div>

              <h1 className="text-lg sm:text-xl lg:text-2xl font-medium mb-4 leading-tight">{product.name}</h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-medium">GH₵{product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-base font-light line-through">GH₵{product.originalPrice.toFixed(2)}</span>
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
                  {product.reviewCount && <span className="text-xs font-light">({product.reviewCount} reviews)</span>}
                </div>
              )}
            </div>

            {/* Delivery Countdown */}
            <div className="mb-6 text-md font-light">
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 cursor-pointer"
                    onClick={() => handleQuantityChange('decrement')}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange('input', e.target.value)}
                    className="w-16 text-center focus-visible:ring-offset-0 focus-visible:ring-0"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 cursor-pointer"
                    onClick={() => handleQuantityChange('increment')}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  className="flex-1 sm:flex-none sm:min-w-[200px] bg-gray-800 hover:bg-gray-900 cursor-pointer"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>
              </div>

              <Button variant="outline" className="w-full bg-transparent cursor-pointer">
                Buy it now
              </Button>
              <Button
                variant="ghost"
                className={`w-full flex items-center justify-center gap-2 text-sm cursor-pointer ${
                  isInWishlist(productId) ? "text-red-500 hover:text-red-600" : "text-blue-600 hover:text-blue-700"
                }`}
                onClick={handleToggleWishlist}
              >
                <Heart className="h-4 w-4" fill={isInWishlist(productId) ? "#ef4444" : "none"} />
                {isInWishlist(productId) ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Delivery Guarantees */}
            <div className="pt-4 border-t space-y-2 text-[11px] font-light">
              <p>
                <span className="font-semibold">Pay on Delivery</span> |{" "}
                <span className="font-semibold">Next-Day Delivery</span> |{" "}
                <span className="font-semibold">Free Delivery Over GH₵500</span>
              </p>
              <p className="text-sm text-gray-500">
                Add to cart, checkout, and receive it at your door - pay on delivery!
              </p>
              <p className="text-sm text-gray-500">Over 75,000+ orders delivered across Ghana.</p>
            </div>

            {/* Accordion Sections (How to Place Order, Pay on Delivery) - Always visible in this column */}
            <div className="pt-4 border-t">
              {productAccordions.filter(accordion =>
                ["how-to-place-order", "pay-on-delivery-options"].includes(accordion.id)
              ).map(accordion => (
                <ProductDetailAccordion
                  key={accordion.id}
                  title={accordion.title}
                  className=""
                  defaultOpen={accordion.defaultOpen}
                >
                  <p className="whitespace-pre-line">{accordion.content}</p>
                </ProductDetailAccordion>
              ))}
            </div>

            {/* Accordion Sections (Description, Processing, Free Shipping) and Payment Section - Visible on small screens, hidden on large */}
            <div className="pt-4 border-t block lg:hidden">
              {productAccordions.filter(accordion =>
                 ["description", "processing-fulfillment", "free-shipping-policies"].includes(accordion.id)
               ).map(accordion => (
                 <ProductDetailAccordion
                   key={accordion.id}
                   title={accordion.title}
                   className=""
                 >
                   <p>{accordion.content}</p>
                 </ProductDetailAccordion>
               ))}
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
