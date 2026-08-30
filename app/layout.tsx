import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
    default: "8th Blog",
    template: "%s | 8th Blog",
  },
  description: "Notes, experiments, and things learned along the way.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-5">
            <Link
              className="text-base font-semibold text-zinc-950 transition-colors hover:text-zinc-500 dark:text-zinc-50 dark:hover:text-zinc-400"
              href="/"
            >
              8th Blog
            </Link>
            <p className="text-sm text-zinc-500">Notes in progress</p>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
