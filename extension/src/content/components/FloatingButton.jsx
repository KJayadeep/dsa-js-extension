import { Terminal } from "lucide-react";

export default function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6 z-[2147483647]
        group flex items-center gap-2.5
        rounded-2xl
        border border-white/15
        bg-[#0c0e14]/90 backdrop-blur-xl
        py-2.5 pl-3 pr-3.5
        text-xs font-medium text-white
        shadow-[0_12px_30px_rgba(0,0,0,0.6)]
        transition-all duration-200
        hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_16px_36px_rgba(16,185,129,0.15)]
        active:translate-y-0 active:scale-95
        cursor-pointer
      "
      title="Open JS DSA Assistant"
    >
      {/* Icon Badge with subtle gradient */}
      <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-black shadow-sm group-hover:scale-105 transition-transform">
        <Terminal size={13} strokeWidth={2.5} />
      </div>

      <div className="flex items-center gap-1.5">
        <span className="font-semibold tracking-tight text-gray-100 group-hover:text-white transition-colors">
          JS DSA
        </span>
      </div>

      {/* Radar Live Beacon */}
      <span className="relative flex h-2 w-2 ml-0.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
    </button>
  );
}
