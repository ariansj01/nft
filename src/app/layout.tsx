import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/Background/ParticleBackground";
import Header from "@/components/Landing/Header";
import Footer from "@/components/Landing/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NFT Marketplace",
  description: "A modern NFT marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <ParticleBackground />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
