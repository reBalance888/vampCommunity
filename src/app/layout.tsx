import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vamp Community - Learn. Build. Earn.",
  description: "Product Hunt for vibecoding. Share your projects, discover resources, and join the community.",
  keywords: ["vibecoding", "AI", "Claude", "Cursor", "v0", "community", "projects"],
  authors: [{ name: "Vamp Community" }],
  openGraph: {
    title: "Vamp Community - Learn. Build. Earn.",
    description: "Product Hunt for vibecoding",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vamp Community",
    description: "Product Hunt for vibecoding",
    images: ["/og-image.png"],
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
        {children}
      </body>
    </html>
  )
}
