import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import Footer from "@/components/footer"

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
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className} suppressHydrationWarning={true}>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
