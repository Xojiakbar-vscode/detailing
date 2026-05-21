import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageSquare, Send } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APEX Detailing | Professional Auto Detailing Services Tashkent",
  description: "Experience premium automotive care in Tashkent. Dual-layer 9H Ceramic coatings, high-density noise insulation (Shumka), PPF body wrapping, and interior dry cleaning for Malibu, Gentra, Tahoe, BMW, and more.",
  keywords: "detailing, car detailing, ceramic coating, shumka, noise insulation, Tashkent, PPF, Gentra, Malibu, car polishing",
  openGraph: {
    title: "APEX Detailing | Professional Auto Detailing",
    description: "Experience premium automotive care in Tashkent. Ceramic coatings, noise insulation (Shumka), and PPF wrapping.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-gray-100 overflow-x-hidden relative">
        {/* Universal Ambient Mesh Background */}
        <div className="mesh-glow-bg" />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow z-10">{children}</main>

        {/* Global Footer */}
        <Footer />

        {/* Floating Booking Contact Triggers */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3.5">
          {/* WhatsApp Floating */}
          <a
            href="https://wa.me/998901234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-green-400 hover:from-green-500 hover:to-emerald-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_30px_rgba(52,211,153,0.5)] transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 border border-white/10 group"
            title="Chat via WhatsApp"
            id="whatsapp-floating-btn"
          >
            <MessageSquare className="w-5.5 h-5.5 transition-transform duration-300 group-hover:rotate-12" />
          </a>

          {/* Telegram Floating */}
          <a
            href="https://t.me/apex_detailing_demo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-sky-600 to-[#00c2ff] hover:from-[#00c2ff] hover:to-sky-500 text-white shadow-[0_4px_20px_rgba(0,112,243,0.3)] hover:shadow-[0_4px_30px_rgba(0,194,255,0.5)] transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 border border-white/10 group"
            title="Chat via Telegram"
            id="telegram-floating-btn"
          >
            <Send className="w-5.5 h-5.5 -translate-x-[1px] translate-y-[1px] transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
          </a>
        </div>
      </body>
    </html>
  );
}
