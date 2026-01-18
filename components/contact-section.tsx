"use client"

import type React from "react"

import { useState } from "react"
import { WavyBorder } from "./wavy-border"
import { SmileyIcon } from "./smiley-icon"
import { BlobDecoration } from "./blob-decoration"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase mb-4">Let's Collab</h2>
              <BlobDecoration className="absolute -right-12 top-0 w-16 h-16 bg-accent -z-10" />
            </div>
            <p className="text-xl md:text-2xl mt-4">Got an idea? Let's make it happen together!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <WavyBorder className="bg-background">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-heading font-bold uppercase mb-2">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="border-4 border-foreground font-body text-lg p-6 focus:ring-4 focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-heading font-bold uppercase mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="border-4 border-foreground font-body text-lg p-6 focus:ring-4 focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-heading font-bold uppercase mb-2">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="border-4 border-foreground font-body text-lg p-6 min-h-[150px] focus:ring-4 focus:ring-accent"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-cream font-heading font-bold uppercase text-xl border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all py-6"
                >
                  Send Message
                </Button>
              </form>
            </WavyBorder>

            <WavyBorder className="bg-accent text-cream">
              <div className="space-y-6 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <SmileyIcon className="w-16 h-16" />
                    <h3 className="text-3xl font-heading font-bold uppercase">Hello!</h3>
                  </div>

                  <p className="text-xl leading-relaxed mb-6">
                    I'm always excited to connect with fellow creators, entrepreneurs, and anyone with a cool idea to
                    share!
                  </p>

                  <p className="text-xl leading-relaxed">Drop me a message and let's chat about your next project.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-heading font-bold uppercase text-sm mb-2 opacity-90">Email</h4>
                    <p className="text-xl font-heading font-bold">hello@shaylivni.com</p>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold uppercase text-sm mb-2 opacity-90">Availability</h4>
                    <p className="text-xl font-heading font-bold">Open for Projects</p>
                  </div>
                </div>
              </div>
            </WavyBorder>
          </div>
        </div>
      </div>
    </section>
  )
}
