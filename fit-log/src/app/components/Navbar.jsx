"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planList = [], savedList = [] } = useContext(AppContext) || {};
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  return (
    <div className="navbar bg-darkBg text-white px-4 md:px-12 py-4 border-b border-gray-800 sticky top-0 z-50">
      <div className="navbar-start">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-black tracking-widest uppercase"
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={32}
            height={32}
            className="object-contain"
            priority // লোগো দ্রুত লোড হওয়ার জন্য
          />
          FITLOG
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-2">
          <li>
            <Link
              href="/"
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${pathname === "/" ? "bg-[#1a2015] text-brand" : "text-gray-400 hover:text-white"}`}
            >
              Workouts
            </Link>
          </li>
          <li>
            <Link
              href="/my-plan"
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${pathname === "/my-plan" ? "bg-[#1a2015] text-brand" : "text-gray-400 hover:text-white"}`}
            >
              My Plan
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-6 hidden sm:flex">
        <Link
          href="/my-plan"
          className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white"
        >
          Plan
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand text-black text-xs font-bold">
            {mounted ? planList.length : 0}
          </span>
        </Link>
        <Link
          href="/my-plan"
          className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white"
        >
          Saved
          <span className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-500 text-xs font-bold">
            {mounted ? savedList.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
}
