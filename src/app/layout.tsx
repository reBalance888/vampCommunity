import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vamp-community.vercel.app'),
  title: "Vamp Community - Learn. Build. Earn.",
  description: "Product Hunt for vibecoding. Share your projects, discover resources, and join the community.",
  keywords: ["vibecoding", "AI", "Claude", "Cursor", "v0", "community", "projects"],
  authors: [{ name: "Vamp Community" }],
  openGraph: {
    title: "Vamp Community - Learn. Build. Earn.",
    description: "Product Hunt for vibecoding. Discover vibecoded projects, learn from the best resources, and compete for $10K+ in grants.",
    type: "website",
    images: ["/og-image.svg"],
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vamp-community.vercel.app',
  },
  twitter: {
    card: "summary_large_image",
    title: "Vamp Community - Product Hunt for Vibecoding",
    description: "Discover vibecoded projects, learn, build & earn. 16+ projects, $10K+ grants.",
    images: ["/og-image.svg"],
    site: "@KSimback",
    creator: "@KSimback",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Header />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  )
}
