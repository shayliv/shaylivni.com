import { Header } from "@/components/header"
import Link from "next/link"

const blogPosts = [
  {
    slug: "make-architecture-context-queryable",
    title: "Preparing for Architecture Context",
    description:
      "How I turned infrastructure relationships into a graph that AI agents can actually query - and found a 'fixed' bug still running in production.",
    date: "2026-01-18",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-6xl md:text-8xl font-heading font-bold uppercase mb-12">Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative bg-secondary border-4 border-foreground p-6 min-h-[280px] flex flex-col justify-between hover:bg-muted transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              {/* Decorative dot pattern overlay */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, var(--dark-brown) 1px, transparent 1px)`,
                  backgroundSize: "12px 12px",
                }}
              />

              <div className="relative z-10">
                <h2 className="text-xl font-heading font-bold leading-tight mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-muted-foreground font-body">{post.date}</time>
              </div>

              <p className="relative z-10 text-sm text-foreground/80 font-body leading-relaxed mt-auto">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
