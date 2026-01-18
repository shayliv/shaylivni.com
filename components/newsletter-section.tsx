"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { WavyBorder } from "./wavy-border"
import { BlobDecoration } from "./blob-decoration"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    // Validate email before sending
    const trimmedEmail = email.trim()
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address")
      return
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      })

      const data = await response.json().catch(() => ({ error: "Failed to parse response" }))

      // Accept both 200 and 201 as success (Buttondown returns 201)
      if (response.ok || response.status === 201) {
        setStatus("success")
        setEmail("")
        setTimeout(() => setStatus("idle"), 3000)
      } else {
        setStatus("error")
        // Ensure error message is always a string
        const errorMsg = data?.error
        if (typeof errorMsg === "string") {
          setErrorMessage(errorMsg)
        } else if (Array.isArray(errorMsg)) {
          // Handle array of errors
          setErrorMessage(errorMsg.map((e: any) => typeof e === "string" ? e : e.msg || e.message || "Error").join(", "))
        } else {
          setErrorMessage("Something went wrong. Please try again.")
        }
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("Failed to connect. Please try again later.")
    }
  }

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-heading font-bold uppercase mb-2">
                Get Notified
              </h2>
              <p className="text-base md:text-lg font-heading text-foreground/80">
                When I&apos;m writing cool stuff.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 border-4 border-foreground font-body text-base p-3 focus:ring-4 focus:ring-accent"
                required
                disabled={status === "loading"}
              />
              <Button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="bg-accent hover:bg-accent/90 text-cream font-heading font-bold uppercase border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>

            {status === "success" && (
              <p className="text-center mt-4 text-accent font-heading font-bold text-sm">
                ✓ Thanks! Check your email.
              </p>
            )}
            {status === "error" && (
              <p className="text-center mt-4 text-destructive font-heading font-medium text-sm">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
