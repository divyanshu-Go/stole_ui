
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Stole-UI - Free CSS Elements",
  description: "Discover and share beautiful CSS components",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col">
          {children}
      </body>
    </html>
  );
}
