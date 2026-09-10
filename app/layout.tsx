import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arena Plus — Live Sports Streaming",
  description:
    "Every Match. One Tap Away. Live sports streaming for 1,000 UGX/day. Watch football, basketball, tennis, cricket and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-background text-white font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
