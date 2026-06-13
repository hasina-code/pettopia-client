import { AuthProvider } from "@/context/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "PetTopia",
  description: "Pet Adoption Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-slate-900 text-slate-50 antialiased"
      >
        <AuthProvider>
          <Navbar />

          {children}

          <Footer />

          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}