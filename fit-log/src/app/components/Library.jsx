"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegClock, FaFire, FaStar } from "react-icons/fa6";

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API is not returning valid JSON data");
        }

        const data = await res.json();
        console.log("API Data Sample:", data[0]);
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section id="library" className="px-4 md:px-12 py-12">
      <div className="mb-10">
        <h2 className="text-4xl font-oswald font-black uppercase text-white mb-2">
          THE LIBRARY
        </h2>
        <p className="text-gray-400 text-sm">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-brand"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <Link
              href={`/workout/${workout.id || workout._id}`}
              key={workout.id || workout._id}
            >
              <div className="bg-[#15171a] rounded-xl overflow-hidden cursor-pointer border border-transparent hover:border-gray-600 transition duration-300 flex flex-col h-full">
                {/* Card Image */}
                <div className="relative w-full h-56 bg-gray-800">
                  <Image
                    src={workout.image || "/assets/banner.png"}
                    alt={workout.name || "Workout"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex gap-2 mb-3">
                    {workout.muscleGroups?.map((group, idx) => (
                      <span
                        key={idx}
                        className="bg-brand text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                      >
                        {group}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-white font-oswald font-bold text-2xl uppercase leading-tight mb-1">
                    {workout.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">
                    {workout.equipment}
                  </p>

                  <div className="flex items-center gap-5 text-gray-400 text-xs font-medium pt-4 border-t border-gray-800/60 mt-auto">
                    <div className="flex items-center gap-1.5">
                      <FaRegClock className="text-gray-500" />{" "}
                      {workout.duration || 0} min
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaFire className="text-gray-500" />{" "}
                      {workout.caloriesBurned || 0} kcal
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaStar className="text-gray-500" /> {workout.rating || 0}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
