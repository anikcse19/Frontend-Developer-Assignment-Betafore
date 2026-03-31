import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const centuryGothic = localFont({
  src: [
    {
      path: "../fonts/centurygothic.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/centurygothic_bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-century-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WinStore - Shop Electronics, Fashion & More",
  description:
    "Your one-stop e-commerce destination for electronics, fashion, appliances and more. Best deals and new arrivals updated daily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${centuryGothic.variable} h-full antialiased`}>
      <body className={`${centuryGothic.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
