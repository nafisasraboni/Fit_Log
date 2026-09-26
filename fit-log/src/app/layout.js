import { Geist, Geist_Mono, Oswald } from "next/font/google";
import { AppProvider } from '@/context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


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
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <AppProvider>
          
          <Navbar />
          
          <main className="grow">
            {children}
          </main>
          <Footer></Footer>
          
          <ToastContainer position="top-right" theme="dark" limit={1} />
          
        </AppProvider>
      </body>
    </html>
  );
}