import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const featuredArticles = [
  {
    id: 1,
    tags: ["Architecture", "DevTools"],
    title: "Preparing for Architecture Context",
    description:
      "How I turned infrastructure relationships into a graph that AI agents can actually query - and found a 'fixed' bug still running in production.",
    link: "/blog/make-architecture-context-queryable",
    image: "/architecture-graph-diagram.png",
  },
]

export function FeaturedArticlesSection() {
  return (
    <section className="bg-background py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-8">
        {featuredArticles.map((article, index) => (
          <div
            key={article.id}
            className={`flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-8 lg:gap-16 ${index > 0 ? "mt-24" : ""}`}
          >
            {/* Text Content */}
            <div className="flex-1 space-y-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {article.tags.map((tag, tagIndex) => {
                  // Different colors for each badge
                  const badgeColors = [
                    {
                      bg: "bg-[oklch(0.65_0.18_25)]", // coral
                      text: "text-[oklch(0.95_0.02_85)]", // cream
                      border: "border-foreground"
                    },
                    {
                      bg: "bg-[oklch(0.82_0.05_140)]", // sage
                      text: "text-[oklch(0.25_0.02_65)]", // dark-brown
                      border: "border-foreground"
                    },
                    {
                      bg: "bg-[oklch(0.35_0.08_150)]", // dark-green
                      text: "text-[oklch(0.95_0.02_85)]", // cream
                      border: "border-foreground"
                    }
                  ];
                  const colors = badgeColors[tagIndex % badgeColors.length];
                  
                  return (
                    <span 
                      key={tag} 
                      className={`px-4 py-2 rounded-full border-2 ${colors.border} ${colors.bg} ${colors.text} text-sm font-medium shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>

              {/* Title */}
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{article.title}</h2>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed">{article.description}</p>

              {/* Link */}
              <Link href={article.link} className="inline-flex items-center gap-2 text-lg font-medium group">
                See full case study
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image */}
            <div className="flex-1 relative">
              {/* Decorative gradient shapes */}
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary/50 rounded-full blur-2xl" />

              <div className="relative rounded-lg overflow-hidden border-2 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
