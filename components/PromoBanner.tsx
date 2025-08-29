interface PromoBannerProps {
  title: string
  description: string
  bgColor?: string
}

export default function PromoBanner({ title, description, bgColor = "bg-[#003561]" }: PromoBannerProps) {
  return (
    <section className={`${bgColor} text-white py-4`}>
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-xs font-light">{description}</p>
      </div>
    </section>
  )
}
