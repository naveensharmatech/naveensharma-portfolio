import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Opility App — Courses, QA, SaaS & Career",
  description: "Free tech courses, AI tools, QA testing, SaaS implementation, and professional IT services — by Opility.",
  keywords: ["Opility", "tech courses", "AI tools", "QA testing", "SaaS", "web development"],
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/opility-logo.png", type: "image/png" }],
    apple: "/opility-logo.png",
    shortcut: "/opility-logo.png",
  },
  openGraph: {
    title: "Opility App",
    description: "Free tech courses in QA, AI, SaaS, and web development — learn from a working professional.",
    url: "https://app.opility.com",
    siteName: "Opility",
    images: [{ url: "/opility-logo.png", width: 512, height: 512 }],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0f172a] text-slate-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
