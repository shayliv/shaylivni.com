import { WavyBorder } from "./wavy-border"
import { BlobDecoration } from "./blob-decoration"

export function WorkSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Built a scalable e-commerce solution serving 100K+ users with real-time inventory management",
      tags: ["Next.js", "PostgreSQL", "Stripe"],
    },
    {
      title: "AI-Powered SaaS",
      description: "Developed an AI tool that helps teams automate workflows and boost productivity",
      tags: ["React", "Python", "OpenAI"],
    },
    {
      title: "Mobile Health App",
      description: "Created a health tracking app focused on user wellness and preventive care",
      tags: ["React Native", "Firebase", "ML"],
    },
  ]

  return (
    <section id="work" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative inline-block mb-12">
          <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase">My Work</h2>
          <BlobDecoration className="absolute -left-8 -top-4 w-12 h-12 bg-secondary -z-10" variant="2" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <WavyBorder key={i} className="bg-card hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-heading font-bold uppercase flex-1">{project.title}</h3>
                  <BlobDecoration className="w-10 h-10 bg-accent shrink-0" />
                </div>

                <p className="text-lg leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-secondary border-2 border-foreground font-heading font-bold text-xs uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </WavyBorder>
          ))}
        </div>
      </div>
    </section>
  )
}
