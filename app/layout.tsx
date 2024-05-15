import type { Metadata } from "next";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "./theme-provider";
import { NextAuthProvider } from "@/app/session-provider";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/Footer";
import { LoadingContextProvider } from "./loading-provider";
import { Suspense } from "react";
import { NavigationEvents } from "@/components/blocks/NavigationEvents";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import siteConfig from "@/public/assets/content/site-config.json";
const googleSans = localFont({
  src: [
    {
      path: "../public/assets/fonts/GoogleSans-Regular_0.ttf",
      weight: "400",
    },
    {
      path: "../public/assets/fonts/GoogleSans-Bold-v1.27.ttf",
      weight: "700",
    },
  ],
  variable: "--font-google",
});
export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },

  description: siteConfig.description,
  authors: siteConfig.authors,

  icons: "./favicon.ico",
  openGraph: {
    title: siteConfig.title,
    images: [`${siteConfig.ogImage ?? ""}`],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    images: [`${siteConfig.ogImage ?? ""}`],
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body
        className={`${googleSans.className} w-full max-w-screen-2xl mx-auto`}
      >
        {" "}
        <LoadingContextProvider>
          <NextAuthProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='dark'
              enableSystem
              disableTransitionOnChange
            >
              <Navbar session={session} />
              {children}
              <Footer />
              <Toaster />
              <Suspense fallback={null}>
                <NavigationEvents />
              </Suspense>
            </ThemeProvider>
          </NextAuthProvider>
        </LoadingContextProvider>
      </body>
    </html>
  );
}
