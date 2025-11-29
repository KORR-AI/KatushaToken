import type React from "react"
import type { Metadata } from "next"
import { Orbitron } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "KatushaToken LP Tools - Elite Solana Pool Management",
  description:
    "Professional liquidity pool operations for Raydium. Tactical tools for pool creation, liquidity management, and fee collection.",
  generator: "v0.app",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${orbitron.variable}`}>
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <main className="flex-1">{children}</main>

        <footer className="border-t border-cyan-500/20 bg-background/50 backdrop-blur-sm py-6 mt-auto">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm text-muted-foreground/70 tracking-wider">
              © {new Date().getFullYear()} MaytaToken. All rights reserved.
            </p>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  )
}
