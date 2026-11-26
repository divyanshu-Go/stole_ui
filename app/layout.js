// app/layout.js

import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";
import { Toaster } from "sonner";
import { getCategoriesFromDB } from "@/lib/server/category";
import { SITE_URL } from "@/lib/site-url";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: SITE_URL,
  title: {
    default: "Stole UI — Free CSS & UI Components",
    template: "%s | Stole UI",
  },
  description:
    "Discover, customize, and share free CSS and UI components made by the developer community.",
  applicationName: "Stole UI",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Stole UI",
    title: "Stole UI — Free CSS & UI Components",
    description:
      "Discover, customize, and share free CSS and UI components made by the developer community.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Stole UI — Free CSS & UI Components",
    description:
      "Discover, customize, and share free CSS and UI components made by the developer community.",
  },
};

export default async function RootLayout({ children }) {
  const categories = await getCategoriesFromDB();

  return (
    <html lang="en">
      <body className={`font-[Poppins] relative min-h-screen w-screen flex flex-col  overflow-x-hidden`}>
        <ClientLayout categories={categories}>
          {children}
        </ClientLayout>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
