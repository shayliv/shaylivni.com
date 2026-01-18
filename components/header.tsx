"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b-4 border-foreground">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/icon.png" 
              alt="Not Shay" 
              width={32} 
              height={32} 
              className="w-6 h-6 md:w-8 md:h-8"
            />
            <span className="text-xl md:text-2xl font-heading font-bold uppercase">Not Shay</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/me" className="group flex items-center text-lg font-heading font-bold uppercase">
              <ArrowRight
                strokeWidth={3}
                className="w-0 h-5 opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover:mr-1 transition-all duration-300 ease-out"
              />
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">ME</span>
            </Link>
            <Link href="/blog" className="group flex items-center text-lg font-heading font-bold uppercase">
              <ArrowRight
                strokeWidth={3}
                className="w-0 h-5 opacity-0 group-hover:w-5 group-hover:opacity-100 group-hover:mr-1 transition-all duration-300 ease-out"
              />
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">BLOG</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 -mr-2"
            aria-label="Open menu"
          >
            <Menu strokeWidth={3} className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col animate-in fade-in duration-200">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between border-b-4 border-foreground">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3">
              <Image 
                src="/icon.png" 
                alt="Not Shay" 
                width={32} 
                height={32} 
                className="w-6 h-6"
              />
              <span className="text-xl font-heading font-bold uppercase">Not Shay</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 -mr-2"
              aria-label="Close menu"
            >
              <X strokeWidth={3} className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            <Link 
              href="/me" 
              onClick={() => setIsMenuOpen(false)}
              className="group flex items-center text-4xl font-heading font-bold uppercase"
            >
              <ArrowRight
                strokeWidth={3}
                className="w-0 h-8 opacity-0 group-hover:w-8 group-hover:opacity-100 group-hover:mr-2 transition-all duration-300 ease-out"
              />
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-2">ME</span>
            </Link>
            <Link 
              href="/blog" 
              onClick={() => setIsMenuOpen(false)}
              className="group flex items-center text-4xl font-heading font-bold uppercase"
            >
              <ArrowRight
                strokeWidth={3}
                className="w-0 h-8 opacity-0 group-hover:w-8 group-hover:opacity-100 group-hover:mr-2 transition-all duration-300 ease-out"
              />
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-2">BLOG</span>
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
