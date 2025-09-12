import Image from "next/image"
import { getPublicImageUrl } from "@/lib/supabase/image-utils"; // Import getPublicImageUrl

export default function PaymentMethodsSection() {
  return (
    <div className="border rounded-lg p-6 bg-gray-50">
      <h3 className="text-base font-medium mb-4 text-gray-800">Secure Payment - Powered by Paystack</h3>
      <p className="text-sm font-light mb-4">
        {"100% Guarantee: If you don't receive your product as described, we'll refund you in full."}
      </p>
      <div className="flex flex-wrap gap-4 items-center">
        <Image
          src={getPublicImageUrl("cash-on-delivery.png", "Payment_Methods_Images")}
          alt="Cash on Delivery"
          width={60}
          height={30}
          className="object-contain"
        />
        <Image
          src={getPublicImageUrl("mtn-mobile-money.png", "Payment_Methods_Images")}
          alt="MTN Mobile Money"
          width={60}
          height={30}
          className="h-6 object-contain"
        />
        <Image
          src={getPublicImageUrl("vodafone-cash.png", "Payment_Methods_Images")}
          alt="Vodafone Cash"
          width={60}
          height={30}
          className="object-contain"
        />
        <Image
          src={getPublicImageUrl("airtel-tigo.png", "Payment_Methods_Images")}
          alt="AirtelTigo"
          width={60}
          height={30}
          className="object-contain"
        />
        <Image src={getPublicImageUrl("visa.png", "Payment_Methods_Images")} alt="Visa" width={60} height={30} className="object-contain" />
        <Image
          src={getPublicImageUrl("mastercard.png", "Payment_Methods_Images")}
          alt="Mastercard"
          width={60}
          height={30}
          className="object-contain"
        />
      </div>
    </div>
  )
}
