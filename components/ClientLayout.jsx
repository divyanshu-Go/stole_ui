// components/ClientLayout.jsx
"use client";

import { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Header from "./Header";
import { AuthUserProvider } from "./AuthUserProvider";

export default function ClientLayout({ children, categories }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleRef = useRef();

  return (
    <AuthUserProvider>
      <div className="relative">
        <Header open={sidebarOpen} setOpen={setSidebarOpen} toggleRef={toggleRef}/>
        <Sidebar categories={categories || []} open={sidebarOpen} setOpen={setSidebarOpen} toggleRef={toggleRef}/>
        <main className="mt-16 mx-auto px-4 py-8 container flex flex-col flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </AuthUserProvider>
  );
}
