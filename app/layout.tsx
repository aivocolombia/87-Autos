import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display, Montserrat, Inter } from "next/font/google"
import "./globals.css"
import Footer from "@/components/footer"

// Luxury typography configuration
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "87 Autos - Concesionario BMW y Mini Cooper",
  description:
    "Concesionario premium especializado en BMW y Mini Cooper. Vehículos de calidad, financiamiento y garantía extendida.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable} ${playfairDisplay.variable} ${montserrat.variable} ${inter.variable}`}>
      <body className={`${montserrat.className} font-sans`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
