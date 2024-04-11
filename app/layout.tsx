import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next/types";
import CookieBanner from "@/components/cookiebanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buying Buddy | Home",
  description:
    "We help you to find the best products on the market based on price, quality, and user reviews.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_MEASUREMENT_ID="G-EFX0ZQ2BXE" />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          {children}
          <CookieBanner />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
