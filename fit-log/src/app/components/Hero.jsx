'use client';
import Image from 'next/image';
import { FaArrowDown } from 'react-icons/fa6'; 

export default function Hero() {
  const scrollToLibrary = () => {
    const librarySection = document.getElementById('library');
    if (librarySection) {
      librarySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#111315] rounded-[2rem] mx-4 md:mx-12 mt-8 p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between border border-gray-800/50">
      
      {/* Left Content Area */}
      <div className="lg:w-1/2 flex flex-col items-start space-y-6 mt-10 lg:mt-0">
        <p className="text-brand font-bold text-sm tracking-widest uppercase">
          WORKOUT LIBRARY
        </p>
        
        <h1 className="text-5xl md:text-7xl font-bold font-oswald uppercase leading-[1.1] text-white">
          Train With Intent. Log Every Set.
        </h1>
        
        <p className="text-gray-400 text-lg max-w-md leading-relaxed">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
        </p>
        
        <button 
          onClick={scrollToLibrary}
          className="btn bg-brand hover:bg-[#b3e600] text-black border-none font-bold px-8 py-3 h-auto rounded-md mt-4 transition-transform active:scale-95 flex items-center gap-2"
        >
          BROWSE WORKOUTS <FaArrowDown className="text-lg" />
        </button>
      </div>

      {/* Right Image Area */}
      <div className="lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0">
        <Image 
          src="/assets/banner.png" 
          alt="Workout Machine Illustration" 
          width={500}
          height={500}
          className="object-contain drop-shadow-2xl" 
          priority
        />
      </div>
      
    </div>
  );
}