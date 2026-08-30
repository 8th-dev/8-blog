import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
      className={`${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b">
          <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-5">
            <Link
              className="text-base font-semibold no-underline"
              href="/"
            >
              8th Blog
            </Link>
            <p className="text-sm">Notes in progress</p>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
