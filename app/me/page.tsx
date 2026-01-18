"use client"

import { Header } from "@/components/header"
import { Character3D } from "@/components/character-3d"
import { LetterSwapForward } from "@/components/ui/letter-swap"
import { Mail, Linkedin, Twitter } from "lucide-react"
import { BlobDecoration } from "@/components/blob-decoration"
import { useEffect, useState } from "react"

export default function MePage() {
  const [isDancing, setIsDancing] = useState(true)

  useEffect(() => {
    // Stop dancing after initial animation, restart on hover
    const timer = setTimeout(() => setIsDancing(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="relative h-[calc(100vh-73px)] flex items-center overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl blob-shape" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary/30 rounded-full blur-2xl blob-shape-2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center h-full">
              {/* Left side - Character */}
              <div 
                className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-full"
                onMouseEnter={() => setIsDancing(true)}
                onMouseLeave={() => setIsDancing(false)}
              >
                <div className="relative h-full w-full rounded-lg border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-card overflow-hidden">
                  <Character3D isDancing={isDancing} />
                </div>
                {/* Decorative corner accent */}
                <BlobDecoration className="absolute -top-2 -right-2 w-10 h-10 bg-accent -z-10" />
              </div>

              {/* Right side - Content */}
              <div className="space-y-3 md:space-y-4 lg:space-y-5">
                {/* Introduction */}
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase">
                    I&apos;m Shay Livni
                  </h1>
                </div>

                {/* Animated text lines */}
                <div className="flex flex-col items-start gap-1 md:gap-1.5 pt-1">
                  <div className="flex flex-col items-start gap-0.5 md:gap-1 text-lg md:text-xl lg:text-xl font-heading">
                    <LetterSwapForward label="Building startups." staggerFrom="first" />
                    <LetterSwapForward label="Solving problems worth solving." staggerFrom="center" />
                    <LetterSwapForward label="Architecture. Business. Impact." staggerFrom="first" />
                    <LetterSwapForward label="Tech, Tech, Tech." staggerFrom="center" />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 md:space-y-2.5 pt-2">
                  <div className="flex flex-col gap-2 text-base md:text-lg font-sans">
                    <a
                      href="mailto:shaylivni@outlook.com"
                      className="group flex items-center gap-3 p-2.5 md:p-3 rounded-lg border-2 border-foreground bg-background hover:bg-accent hover:text-cream transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                      <div className="p-1.5 rounded border-2 border-foreground bg-background group-hover:bg-cream group-hover:border-cream transition-all shrink-0">
                        <Mail className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <span className="font-medium text-sm md:text-base truncate">shaylivni@outlook.com</span>
                    </a>

                    <a
                      href="https://linkedin.com/in/shay-livni"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-2.5 md:p-3 rounded-lg border-2 border-foreground bg-background hover:bg-secondary hover:text-foreground transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                      <div className="p-1.5 rounded border-2 border-foreground bg-background group-hover:bg-secondary group-hover:border-secondary transition-all shrink-0">
                        <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <span className="font-medium text-sm md:text-base truncate">linkedin.com/in/shay-livni</span>
                    </a>

                    <a
                      href="https://twitter.com/IvniShay"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-2.5 md:p-3 rounded-lg border-2 border-foreground bg-background hover:bg-accent hover:text-cream transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                      <div className="p-1.5 rounded border-2 border-foreground bg-background group-hover:bg-cream group-hover:border-cream transition-all shrink-0">
                        <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <span className="font-medium text-sm md:text-base truncate">@IvniShay</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
