import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter, Patrick_Hand, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  variable: "--font-handwritten",
  weight: ["400"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "Not Shay",
  description:
    "Portfolio of Not Shay. Building innovative solutions and creating impact.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon.png",
        media: "(prefers-color-scheme: dark)",
      }
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${patrickHand.variable} ${jetbrainsMono.variable} font-body antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
