// app/layout.js

import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";
import { Toaster } from "sonner";
import { getCategoriesFromDB } from "@/lib/server/category";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Stole-UI - Free CSS Elements",
  description: "Discover and share beautiful CSS components",
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
