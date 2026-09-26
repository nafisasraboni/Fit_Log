'use client';
import { useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppContext } from '@/context/AppContext';
import { toast } from 'react-toastify';
import { FaTimes, FaCheck, FaClock, FaFire, FaStar, FaChevronDown } from 'react-icons/fa';

export default function MyPlanPage() {
  const { planList = [], savedList = [], removeFromPlan, removeFromSaved } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' অথবা 'saved'
  const [sortBy, setSortBy] = useState('duration'); // 'duration', 'calories', 'rating'
  const [completedWorkouts, setCompletedWorkouts] = useState([]);

  const currentList = activeTab === 'plan' ? planList : savedList;

  // লাইভ মেট্রিকস সামারি (Metrics Summary: Exercises, Minutes, Calories)
  const totalExercises = planList.length;
  const totalMinutes = planList.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
  const totalCalories = planList.reduce((acc, curr) => acc + (Number(curr.caloriesBurned) || 0), 0);

  // সর্টিং লজিক (Duration, Calories, Rating)
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'duration') {
      return (Number(b.duration) || 0) - (Number(a.duration) || 0);
    } else if (sortBy === 'calories') {
      return (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0); // ফিক্সড: b বনাম a তুলনামূলক ক্যালোরি সর্ট
    } else if (sortBy === 'rating') {
      return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    }
    return 0;
  });

  // Mark as Done হ্যান্ডলার
  const toggleMarkAsDone = (workout) => {
    const workoutId = workout.id || workout._id;
    if (completedWorkouts.includes(workoutId)) {
      setCompletedWorkouts(completedWorkouts.filter(item => item !== workoutId));
      toast.info(`Marked "${workout.name}" as pending`, { toastId: `undo-${workoutId}` });
    } else {
      setCompletedWorkouts([...completedWorkouts, workoutId]);
      toast.success(`Completed "${workout.name}"! Great job!`, { toastId: `done-${workoutId}` });
    }
  };

  // রিমুভ হ্যান্ডলার (ট্যাব অনুযায়ী সঠিক ফাংশন কল করবে)
  const handleRemove = (workout) => {
    const workoutId = workout.id || workout._id;
    if (activeTab === 'plan') {
      removeFromPlan(workoutId);
    } else {
      removeFromSaved(workoutId);
    }
  };

  return (
    <div className="px-4 md:px-12 py-10 max-w-7xl mx-auto min-h-[80vh]">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-oswald font-black uppercase text-white tracking-wide mb-2">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (3 Stat Cards - Live Updating) */}
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
        {/* Tabs: Today's Plan / Saved */}
        <div className="flex bg-[#15171a] border border-gray-800 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'plan'
                ? 'bg-brand text-black shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-brand text-black shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-3 bg-[#15171a] border border-gray-800 px-4 py-2 rounded-2xl relative">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Sort By</span>
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-white font-bold text-sm outline-none cursor-pointer appearance-none pr-6"
            >
              <option value="duration" className="bg-[#15171a] text-white">Duration</option>
              <option value="calories" className="bg-[#15171a] text-white">Calories</option>
              <option value="rating" className="bg-[#15171a] text-white">Rating</option>
            </select>
            <FaChevronDown className="text-gray-400 text-xs absolute right-0 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Content Section / Empty State */}
      {sortedList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-[#15171a] border border-dashed border-gray-800 rounded-3xl text-center px-4">
          <h3 className="text-white font-oswald text-3xl uppercase font-bold mb-2 tracking-wide">
            NOTHING HERE YET
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
        <div className="flex flex-col gap-4">
          {sortedList.map((workout) => {
            const workoutId = workout.id || workout._id;
            const isDone = completedWorkouts.includes(workoutId);

            return (
              <div
                key={workoutId}
                className="bg-[#15171a] border border-gray-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-gray-700 transition-all"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-gray-900 shrink-0">
                    <Image
                      src={workout.image || "/assets/banner.png"}
                      alt={workout.name || "Workout"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-oswald font-bold uppercase text-white tracking-wide">
                      {workout.name}
                    </h3>
                    <p className="text-gray-400 text-xs mb-2">
                      {workout.equipment || workout.muscleGroups?.[0] || "General"}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-brand text-[10px]" /> {workout.duration || 0} min
                      </span>
                      <span className="flex items-center gap-1">
                        <FaFire className="text-brand text-[10px]" /> {workout.caloriesBurned || 0} kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <FaStar className="text-brand text-[10px]" /> {workout.rating || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <Link
                    href={`/workout/${workoutId}`}
                    className="bg-transparent border border-gray-700 hover:bg-gray-800 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-xl transition-colors text-center"
                  >
                    View Details
                  </Link>

                  {activeTab === 'plan' && (
                    <button
                      onClick={() => toggleMarkAsDone(workout)}
                      className={`font-bold text-xs uppercase px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                        isDone
                          ? 'bg-gray-800 text-gray-400 border border-gray-700'
                          : 'bg-brand text-black hover:bg-white'
                      }`}
                    >
                      <FaCheck className="text-sm" />
                      {isDone ? "Completed" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() => handleRemove(workout)}
                    className="text-gray-500 hover:text-red-500 p-2.5 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}