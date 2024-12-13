import { notFound } from "next/navigation";
import { ViewTransitions } from "next-view-transitions";

import { IBM_Plex_Sans_Arabic as IBM } from "next/font/google";
import { Inter } from "next/font/google";

import { NextIntlClientProvider } from "next-intl";
import { Locale, routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";

import { constructMetadata } from "@/lib/utils";
import NavbarProvider from "@/components/NavbarProvider";
import "./globals.css";
import Footer from "@/components/footer";

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
          <meta name="theme-color" content="white" />
        </head>
        <body className={isArabic ? ibmArabic.className : inter.className}>
          <NextIntlClientProvider messages={messages}>
            <NavbarProvider />
            <main className="mx-auto min-h-dvh w-full max-w-base">
              {children}
              <Footer />
            </main>
          </NextIntlClientProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
