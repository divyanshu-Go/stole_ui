import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout"; // NEW
import { Toaster } from "sonner";
import { getCategory, getUserProfile } from "@/lib/api";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Stole-UI - Free CSS Elements",
  description: "Discover and share beautiful CSS components",
};

export default async function RootLayout({ children }) {
  const user = await getUserProfile();
  const categories = await getCategory();
  return (
    <html lang="en">
      <body className={`font-[Poppins] relative min-h-screen flex flex-col overflow-x-hidden`}>
        <ClientLayout categories={categories} user={user}>{children}</ClientLayout>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
