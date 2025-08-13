import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Forma Nativa - Iluminación Sustentable & Diseño",
  description:
    "Diseños únicos de veladores y lámparas eco-friendly creados con impresión 3D sustentable y materiales biodegradables",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${playfairDisplay.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
