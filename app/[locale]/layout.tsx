import { notFound } from "next/navigation";
import { ViewTransitions } from "next-view-transitions";

import { IBM_Plex_Sans_Arabic as IBM } from "next/font/google";
import { Inter } from "next/font/google";

import { NextIntlClientProvider } from "next-intl";
import { Locale, routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import { cn, constructMetadata } from "@/lib/utils";
import NavbarProvider from "@/components/NavbarProvider";
import Footer from "@/components/footer";
import Providers from "@/components/providers";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

const ibmArabic = IBM({
  subsets: ["arabic"],
  display: "swap", //Better performance for font loading
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = constructMetadata();

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();
  const isArabic = locale === "ar";
  return (
    <ViewTransitions>
      <html lang={locale} dir={isArabic ? "rtl" : "ltr"}>
        <head>
          <link
            rel="icon"
            type="image/png"
            href="favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="favicon-16x16.png"
            sizes="16x16"
          />
          {/* <link rel="canonical" href="https://example.com" /> */}
          {/* Look at the end of this file */}
          <meta name="theme-color" content="white" />
        </head>
        <body
          className={cn(
            isArabic ? ibmArabic.className : inter.className,
            "flex min-h-screen flex-col bg-background antialiased",
          )}
        >
          <NextIntlClientProvider messages={messages}>
            <Providers>
              <NavbarProvider />
              <main className="mx-auto mt-[107px] w-full max-w-base flex-1 overflow-auto">
                {children}
              </main>
            </Providers>
            <Footer />
          </NextIntlClientProvider>
          <Toaster />
          <SanityLive />
        </body>
      </html>
    </ViewTransitions>
  );
}

/**
 * <link rel="canonical" href="https://example.com" />
 *
 * @description When multiple pages have similar content, search engines consider them duplicate versions of the same page.
 * For example, desktop and mobile versions of a product page are often considered duplicates.
 * Search engines select one of the pages as the canonical, or primary, version and crawl that one more.
 * Valid canonical links let you tell search engines which version of a page to crawl and display to users in search results.
 */
