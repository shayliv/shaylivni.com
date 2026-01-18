"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { X, CheckCircle2, Sparkles } from "lucide-react"
import { BlobDecoration } from "./blob-decoration"

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem("newsletter-popup-shown")
    if (shown === "true") {
      setHasShown(true)
      return
    }

    let scrollHandler: (() => void) | null = null

    // Wait for page to be fully loaded
    const timer = setTimeout(() => {
      // Check initial scroll position
      const checkScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const documentHeight = Math.max(
          document.documentElement.scrollHeight - document.documentElement.clientHeight,
          1
        )
        
        // Show popup after scrolling 30% or 300px, whichever comes first
        const scrollPercent = (scrollTop / documentHeight) * 100
        const scrollPixels = scrollTop
        
        if ((scrollPercent > 30 || scrollPixels > 300) && !hasShown) {
          setIsVisible(true)
          sessionStorage.setItem("newsletter-popup-shown", "true")
          setHasShown(true)
          // Remove listener once popup is shown
          if (scrollHandler) {
            window.removeEventListener("scroll", scrollHandler)
          }
        }
      }

      scrollHandler = checkScroll

      // Check on mount in case user has already scrolled
      checkScroll()

      // Add scroll listener
      window.addEventListener("scroll", checkScroll, { passive: true })
    }, 500) // Small delay to ensure page is loaded

    return () => {
      clearTimeout(timer)
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler)
      }
    }
  }, [hasShown])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

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

      if (response.ok || response.status === 201) {
        setStatus("success")
        setEmail("")
        // Close popup after showing success for 3 seconds
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      } else {
        setStatus("error")
        const errorMsg = data?.error
        if (typeof errorMsg === "string") {
          setErrorMessage(errorMsg)
        } else if (Array.isArray(errorMsg)) {
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

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Popup */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`bg-card border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg p-6 md:p-8 max-w-md w-full pointer-events-auto transform transition-all duration-300 ${
            isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
        >
          {/* Success State - Cool Animated Popup */}
          {status === "success" ? (
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-pulse" />
                <CheckCircle2 className="relative w-20 h-20 text-accent mx-auto animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase text-accent">
                  You&apos;re In! 🎉
                </h3>
                <p className="text-lg text-muted-foreground">
                  Thanks for subscribing! Check your email to confirm.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>We&apos;ll be in touch soon!</span>
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
            </div>
          ) : (
            <>
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-accent/10 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="relative inline-block">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase">
                    Stay Updated
                  </h2>
                  <BlobDecoration className="absolute -right-4 -top-2 w-8 h-8 bg-accent -z-10" />
                </div>
              </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="border-4 border-foreground font-body text-base p-4 focus:ring-4 focus:ring-accent"
                    required
                    disabled={status === "loading"}
                  />
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-accent hover:bg-accent/90 text-cream font-heading font-bold uppercase border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>

                {status === "error" && (
                  <p className="text-center text-sm text-destructive font-medium">
                    {errorMessage}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
