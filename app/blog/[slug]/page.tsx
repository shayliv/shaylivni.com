import { Header } from "@/components/header"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ArchitectureArticleContent } from "@/components/blog-article-content"
import { NewsletterPopup } from "@/components/newsletter-popup"
import { NewsletterSection } from "@/components/newsletter-section"

const blogPosts: Record<string, { title: string; description: string; date: string; content: string; useRichContent?: boolean }> = {
  "make-architecture-context-queryable": {
    title: "Preparing for Architecture Context",
    description: "How I turned infrastructure relationships into a graph that AI agents can actually query - and found a 'fixed' bug still running in production.",
    date: "2026-01-18",
    content: "",
    useRichContent: true,
  },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-heading font-bold">Post not found</h1>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <NewsletterPopup />

      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-lg font-heading font-bold uppercase hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </Link>

        <header className="mb-8">
          <time className="text-sm text-muted-foreground font-body block mb-2">{post.date}</time>
          <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-4">{post.title}</h1>
          <p className="text-xl text-foreground/80 font-body">{post.description}</p>
        </header>

        <div className="prose prose-lg max-w-none font-body">
          {post.useRichContent && slug === "make-architecture-context-queryable" ? (
            <ArchitectureArticleContent />
          ) : (
            post.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4 leading-relaxed">
                {paragraph.trim()}
              </p>
            ))
          )}
        </div>
      </article>

      <NewsletterSection />
    </main>
  )
}
