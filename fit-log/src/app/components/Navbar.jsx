"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import { FaDumbbell, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { planList = [], savedList = [] } = useContext(AppContext);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full px-4 md:px-12 py-6 flex items-center justify-between border-b border-gray-800/60 bg-[#0f1113]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl p-1 focus:outline-none cursor-pointer"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 text-white font-oswald font-black text-lg md:text-xl tracking-wider"
        >
          <span className="bg-brand text-black p-1.5 md:p-2 rounded-xl flex items-center justify-center">
            <FaDumbbell className="text-base md:text-lg" />
          </span>
          FITLOG
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 bg-[#15171a] border border-gray-800 px-6 py-2 rounded-full">
        <Link
          href="/"
          className={`text-sm font-bold uppercase tracking-wider transition-colors ${
            pathname === "/" ? "text-brand" : "text-gray-400 hover:text-white"
          }`}
        >
          Workouts
        </Link>
        <Link
          href="/my-plan"
          className={`text-sm font-bold uppercase tracking-wider transition-colors ${
            pathname === "/my-plan"
              ? "text-brand"
              : "text-gray-400 hover:text-white"
          }`}
        >
          My Plan
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Link
          href="/my-plan"
          className="flex items-center gap-1.5 md:gap-2 text-white font-bold text-xs md:text-sm bg-[#15171a] border border-gray-800 px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:border-brand transition-all cursor-pointer shadow-md"
        >
          <span>Plan</span>
          <span className="w-5 h-5 md:w-6 md:h-6 bg-brand text-black rounded-full flex items-center justify-center text-[10px] md:text-xs font-black shadow-md">
            {planList.length}
          </span>
        </Link>
        <Link
          href="/my-plan"
          className="flex items-center gap-1.5 md:gap-2 text-white font-bold text-xs md:text-sm bg-[#15171a] border border-gray-800 px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:border-gray-600 transition-all cursor-pointer shadow-md"
        >
          <span>Saved</span>
          <span className="w-5 h-5 md:w-6 md:h-6 border border-gray-600 text-white rounded-full flex items-center justify-center text-[10px] md:text-xs font-black">
            {savedList.length}
          </span>
        </Link>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#15171a] border-b border-gray-800 p-6 flex flex-col gap-4 md:hidden shadow-2xl">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`text-base font-bold uppercase tracking-wider py-2 ${
              pathname === "/" ? "text-brand" : "text-gray-300"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setIsOpen(false)}
            className={`text-base font-bold uppercase tracking-wider py-2 ${
              pathname === "/my-plan" ? "text-brand" : "text-gray-300"
            }`}
          >
            My Plan
          </Link>
        </div>
      )}
    </nav>
  );
}
