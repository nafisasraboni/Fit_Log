'use client';
import { useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppContext } from '@/context/AppContext';
import { FaTrash, FaArrowRight, FaRegBookmark, FaCalendarDays } from 'react-icons/fa6';

export default function MyPlanPage() {
  const { planList = [], savedList = [], removeFromPlan } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' অথবা 'saved'
  const [sortBy, setSortBy] = useState('duration'); // 'duration' অথবা 'calories'

  const currentList = activeTab === 'plan' ? planList : savedList;

  // ক্যালকুলেশন: মোট এক্সারসাইজ, মোট সময় এবং মোট ক্যালোরি (শুধুমাত্র Today's Plan এর জন্য)
  const totalExercises = planList.length;
  const totalMinutes = planList.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
  const totalCalories = planList.reduce((acc, curr) => acc + (Number(curr.caloriesBurned) || 0), 0);

  // সর্টিং লজিক
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'duration') {
      return (Number(b.duration) || 0) - (Number(a.duration) || 0);
    } else if (sortBy === 'calories') {
      return (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0);
    }
    return 0;
  });

  return (
    <div className="px-4 md:px-12 py-10 max-w-7xl mx-auto min-h-[80vh]">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-oswald font-black uppercase text-white tracking-wide mb-2">
          My Plan
        </h1>
        <p className="text-gray-400 text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Stats Overview Panel (ডিমোর আদলে তৈরি) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-[#15171a] border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-1">Exercises</p>
          <h3 className="text-4xl font-oswald font-black text-brand">{totalExercises}</h3>
        </div>
        <div className="bg-[#15171a] border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-1">Minutes</p>
          <h3 className="text-4xl font-oswald font-black text-white">{totalMinutes}</h3>
        </div>
        <div className="bg-[#15171a] border border-gray-800 p-6 rounded-2xl">
          <p className="text-gray-500 font-bold uppercase text-xs tracking-wider mb-1">Calories</p>
          <h3 className="text-4xl font-oswald font-black text-white">{totalCalories}</h3>
        </div>
      </div>

      {/* Tabs and Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        {/* Tab Switcher */}
        <div className="flex bg-[#15171a] border border-gray-800 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('plan')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'plan'
                ? 'bg-brand text-black shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-brand text-black shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-3 bg-[#15171a] border border-gray-800 px-4 py-2 rounded-2xl">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-white font-bold text-sm outline-none cursor-pointer"
          >
            <option value="duration" className="bg-[#15171a] text-white">Duration</option>
            <option value="calories" className="bg-[#15171a] text-white">Calories</option>
          </select>
        </div>
      </div>

      {/* Content Section */}
      {sortedList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-[#15171a] border border-dashed border-gray-800 rounded-3xl text-center px-4">
          <h3 className="text-white font-oswald text-3xl uppercase font-bold mb-2 tracking-wide">
            Nothing Here Yet
          </h3>
          <p className="text-gray-400 text-sm max-w-md mb-8">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-brand text-black font-bold uppercase text-sm px-8 py-4 rounded-xl hover:bg-white transition-colors flex items-center gap-2 shadow-lg"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedList.map((workout) => {
            const workoutId = workout.id || workout._id;
            return (
              <div
                key={workoutId}
                className="bg-[#15171a] border border-gray-800 rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-brand/50 transition-all duration-300"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative w-full h-48 overflow-hidden bg-gray-900">
                    <Image
                      src={workout.image || "/assets/banner.png"}
                      alt={workout.name || "Workout"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand uppercase">
                      {workout.difficulty || "All Levels"}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <h3 className="text-xl font-oswald font-bold uppercase text-white mb-2 group-hover:text-brand transition-colors">
                      {workout.name}
                    </h3>
                    <p className="text-gray-400 text-xs line-clamp-2 mb-4">
                      {workout.description || "No description available."}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {workout.muscleGroups?.map((group, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-800 text-gray-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase"
                        >
                          {group}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between text-xs text-gray-400 border-t border-gray-800 pt-3">
                      <span>Duration: <strong className="text-white">{workout.duration || 0} min</strong></span>
                      <span>Calories: <strong className="text-white">{workout.caloriesBurned || 0} kcal</strong></span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 flex items-center gap-3">
                  <Link
                    href={`/workout/${workoutId}`}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-center font-bold text-xs uppercase py-3 rounded-xl transition-colors"
                  >
                    View Details
                  </Link>

                  {activeTab === 'plan' && (
                    <button
                      onClick={() => removeFromPlan(workoutId)}
                      className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-3 rounded-xl transition-colors cursor-pointer border border-red-500/20"
                      title="Remove from plan"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}