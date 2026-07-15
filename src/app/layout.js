import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  metadataBase: new URL("https://vikrant-portfolio-chi.vercel.app"),
  title: {
    default: "Vikrant Kumar — AI Researcher & Data Scientist",
    template: "%s · Vikrant Kumar",
  },
  description:
    "M.Tech Data Science & Engineering student at NIT Silchar working on Medical AI, Computer Vision, and Generative AI research.",
  openGraph: {
    title: "Vikrant Kumar — AI Researcher & Data Scientist",
    description:
      "M.Tech Data Science & Engineering student at NIT Silchar working on Medical AI, Computer Vision, and Generative AI research.",
    url: "https://vikrant-portfolio-chi.vercel.app",
    siteName: "Vikrant Kumar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikrant Kumar — AI Researcher & Data Scientist",
    description:
      "M.Tech Data Science & Engineering student at NIT Silchar working on Medical AI, Computer Vision, and Generative AI research.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col antialiased" style={{ fontFamily: "var(--font-sans), Arial, Helvetica, sans-serif" }}>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
