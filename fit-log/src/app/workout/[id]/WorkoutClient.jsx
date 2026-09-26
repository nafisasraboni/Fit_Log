'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function WorkoutClient({ id }) {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkoutDetail = async () => {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch workout details');
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
        <div className="relative w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-[#15171a] border border-gray-800">
          <Image
            src={workout.image || '/assets/banner.png'}
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
        
        {/* Placeholder for tags, stats table, and buttons */}
        <div className="bg-[#15171a] p-5 rounded-xl border border-gray-800 h-64 flex items-center justify-center text-gray-500">
           Stats, Instructions, and Action Buttons will go here...
        </div>
      </div>
      
    </div>
  );
}