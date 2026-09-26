import WorkoutClient from "./WorkoutClient";

export async function generateStaticParams() {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
    if (!res.ok) {
      return [];
    }
    const workouts = await res.json();

    return workouts.map((workout) => ({
      id: workout.id?.toString() || workout._id?.toString(),
    }));
  } catch (error) {
    console.error("Failed to fetch workouts for static params", error);
    return [];
  }
}

export default async function WorkoutDetails({ params }) {
  const resolvedParams = await params;

  return <WorkoutClient id={resolvedParams.id} />;
}
