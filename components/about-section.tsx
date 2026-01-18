import { Mail, Linkedin, Twitter } from "lucide-react"
import { LetterSwapForward } from "./ui/letter-swap"

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-12 md:py-16 lg:py-24 bg-background scroll-mt-16 min-h-[80vh] md:min-h-screen flex items-center overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative inline-block mb-12">
            <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase">ME</h2>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-2 text-2xl md:text-3xl font-heading">
              <LetterSwapForward label="Startups." staggerFrom="first" />
              <LetterSwapForward label="Problems worth solving." staggerFrom="center" />
              <LetterSwapForward label="Mostly for developers." staggerFrom="last" />
              <LetterSwapForward label="Architecture. Business. Impact." staggerFrom="first" />
              <LetterSwapForward label="Decent Jokes." staggerFrom="center" />
            </div>

            <div className="flex flex-col gap-4 text-lg md:text-xl font-sans mt-8">
              <a
                href="mailto:shaylivni@outlook.com"
                className="flex items-center gap-3 hover:text-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
                shaylivni@outlook.com
              </a>

              <a
                href="https://linkedin.com/in/shay-livni"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-accent transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                linkedin.com/in/shay-livni
              </a>

              <a
                href="https://twitter.com/IvniShay"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-accent transition-colors"
              >
                <Twitter className="w-5 h-5" />
                @IvniShay
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
