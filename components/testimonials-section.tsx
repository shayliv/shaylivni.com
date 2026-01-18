import Image from "next/image"

const testimonials = [
  {
    quote:
      "Not Shay has an incredible ability to turn complex technical challenges into elegant, scalable solutions. Working with him transformed how we approach product development.",
    name: "Alex Chen",
    title: "CTO at TechFlow",
    image: "/professional-man-headshot.png",
  },
  {
    quote:
      "One of the most driven entrepreneurs I've met. Not Shay combines deep technical expertise with genuine business acumen - a rare combination that delivers real results.",
    name: "Sarah Marcus",
    title: "Partner at Vertex Ventures",
    image: "/professional-woman-headshot.png",
  },
  {
    featured: true,
    quote: "Not Shay is hands down one of the most innovative engineers and product thinkers I've ever collaborated with.",
    name: "David Rosen",
    title: "VP of Engineering at ScaleUp",
    image: "/professional-man-with-glasses-headshot.jpg",
  },
]

export function TestimonialsSection() {
  const regularTestimonials = testimonials.filter((t) => !t.featured)
  const featuredTestimonial = testimonials.find((t) => t.featured)

  return (
    <section className="min-h-screen snap-start bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - smaller testimonials */}
          <div className="space-y-12">
            {regularTestimonials.map((testimonial, index) => (
              <div key={index} className="space-y-4">
                <p className="text-lg md:text-xl leading-relaxed text-foreground/90">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="rounded-full border-2 border-primary"
                  />
                  <div>
                    <p className="font-heading font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right column - featured testimonial */}
          {featuredTestimonial && (
            <div className="space-y-6">
              <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
                "{featuredTestimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src={featuredTestimonial.image || "/placeholder.svg"}
                  alt={featuredTestimonial.name}
                  width={64}
                  height={64}
                  className="rounded-full border-2 border-primary"
                />
                <div>
                  <p className="font-heading font-bold text-lg text-foreground">{featuredTestimonial.name}</p>
                  <p className="text-foreground/60">{featuredTestimonial.title}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
