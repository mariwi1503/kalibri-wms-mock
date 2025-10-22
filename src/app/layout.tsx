import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});


export const metadata: Metadata = {
  title: "Kalibri Warehouse",
  description: "Aplikasi penyewaan gudang terbaik",
  icons: {
    icon: "/favicon.ico", // icon utama
    shortcut: "/favicon-16x16.png", // optional
    apple: "/apple-touch-icon.png", // untuk iOS
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className={nunito.className}>
          {children}
      </body>
    </html>
  );
}
