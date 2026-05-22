import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingActions from "@/components/FloatingActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elegant Auto Studio | Professional Auto Detailing Services Tashkent",
  description: "Experience premium automotive care in Tashkent. High-density noise insulation (Shumka) for Malibu, Gentra, Tahoe, BMW, and more.",
  keywords: "detailing, car detailing, ceramic coating, shumka, noise insulation, Tashkent, PPF, Gentra, Malibu, car polishing",
  openGraph: {
    title: "Elegant Auto Studio | Professional Auto Detailing",
    description: "Experience premium automotive care in Tashkent. High-density noise insulation (Shumka).",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark overflow-x-hidden max-w-full`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-gray-100 overflow-x-hidden relative">
        {/* Universal Ambient Mesh Background */}
        <div className="mesh-glow-bg" />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow z-10 overflow-x-hidden">{children}</main>

        {/* Global Floating Actions & Modal */}
        <FloatingActions />
      </body>
    </html>
  );
}
