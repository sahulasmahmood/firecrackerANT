import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { AuthProvider } from "@/components/providers/auth-provider";
import { CompanyProvider } from "@/components/providers/company-provider";
import NotificationProviderWrapper from "@/components/NotificationProviderWrapper";
import { Toaster } from "sonner";
import FaviconUpdater from "@/components/FaviconUpdater";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumera — Modern Living Store",
  description: "Discover handpicked products made just for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
     
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <FaviconUpdater />
        {/* Razorpay Checkout Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />

        {/* Stripe.js Script */}
        <Script src="https://js.stripe.com/v3/" strategy="lazyOnload" />

        <AuthProvider>
          <CompanyProvider>
            <NotificationProviderWrapper>
              {children}
            </NotificationProviderWrapper>
          </CompanyProvider>
        </AuthProvider>

        <Toaster
          position="top-center"
          toastOptions={{
            className: "border-2 border-border shadow-xl rounded-lg text-lg",
            duration: 4000,
            style: {
              background: "var(--background)",
              color: "var(--foreground)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              padding: "20px 24px",
              minWidth: "400px",
              maxWidth: "600px",
            },
          }}
          richColors
          expand
          gap={12}
        />
      </body>
    </html>
  );
}
