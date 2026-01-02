import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calorised | UK Restaurant Calorie Guide",
  description: "Discover calorie information for UK restaurants and cafes. Make informed dining decisions with our comprehensive nutrition database.",
  keywords: ["calories", "UK restaurants", "nutrition", "calorie counter", "healthy eating"],
  openGraph: {
    title: "Calorised | UK Restaurant Calorie Guide",
    description: "Discover calorie information for UK restaurants and cafes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
      </head>
      <body className="antialiased">
        <div className="bg-mesh" aria-hidden="true" />
        <div className="grid-pattern fixed inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
