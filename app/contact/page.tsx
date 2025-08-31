'use client'

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Headphones, RotateCcw, Truck, Shield, Mail, Copy } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogContent, setDialogContent] = useState("")

  const handleOpenDialog = (title: string, content: string) => {
    setDialogTitle(title)
    setDialogContent(content)
    setIsDialogOpen(true)
  }

  const helpCards = [
    {
      icon: Headphones,
      title: "Pre-sales & Advice",
      description: "Got questions about a product or need guidance on the best buy?",
      dialogDetails: [
        "**Comprehensive Pre-Sales Consultation**",
        "Our dedicated pre-sales team offers in-depth consultations to help you choose the perfect products for your needs. We cover: ",
        "- **Product Specifications**: Detailed insights into features, capabilities, and technical requirements.",
        "- **Compatibility Checks**: Ensuring products integrate seamlessly with your existing tools or project infrastructure.",
        "- **Best Buy Guidance**: Personalized recommendations based on your budget, project scope, and specific requirements.",
        "- **Project Planning Assistance**: Advice on material estimation, tool selection, and optimizing your workflow.",
        "",
        "**Reach Our Experts**: ",
        "- **Phone**: 0308251057 (Monday - Friday, 9:00 AM - 5:00 PM GMT)",
        "- **Email**: sales@edmax.store (Expect a response within 24 business hours)",
        "",
        "We are committed to empowering you with the right information to make confident purchasing decisions.",
      ].join('\n'),
    },
    {
      icon: RotateCcw,
      title: "Aftersales & Returns",
      description: "Need assistance with refunds, product returns, or after-sales care?",
      dialogDetails: [
        "**Dedicated Aftersales Support**",
        "Your satisfaction extends beyond the purchase. Our aftersales team provides comprehensive support for any post-purchase queries or issues.",
        "",
        "**Product Support**: ",
        "- **Troubleshooting**: Expert guidance for common product issues and operational queries.",
        "- **Warranty Claims**: Assistance with understanding and initiating warranty claims for eligible products.",
        "- **Service Requests**: Facilitating repairs or replacements under warranty terms.",
        "",
        "**Returns & Refunds Policy**: ",
        "- **Hassle-Free Returns**: Products can be returned within **30 days** of purchase, provided they are in their original condition, unused, and in their original packaging.",
        "- **Refund Process**: Refunds are typically processed within 7-10 business days after the returned item is inspected and approved.",
        "- **Initiating a Return**: Visit our dedicated 'Returns & Refunds' section on our website for step-by-step instructions or contact aftersales@edmax.store for direct assistance.",
        "",
        "We aim to make your aftersales experience as smooth and stress-free as possible.",
      ].join('\n'),
    },
    {
      icon: Truck,
      title: "Delivery & Shipping",
      description: "Get your order delivered swiftly across Ghana with transparent shipping policies.",
      dialogDetails: [
        "**Fast, Secure, and Transparent Delivery**",
        "At EDMAX, we understand the importance of timely delivery for your projects. We offer efficient and reliable shipping services across all regions of Ghana.",
        "",
        "**Key Delivery Information**: ",
        "- **Accra Deliveries**: Enjoy **free delivery for orders over GH₵500** within Accra, typically delivered within 24-48 business hours.",
        "- **Regional Deliveries**: For orders outside Accra, delivery times may vary from 3-7 business days, depending on the region. Shipping fees apply and are calculated at checkout.",
        "- **Tracking Your Order**: Upon dispatch, a tracking number will be sent to your registered email, allowing you to monitor your order's progress in real-time.",
        "- **Payment on Delivery**: Convenient payment on delivery options are available for eligible orders within specified regions.",
        "- **Weekend Orders**: Please note that orders placed during the weekend are processed on the following Monday.",
        "",
        "For detailed shipping information, including international shipping options, please visit our Shipping Policy page.",
      ].join('\n'),
    },
    {
      icon: Shield,
      title: "Privacy & Data Protection",
      description: "Learn about our commitment to safeguarding your personal information with our privacy policy.",
      dialogDetails: [
        "**Our Commitment to Your Privacy**",
        "At EDMAX, we are fully committed to protecting your personal data and ensuring your privacy. Our robust Privacy Policy adheres to all relevant data protection regulations and outlines our practices in detail.",
        "",
        "**What Our Policy Covers**: ",
        "- **Data Collection**: What personal information we collect (e.g., name, contact details, purchase history) and how it's collected.",
        "- **Data Usage**: How your data is used to process orders, improve services, personalize your experience, and for marketing purposes (with your consent).",
        "- **Data Storage & Security**: Measures taken to secure your data, including encryption, access controls, and regular security audits.",
        "- **Data Sharing**: Conditions under which your data might be shared with trusted third-party service providers (e.g., payment processors, delivery partners), always with strict confidentiality agreements.",
        "- **Your Rights**: Information on how you can access, rectify, erase, or restrict the processing of your personal data.",
        "",
        "**Contact Our Privacy Officer**: ",
        "- For any privacy-related questions or requests, please email privacy@edmax.store.",
        "",
        "We encourage you to read our full Privacy Policy to understand your rights and our obligations regarding your personal data.",
      ].join('\n'),
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div
        className="relative h-96 bg-[url('/Contact-hero-image.jpeg')] bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-3xl font-semibold mb-4">Contact EDMAX</h1>
            <p className="text-base mb-8">
              Reach out to us for any inquiries or support
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-12">What can we help you with?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpCards.map((card, index) => (
              <div key={index} className="bg-white p-8 rounded-lg text-center border shadow-sm">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <card.icon className="w-12 h-12 text-[#E86514]" />
              </div>
                <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
                <p className="text-gray-600 mb-6 text-xs leading-relaxed">
                  {card.description}
                </p>
                <Button
                  className="bg-gray-800 hover:bg-gray-900 cursor-pointer text-white px-6 py-2"
                  onClick={() => handleOpenDialog(card.title, card.dialogDetails)}
                >
                  {card.title.split(' ')[0]} Info
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/Hero-image.jpg"
                width={500}
                height={300}
                alt="EDMAX Building"
                className="object-cover rounded-lg"
              />
            </div>
            <div className="text-white">
              <h2 className="text-xl font-semibold mb-6">Contact us by phone. Please see the details below</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold mb-2">Working Hours:</h3>
                  <p className="text-gray-300 text-sm">Monday - Friday - 9am to 5pm</p>
                </div>

                <div>
                  <h3 className="text-base font-semibold mb-2">Sole Contact Number:</h3>
                  <p className="text-gray-300 text-sm">0308251057</p>
                </div>

                <div>
                  <h3 className="text-base font-semibold mb-2">Sole WhatsApp Number:</h3>
                  <p className="text-gray-300 text-sm">0540715156</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-4">Email Directory - Reach the Right Team</h2>
          <p className="text-center text-gray-600 mb-12 text-sm">
            Please use the appropriate contact based on your inquiry to help us respond faster and more efficiently:
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-base font-semibold mb-3">Retail Sales & Customer Support (B2C):</h3>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-4 h-4 text-[#E86514]" />
                <span className="font-medium text-sm">sales@edmax.store</span>
                <Button variant="ghost" size="sm" className="p-1">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-gray-600 text-xs ml-7">
                For individual orders, product inquiries, delivery updates, returns, or general support.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">B2B Sales & Commercial Clients:</h3>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-4 h-4 text-[#E86514]" />
                <span className="font-medium text-sm">b2b@edmax.store</span>
                <Button variant="ghost" size="sm" className="p-1">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-gray-600 text-xs ml-7">
                For procurement teams, corporate subscriptions, Institutional Quotes, commercial supply partnerships,
                and bulk orders.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">Partnerships & Supplier Onboarding:</h3>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-4 h-4 text-[#E86514]" />
                <span className="font-medium text-sm">partnerships@edmax.store</span>
                <Button variant="ghost" size="sm" className="p-1">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-gray-600 text-xs ml-7">
                For manufacturers, distributors, and potential suppliers interested in onboarding or distribution
                partnerships.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">Finance & Payments:</h3>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-4 h-4 text-[#E86514]" />
                <span className="font-medium text-sm">finance@edmax.store</span>
                <Button variant="ghost" size="sm" className="p-1">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-gray-600 text-xs ml-7">
                For payment confirmations, account reconciliation, and other finance-related matters.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Want to get in touch with us? Just fill out the form below</h2>
            <p className="text-gray-600 text-sm">and we'll get back to you as soon as possible.</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium mb-2">
                  Name *
                </label>
                <Input id="name" required className="bg-white" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium mb-2">
                  Email *
                </label>
                <Input id="email" type="email" required className="bg-white" />
              </div>
            </div>

            <div>
              <label htmlFor="help" className="block text-xs font-medium mb-2">
                How can we help?
              </label>
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="* Please select *" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pre-sales">Pre-sales & advice</SelectItem>
                  <SelectItem value="aftersales">Aftersales & returns</SelectItem>
                  <SelectItem value="delivery">Delivery & Shipping</SelectItem>
                  <SelectItem value="privacy">Privacy & Data Protection</SelectItem>
                  <SelectItem value="b2b">B2B Sales & Commercial</SelectItem>
                  <SelectItem value="partnerships">Partnerships</SelectItem>
                  <SelectItem value="finance">Finance & Payments</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-medium mb-2">
                Message *
              </label>
              <Textarea id="message" rows={6} required className="bg-white resize-none" />
            </div>

            <Button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3">Send</Button>
          </form>
        </div>
      </div>

      <Footer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] p-6 bg-white shadow-md overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900 mb-2">{dialogTitle}</DialogTitle>
            <DialogDescription className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {dialogContent}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
