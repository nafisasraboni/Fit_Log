import Link from "next/link";
import { FaDumbbell } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800/60 py-8 px-4 md:px-12 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <FaDumbbell className="text-brand text-xl" />
          <span className="text-white font-oswald font-bold text-xl tracking-widest">
            FITLOG
          </span>
        </Link>

        <p className="text-gray-500 text-sm font-medium text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
