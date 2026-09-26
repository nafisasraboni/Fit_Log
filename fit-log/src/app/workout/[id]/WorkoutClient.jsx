"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaCalendarPlus, FaRegBookmark } from 'react-icons/fa6';

export default function WorkoutClient({ id }) {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkoutDetail = async () => {
      try {
        const res = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch workout details");
        }

        const data = await res.json();
        setWorkout(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-brand"></span>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="text-center text-red-500 mt-10">
        <h2 className="text-2xl font-bold">Error</h2>
        <p>{error || "Workout not found"}</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 py-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
      {/* Left Side — Visual/Media */}
      <div className="w-full lg:w-1/2">
        <div className="relative w-full aspect-square md:aspect-4/5 rounded-3xl overflow-hidden bg-[#15171a] border border-gray-800">
          <Image
            src={workout.image || "/assets/banner.png"}
            alt={workout.name || "Workout"}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Right Side — Sections */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start">
        <h1 className="text-5xl font-oswald font-black uppercase text-white mb-4">
          {workout.name}
        </h1>
        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          {workout.description || "Description not available."}
        </p>

        {/* Category Tags */}
        <div className="flex gap-3 mb-8">
          {workout.muscleGroups?.map((group, idx) => (
            <span
              key={idx}
              className="bg-brand text-black font-bold px-4 py-1.5 rounded-full uppercase text-sm tracking-wider"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Key Specs Table / Panel */}
        <div className="bg-[#15171a] border border-gray-800 rounded-xl overflow-hidden mb-8">
          <div className="flex justify-between px-5 py-4 border-b border-gray-800">
            <span className="text-gray-500 font-bold uppercase text-[13px] tracking-wider">
              Equipment
            </span>
            <span className="text-white font-medium text-sm">
              {workout.equipment || "-"}
            </span>
          </div>
          <div className="flex justify-between px-5 py-4 border-b border-gray-800">
            <span className="text-gray-500 font-bold uppercase text-[13px] tracking-wider">
              Difficulty
            </span>
            <span className="text-white font-medium text-sm">
              {workout.difficulty || "-"}
            </span>
          </div>
          <div className="flex justify-between px-5 py-4 border-b border-gray-800">
            <span className="text-gray-500 font-bold uppercase text-[13px] tracking-wider">
              Sets
            </span>
            <span className="text-white font-medium text-sm">
              {workout.sets || "-"}
            </span>
          </div>
          <div className="flex justify-between px-5 py-4 border-b border-gray-800">
            <span className="text-gray-500 font-bold uppercase text-[13px] tracking-wider">
              Reps
            </span>
            <span className="text-white font-medium text-sm">
              {workout.reps || "-"}
            </span>
          </div>
          <div className="flex justify-between px-5 py-4 border-b border-gray-800">
            <span className="text-gray-500 font-bold uppercase text-[13px] tracking-wider">
              Duration
            </span>
            <span className="text-white font-medium text-sm">
              {workout.duration || 0} min
            </span>
          </div>
          <div className="flex justify-between px-5 py-4 border-b border-gray-800">
            <span className="text-gray-500 font-bold uppercase text-[13px] tracking-wider">
              Calories
            </span>
            <span className="text-white font-medium text-sm">
              {workout.caloriesBurned || 0} kcal
            </span>
          </div>
          <div className="flex justify-between px-5 py-4">
            <span className="text-gray-500 font-bold uppercase text-[13px] tracking-wider">
              Rating
            </span>
            <span className="text-white font-medium text-sm">
              {workout.rating || 0}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-10">
          <h3 className="text-white font-oswald font-bold text-xl uppercase tracking-wider mb-4">
            Instructions
          </h3>
          <ol className="list-decimal list-outside ml-4 text-gray-300 space-y-3">
            {workout.instructions?.map((step, idx) => (
              <li key={idx} className="leading-relaxed text-sm pl-1">
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          
          {/* Primary Button */}
          <button 
            className="flex-1 bg-brand text-black font-bold text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors"
          >
            <FaCalendarPlus className="text-lg" />
            Add to today&apos;s plan
          </button>
          
          {/* Secondary Button */}
          <button 
            className="flex-1 bg-transparent border border-gray-600 text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <FaRegBookmark className="text-lg" />
            Save for later
          </button>

        </div>
      </div>
    </div>
  );
}
