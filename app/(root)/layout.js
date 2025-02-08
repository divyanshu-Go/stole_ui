
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <main className={inter.className}>
      <div className=" relative min-h-screen flex flex-col mx-6">
            <Header />
            <main className=" flex-1">{children}</main>
            <Footer />
          </div>
    </main>
  );
}
