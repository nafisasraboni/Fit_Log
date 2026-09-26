import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-darkBg flex items-center justify-center flex-col gap-4">
      <h1 className="text-white text-3xl font-bold">Tailwind Config Test</h1>

      {/* DaisyUI Button + Custom Accent Color */}
      <button className="btn bg-brand text-black font-bold border-none hover:bg-white">
        If this is Lime Green, it works!
      </button>
    </div>
  );
}
