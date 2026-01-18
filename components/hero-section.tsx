"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Character3D } from "./character-3d"
import { ArrowPointer } from "./arrow-pointer"

export function HeroSection() {

  return (
    <section className="container mx-auto px-4 py-4 md:py-6 min-h-[calc(100vh-73px)]">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 items-start">
        <div className="space-y-4 md:space-y-6">
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase"
            style={{ lineHeight: "1.1" }}
          >
            I&apos;M
            <br />
            WORKING
            <br />
            ON
            <br />
            BIG
            <br />
            THINGS.
          </h1>
          
          {/* Mobile buttons */}
          <div className="flex gap-3 md:hidden pt-2">
            <Link href="/me">
              <Button
                size="default"
                variant="outline"
                className="font-heading font-bold uppercase text-base px-6 py-4 border-3 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-background"
              >
                ME
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                size="default"
                className="bg-accent hover:bg-accent/90 text-cream font-heading font-bold uppercase text-base px-6 py-4 border-3 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                BLOG
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative h-[350px] sm:h-[450px] md:h-[600px] w-full flex items-end justify-center">
          <Character3D />
          <ArrowPointer />
          {/* Desktop buttons */}
          <div className="hidden md:flex absolute bottom-0 left-0 right-0 gap-4 justify-center pb-24 z-20">
            <Link href="/me">
              <Button
                size="lg"
                variant="outline"
                className="font-heading font-bold uppercase text-xl px-8 py-6 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-background"
              >
                ME
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-cream font-heading font-bold uppercase text-xl px-8 py-6 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                BLOG
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
