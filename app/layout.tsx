Exit code: 0
Wall time: 0.3 seconds
Output:
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const ogImage = `${protocol}://${host}/og.png`;

  return {
    title: "KoraFlow ??School approvals without the chase",
    description: "A low-friction procurement and approval workflow for growing schools.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "KoraFlow ??School approvals without the chase",
      description: "A low-friction procurement and approval workflow for growing schools.",
      images: [{ url: ogImage, width: 1731, height: 909, alt: "KoraFlow school approval workflow" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "KoraFlow ??School approvals without the chase",
      description: "A low-friction procurement and approval workflow for growing schools.",
      images: [ogImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

