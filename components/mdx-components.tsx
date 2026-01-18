"use client"

import { useState } from "react"

import { ReactNode } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Code block with syntax highlighting styling
export function CodeBlock({ 
  children, 
  language = "plaintext",
  title 
}: { 
  children: string
  language?: string
  title?: string 
}) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      {title && (
        <div className="bg-foreground text-background px-4 py-2 text-sm font-mono font-bold">
          {title}
        </div>
      )}
      <pre className="bg-[#1a1a1a] text-[#e5e5e5] p-4 overflow-x-auto">
        <code className="text-sm font-mono leading-relaxed whitespace-pre">
          {children}
        </code>
      </pre>
    </div>
  )
}

// Graph visualization block for relationship diagrams
export function GraphBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border-2 border-secondary bg-secondary/20">
      {title && (
        <div className="bg-secondary text-secondary-foreground px-4 py-2 text-sm font-heading font-bold uppercase">
          {title}
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono leading-loose text-foreground whitespace-pre">
          {children}
        </code>
      </pre>
    </div>
  )
}

// Callout/highlight box
export function Callout({ 
  children, 
  type = "info",
  title 
}: { 
  children: ReactNode
  type?: "info" | "warning" | "success" | "tip"
  title?: string
}) {
  const styles = {
    info: "border-secondary bg-secondary/10",
    warning: "border-accent bg-accent/10",
    success: "border-green-600 bg-green-600/10",
    tip: "border-blue-500 bg-blue-500/10"
  }

  return (
    <div className={cn(
      "my-6 p-4 rounded-lg border-l-4",
      styles[type]
    )}>
      {title && (
        <p className="font-heading font-bold text-lg mb-2">{title}</p>
      )}
      <div className="font-body">{children}</div>
    </div>
  )
}

// List component for bullet points
export function List({ items, title }: { items: string[]; title?: string }) {
  return (
    <div className="my-4">
      {title && (
        <p className="font-heading font-bold mb-2">{title}</p>
      )}
      <ul className="space-y-2 pl-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-accent font-bold mt-1">•</span>
            <span className="font-body">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Section heading
export function SectionHeading({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 
      id={id}
      className="text-2xl md:text-3xl font-heading font-bold mt-12 mb-4 scroll-mt-24"
    >
      {children}
    </h2>
  )
}

// Subsection heading
export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-xl md:text-2xl font-heading font-bold mt-8 mb-3">
      {children}
    </h3>
  )
}

// Paragraph
export function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 leading-relaxed font-body text-foreground/90">
      {children}
    </p>
  )
}

// Inline code
export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono font-medium">
      {children}
    </code>
  )
}

// Blog image with caption and click to zoom
export function BlogImage({ 
  src, 
  alt, 
  caption 
}: { 
  src: string
  alt: string
  caption?: string 
}) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <>
      <figure className="my-8">
        <div 
          className="rounded-lg overflow-hidden border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-zoom-in relative group"
          onClick={() => setIsZoomed(true)}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={800}
            height={450}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 px-3 py-1 rounded-full text-sm font-medium">
              Click to enlarge
            </span>
          </div>
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground font-body italic">
            {caption}
          </figcaption>
        )}
      </figure>
      
      {/* Zoomed overlay */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-zoom-out p-8"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] rounded-lg overflow-hidden border-4 border-background shadow-2xl animate-in zoom-in-95 duration-200">
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={1600}
              height={900}
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain"
            />
            {caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-background/90 px-4 py-2 text-center text-sm font-body">
                {caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

// Quote/blockquote
export function Quote({ children, author }: { children: ReactNode; author?: string }) {
  return (
    <blockquote className="my-6 pl-4 border-l-4 border-accent italic">
      <p className="font-body text-lg text-foreground/80">{children}</p>
      {author && (
        <cite className="block mt-2 text-sm text-muted-foreground not-italic">— {author}</cite>
      )}
    </blockquote>
  )
}

// Highlight text
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="bg-accent/20 px-1 rounded font-medium">{children}</span>
  )
}

// Divider
export function Divider() {
  return <hr className="my-8 border-t-2 border-foreground/20" />
}
