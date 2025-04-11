import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Stole-UI - Free CSS Elements",
  description: "Discover and share beautiful CSS components",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-[Poppins] relative min-h-screen flex flex-col `}>
        
        <Header />
        <main className="mt-16 mx-auto px-5 py-16 container flex flex-col flex-1">{children}</main>
        <Footer />

        <Toaster position="top-right" richColors />
        
      </body>
    </html>
  );
}
