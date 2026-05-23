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
  title: "Elegant Auto Studio | Namangan Deteyling va Avtoparvarish Markazi",
  description: "Namangandagi eng premium avto deteyling markazi. Avtomobillar uchun yuqori sifatli shovqin izolyatsiyasi (Shumka), 9H keramika qoplamasi, abraziv polirovka, kimyoviy tozalash (ximchiska), oyna qoraytirish (tonirovka) va PPF zirhli plyonkalar.",
  keywords: "detailing namangan, deteyling namangan, elegant auto studio, shumka namangan, shovqin izolyatsiyasi namangan, keramika namangan, polirovka namangan, ximchiska namangan, tonirovka namangan, ppf namangan, zirh plyonka namangan, avtotyuning namangan, avto parvarish",
  authors: [{ name: "Elegant Auto Studio" }],
  robots: "index, follow",
  openGraph: {
    title: "Elegant Auto Studio | Professional Deteyling Namangan",
    description: "Namanganda premium avto parvarish xizmatlari. Shumka, keramika, polirovka va ximchiska.",
    type: "website",
    locale: "uz_UZ",
    siteName: "Elegant Auto Studio",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden max-w-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 overflow-x-hidden relative">
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
