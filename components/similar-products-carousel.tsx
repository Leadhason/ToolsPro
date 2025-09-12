"use client"
import ProductCard from "./ProductCard"
import type { Product } from "@/lib/data"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import required modules
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react'; // Import useEffect and useState

interface SimilarProductsCarouselProps {
  products: Product[]
}

export default function SimilarProductsCarousel({ products }: SimilarProductsCarouselProps) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance, prevRef, nextRef]);

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-base sm:text-lg lg:text-xl font-medium">Compare with similar items</h2>
        </div>

        <div className="relative">
          <Swiper
            onSwiper={setSwiperInstance}
            slidesPerView={1}
            spaceBetween={16}
            loop={true}
            navigation={{
              prevEl: prevRef.current, // Use ref here
              nextEl: nextRef.current, // Use ref here
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            modules={[Navigation]}
            className="similar-products-swiper"
          >
            {products.map((product, index) => (
              <SwiperSlide key={`${product.id}-${index}`}>
                <ProductCard product={product} showCompare={false} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Navigation Buttons for Swiper */}
              <Button
            ref={prevRef} // Assign ref here
                variant="ghost"
                size="icon"
            className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2  rounded-full bg-transparent hover:bg-transparent z-10"
            aria-label="Previous product"
              >
              </Button>
              <Button
            ref={nextRef} // Assign ref here
                variant="ghost"
                size="icon"
            className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-transparent hover:bg-transparent z-10"
            aria-label="Next product"
              >
              </Button>
        </div>
      </div>
    </section>
  )
}
