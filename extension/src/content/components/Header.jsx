import { Terminal, X, Cpu, BookOpen, Sliders } from "lucide-react";

export default function Header({ activeTab, onTabChange, onClose }) {
  const tabs = [
    { id: "dashboard", label: "Scan", icon: Cpu },
    { id: "library", label: "Library", icon: BookOpen },
    { id: "settings", label: "Settings", icon: Sliders },
  ];

  return (
    <header className="border-b border-white/[0.08] bg-[#0c0e14]/95 backdrop-blur-md">
      {/* Top Brand Bar */}
      <div className="flex h-12 items-center justify-between px-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 text-black shadow-sm">
            <Terminal size={13} strokeWidth={2.5} />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold tracking-tight text-white">
              JS DSA
            </span>
            <span className="font-mono text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded-md">
              v0.1
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <nav className="flex items-center gap-1 rounded-xl bg-white/[0.04] p-1 border border-white/[0.06]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all
                  ${
                    isActive
                      ? "bg-white/12 text-white shadow-sm border border-white/10"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
                  }
                `}
              >
                <Icon size={12} className={isActive ? "text-emerald-400" : "text-gray-400"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          title="Close panel"
        >
          <X size={14} />
        </button>
      </div>
    </header>
  );
}
