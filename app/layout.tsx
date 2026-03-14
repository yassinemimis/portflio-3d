import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Yassine Mimis — 3D Portfolio",
  description: "Full-Stack Developer · React · Three.js · Next.js",
  keywords: ["portfolio", "developer", "react", "three.js", "next.js", "webgl"],
  authors: [{ name: "Yassine Mimis" }],
  themeColor: "#000810",
  openGraph: {
    title: "Yassine Mimis — 3D Portfolio",
    description: "Full-Stack Developer building immersive web experiences.",
    url: "https://www.kherboucheyassine.me/",
    siteName: "kherboucheyassine.me",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-hidden" style={{ background: "#000810" }}>
        {children}
      </body>
    </html>
  );
}
