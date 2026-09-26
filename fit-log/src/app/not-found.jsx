import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4">
      <div className="text-brand text-6xl mb-4">
        <FaExclamationTriangle />
      </div>
      <h1 className="text-6xl font-oswald font-black text-white mb-2 tracking-wide">
        404
      </h1>
      <h2 className="text-2xl font-oswald uppercase text-brand font-bold mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-400 text-sm max-w-md mb-8">
        The page you are looking for does not exist or has been moved. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="bg-brand text-black font-bold uppercase text-sm px-8 py-4 rounded-xl hover:bg-white transition-colors shadow-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
}