import { NextResponse } from "next/server"

// Helper function to extract error message from various error formats
function extractErrorMessage(error: any): string {
  // If it's already a string, return it
  if (typeof error === "string") {
    return error
  }

  // Handle validation error array format: [{loc, msg, type}]
  if (Array.isArray(error)) {
    return error.map((e: any) => {
      if (typeof e === "string") return e
      return e.msg || e.message || "Validation error"
    }).join(", ")
  }

  // Handle object with detail property (could be string or array)
  if (error.detail) {
    if (typeof error.detail === "string") {
      return error.detail
    }
    if (Array.isArray(error.detail)) {
      return error.detail.map((e: any) => {
        if (typeof e === "string") return e
        return e.msg || e.message || "Validation error"
      }).join(", ")
    }
  }

  // Handle other common error formats
  if (error.message) {
    return typeof error.message === "string" ? error.message : "Error occurred"
  }

  if (error.error) {
    return typeof error.error === "string" ? error.error : "Failed to subscribe"
  }

  // Default fallback
  return "Failed to subscribe"
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { email } = body

    // Validate email exists and is a string
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Trim and validate email format
    const trimmedEmail = email.trim()
    if (!trimmedEmail || !trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      )
    }

    // Option 1: Buttondown API (Recommended - Simple & Developer-friendly)
    // Sign up at https://buttondown.email and get your API key
    if (process.env.BUTTONDOWN_API_KEY) {
      const response = await fetch("https://api.buttondown.com/v1/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email_address: trimmedEmail,
          tags: ["website-subscriber"]
        }),
      })

      // Buttondown returns 201 on success, not 200
      if (!response.ok && response.status !== 201) {
        const error = await response.json().catch(() => ({}))
        const errorMessage = extractErrorMessage(error)
        return NextResponse.json(
          { error: errorMessage },
          { status: response.status }
        )
      }

      return NextResponse.json({ success: true }, { status: 201 })
    }

    // Option 2: ConvertKit API
    // Sign up at https://convertkit.com and get your API key and form ID
    if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
      const response = await fetch(
        `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: process.env.CONVERTKIT_API_KEY,
            email: trimmedEmail,
          }),
        }
      )

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        const errorMessage = extractErrorMessage(error)
        return NextResponse.json(
          { error: errorMessage },
          { status: response.status }
        )
      }

      return NextResponse.json({ success: true })
    }

    // Option 3: Mailchimp API
    // Sign up at https://mailchimp.com and get your API key and list ID
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      const [_, datacenter] = process.env.MAILCHIMP_API_KEY.split("-")
      const response = await fetch(
        `https://${datacenter}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: trimmedEmail,
            status: "subscribed",
          }),
        }
      )

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        const errorMessage = extractErrorMessage(error)
        return NextResponse.json(
          { error: errorMessage },
          { status: response.status }
        )
      }

      return NextResponse.json({ success: true })
    }

    // Option 4: Resend API (for custom email handling)
    // Sign up at https://resend.com and get your API key
    if (process.env.RESEND_API_KEY && process.env.NEWSLETTER_EMAIL) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.NEWSLETTER_EMAIL,
          to: process.env.NEWSLETTER_EMAIL,
          subject: `New Newsletter Subscription: ${trimmedEmail}`,
          text: `New subscriber: ${trimmedEmail}`,
        }),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        const errorMessage = extractErrorMessage(error)
        return NextResponse.json(
          { error: errorMessage },
          { status: response.status }
        )
      }

      return NextResponse.json({ success: true })
    }

    // If no service is configured, return an error
    return NextResponse.json(
      { error: "Newsletter service not configured. Please set up your API keys." },
      { status: 500 }
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
