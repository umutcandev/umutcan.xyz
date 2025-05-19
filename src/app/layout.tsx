import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Caudex } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";
import Script from "next/script";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const caudex = Caudex({
  variable: "--font-caudex",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Umutcan's Portfolio",
  description: "Frontend developer portfolio showcasing projects and skills in web development and UI design.",
  keywords: ["portfolio", "web developer", "frontend", "backend", "full-stack", "react", "next.js"],
  authors: [{ name: "Umutcan" }],
  creator: "Umutcan",
  publisher: "Umutcan",
  generator: "Next.js",
  applicationName: "Umutcan's Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://umutcan.xyz"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: [
      // Safari pinned tab referansını kaldırıyorum
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://umutcan.xyz",
    title: "Umutcan's Portfolio",
    description: "Frontend developer portfolio showcasing projects and skills in web development and UI design.",
    siteName: "Umutcan's Portfolio",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Umutcan's Portfolio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umutcan's Portfolio",
    description: "Frontend developer portfolio showcasing projects and skills in web development and UI design.",
    images: ["/og-image.png"],
    creator: "@umutcandev",
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
    other: {
      me: ["mailto:hi@umutcan.xyz"],
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caudex.variable} antialiased bg-background text-foreground font-sans flex flex-col min-h-screen`}
      >
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          src="/theme-script.js"
        />
        <ThemeProvider>
          <TooltipProvider>
            <Navbar />
            <main className="flex-1">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <div className="h-16"></div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
