import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FreelanceHub — Your All-in-One Tech Platform",
  description: "Courses, insights, AI tools, and IT services for tech professionals and businesses.",
  keywords: ["FreelanceHub", "tech courses", "AI tools", "QA testing", "SaaS", "web development"],
  icons: {
    icon: [
      { url: "/ns-logo.png", type: "image/png" },
    ],
    apple: "/ns-logo.png",
    shortcut: "/ns-logo.png",
  },
  openGraph: {
    title: "FreelanceHub",
    description: "Your All-in-One Tech Learning & Services Platform",
    url: "https://hub.naveensharma.net",
    siteName: "FreelanceHub",
    images: [{ url: "/ns-logo.png", width: 512, height: 512 }],
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
