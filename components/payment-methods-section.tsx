import Image from "next/image"

export default function PaymentMethodsSection() {
  return (
    <div className="border rounded-lg p-6 bg-gray-50">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Secure Payment - Powered by Paystack</h3>
      <p className="text-sm text-gray-600 mb-4">
        {"100% Guarantee: If you don't receive your product as described, we'll refund you in full."}
      </p>
      <div className="flex flex-wrap gap-4 items-center">
        <Image
          src="/payment-methods/cash-on-delivery.png"
          alt="Cash on Delivery"
          width={60}
          height={30}
          className="h-6 object-contain"
        />
        <Image
          src="/payment-methods/mtn-mobile-money.png"
          alt="MTN Mobile Money"
          width={60}
          height={30}
          className="h-6 object-contain"
        />
        <Image
          src="/payment-methods/vodafone-cash.png"
          alt="Vodafone Cash"
          width={60}
          height={30}
          className="h-6 object-contain"
        />
        <Image
          src="/payment-methods/airtel-tigo.png"
          alt="AirtelTigo"
          width={60}
          height={30}
          className="h-6 object-contain"
        />
        <Image src="/payment-methods/visa.png" alt="Visa" width={60} height={30} className="h-6 object-contain" />
        <Image
          src="/payment-methods/mastercard.png"
          alt="Mastercard"
          width={60}
          height={30}
          className="h-6 object-contain"
        />
      </div>
    </div>
  )
}
