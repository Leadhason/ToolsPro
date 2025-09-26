
"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import PaymentMethodsSection from "@/components/payment-methods-section";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator"; // Assuming you have a Separator component

interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateRegion: string;
  zipCode: string;
  phoneNumber: string;
}

type CheckoutStep = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart, itemCount } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    stateRegion: "",
    zipCode: "",
    phoneNumber: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemCount === 0) {
      toast.info("Your cart is empty. Please add items to checkout.");
      router.push("/cart");
    }
  }, [itemCount, router]);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [id]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (
      !shippingAddress.fullName ||
      !shippingAddress.addressLine1 ||
      !shippingAddress.city ||
      !shippingAddress.stateRegion ||
      !shippingAddress.zipCode ||
      !shippingAddress.phoneNumber
    ) {
      toast.error("Please fill in all required shipping fields.");
      return;
    }
    setCurrentStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }
    setCurrentStep("review");
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shippingAddress, paymentMethod }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Order placed successfully!", {
          description: `Your order number is ${result.order.order_number}.`,
        });
        clearCart(); // Clear cart after successful order
        router.push("/order-history"); // Redirect to order history page
      } else {
        const errorData = await response.json();
        toast.error("Failed to place order", {
          description: errorData.error || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "shipping":
        return (
          <form onSubmit={handleShippingSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleShippingChange}
                  required
                  className="font-light"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={shippingAddress.phoneNumber}
                  onChange={handleShippingChange}
                  required
                  type="tel"
                  className="font-light"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input
                id="addressLine1"
                value={shippingAddress.addressLine1}
                onChange={handleShippingChange}
                required
                className="font-light"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
              <Input
                id="addressLine2"
                value={shippingAddress.addressLine2}
                onChange={handleShippingChange}
                className="font-light"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" value={shippingAddress.city} onChange={handleShippingChange} required className="font-light" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stateRegion">State/Region</Label>
                <Input
                  id="stateRegion"
                  value={shippingAddress.stateRegion}
                  onChange={handleShippingChange}
                  required
                  className="font-light"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip/Postal Code</Label>
                <Input
                  id="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={handleShippingChange}
                  required
                  className="font-light"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 font-light">
              Continue to Payment
            </Button>
          </form>
        );
      case "payment":
        return (
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <PaymentMethodsSection />
            <div className="flex justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep("shipping")}
                className="flex-1 bg-transparent font-light"
              >
                Back to Shipping
              </Button>
              <Button type="submit" className="flex-1 bg-gray-800 hover:bg-gray-900 font-light">
                Review Order
              </Button>
            </div>
          </form>
        );
      case "review":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Shipping Address</h3>
              <p className="font-light text-sm">{shippingAddress.fullName}</p>
              <p className="font-light text-sm">{shippingAddress.addressLine1}</p>
              {shippingAddress.addressLine2 && <p className="font-light text-sm">{shippingAddress.addressLine2}</p>}
              <p className="font-light text-sm">{shippingAddress.city}, {shippingAddress.stateRegion} {shippingAddress.zipCode}</p>
              <p className="font-light text-sm">{shippingAddress.phoneNumber}</p>
              <Button variant="link" onClick={() => setCurrentStep("shipping")} className="p-0 h-auto font-light">
                Edit Shipping
              </Button>
            </div>

            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-medium">Payment Method</h3>
              <p className="font-light text-sm">{paymentMethod || "Not selected"}</p>
              <Button variant="link" onClick={() => setCurrentStep("payment")} className="p-0 h-auto font-light">
                Edit Payment
              </Button>
            </div>

            <Button onClick={handlePlaceOrder} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 font-light">
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
            <div className="flex justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep("payment")}
                className="flex-1 bg-transparent font-light"
              >
                Back to Payment
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStepIndicatorClass = (step: CheckoutStep) => {
    const baseClass = "flex-1 text-center py-2 relative text-sm font-light";
    if (step === currentStep) {
      return `${baseClass} text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600`;
    } else if (["payment", "review"].includes(currentStep) && step === "shipping" || currentStep === "review" && step === "payment") {
      return `${baseClass} text-gray-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gray-400 cursor-pointer`;
    } else {
      return `${baseClass} text-gray-500 cursor-pointer`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-2xl font-semibold mb-8 text-center">Checkout</h1>

        {/* Step Indicator */}
        <div className="flex justify-between mb-8 max-w-2xl mx-auto border-b border-gray-200">
          <div className={getStepIndicatorClass("shipping")} onClick={() => setCurrentStep("shipping")}>
            1. Shipping
          </div>
          <div className={getStepIndicatorClass("payment")} onClick={() => currentStep !== "shipping" && setCurrentStep("payment")}>
            2. Payment
          </div>
          <div className={getStepIndicatorClass("review")} onClick={() => currentStep === "review" && setCurrentStep("review")}>
            3. Review
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            {renderStepContent()}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md sticky top-4 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-light line-clamp-1">{item.name}</h3>
                    <p className="text-xs font-light text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">GH₵{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <Separator className="mb-4" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-light">
                <span>Subtotal:</span>
                <span>GH₵{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-light">
                <span>Shipping:</span>
                <span>Calculated at next step</span> {/* Placeholder */}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>GH₵{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
