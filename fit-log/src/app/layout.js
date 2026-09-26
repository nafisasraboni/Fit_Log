import { Geist, Geist_Mono, Oswald } from "next/font/google";
import { AppProvider } from '@/context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./globals.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata = {
  title: "FitLog | Workout Library",
  description: "FitLog is a dark, no-nonsense gym companion.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        {/* AppProvider দিয়ে র‍্যাপ করা হলো যেন Context API কাজ করে */}
        <AppProvider>
          
          <Navbar></Navbar>
          <Hero></Hero>
          
          {/* flex-grow দেওয়ার কারণে ফুটার সবসময় নিচে থাকবে */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* টোস্ট নোটিফিকেশন দেখানোর জন্য */}
          <ToastContainer position="bottom-right" theme="dark" />
          
        </AppProvider>
      </body>
    </html>
  );
}