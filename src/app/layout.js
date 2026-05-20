import { Toaster } from "react-hot-toast";


import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata = {
  title: "Pettopia - Pet Adoption Platform",
  description: "Find your new furry companion today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <Navbar/>
        <main className="min-h-[calc(100vh-16rem)]">
          {children}
        <Footer/>
        </main>

        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}