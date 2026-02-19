import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { I18nProvider } from "@/components/providers/I18nProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Israel Nicodemus | Fullstack Developer",
    template: "%s | Israel Nicodemus",
  },
  description:
    "Passionate fullstack developer specializing in React, Node.js, and modern web technologies. Building high-performance applications that make an impact.",
  keywords: [
    "fullstack developer",
    "react developer",
    "node.js developer",
    "web developer",
    "software engineer",
    "portfolio",
  ],
  authors: [{ name: "Israel Nicodemus" }],
  creator: "Israel Nicodemus",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Israel Nicodemus | Fullstack Developer",
    description:
      "Passionate fullstack developer specializing in React, Node.js, and modern web technologies.",
    siteName: "Israel Nicodemus Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Israel Nicodemus | Fullstack Developer",
    description:
      "Passionate fullstack developer specializing in React, Node.js, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
