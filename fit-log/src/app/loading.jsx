export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh]">
      <span className="loading loading-spinner loading-lg text-brand mb-4"></span>
      <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">
        Loading workouts...
      </p>
    </div>
  );
}