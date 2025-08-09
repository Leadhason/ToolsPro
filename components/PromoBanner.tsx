interface PromoBannerProps {
  title: string
  description: string
  bgColor?: string
}

export default function PromoBanner({ title, description, bgColor = "bg-black" }: PromoBannerProps) {
  return (
    <section className={`${bgColor} text-white py-4`}>
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </section>
  )
}
