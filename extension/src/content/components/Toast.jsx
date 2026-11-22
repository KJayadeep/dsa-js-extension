import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import { useEffect } from "react";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 3200);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />,
    warning: <AlertTriangle size={14} className="text-amber-400 shrink-0" />,
    error: <AlertTriangle size={14} className="text-rose-400 shrink-0" />,
    info: <Info size={14} className="text-cyan-400 shrink-0" />,
  };

  const borders = {
    success: "border-emerald-500/30 bg-emerald-950/40 text-emerald-100",
    warning: "border-amber-500/30 bg-amber-950/40 text-amber-100",
    error: "border-rose-500/30 bg-rose-950/40 text-rose-100",
    info: "border-cyan-500/30 bg-cyan-950/40 text-cyan-100",
  };

  return (
    <div
      className={`
        absolute top-14 left-3 right-3 z-50
        flex items-center justify-between gap-2.5
        rounded-xl border backdrop-blur-xl px-3 py-2
        text-xs font-medium shadow-2xl
        jsdsa-animate-in
        ${borders[toast.type || "success"]}
      `}
    >
      <div className="flex items-center gap-2">
        {icons[toast.type || "success"]}
        <span className="leading-snug">{toast.message}</span>
      </div>
      <button
        onClick={onClose}
        className="rounded p-0.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
      >
        <X size={12} />
      </button>
    </div>
  );
}
