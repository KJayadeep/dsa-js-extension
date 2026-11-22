import { useState, useEffect } from "react";
import { Sliders, RotateCcw, Check, Terminal, ExternalLink } from "lucide-react";
import { DATA_STRUCTURES_CATALOG } from "../datastructures";

const DEFAULT_SETTINGS = {
  autoScan: true,
  injectionPosition: "top", // "top" | "cursor"
  showComplexity: true,
};

export default function Settings({ onNotify }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      if (typeof chrome !== "undefined" && chrome?.storage?.local) {
        chrome.storage.local.get(["jsDsaSettings"], (res) => {
          if (res?.jsDsaSettings) {
            setSettings({ ...DEFAULT_SETTINGS, ...res.jsDsaSettings });
          }
        });
      } else {
        const local = localStorage.getItem("jsDsaSettings");
        if (local) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(local) });
      }
    } catch {
      // ignore
    }
  }, []);

  const updateSetting = (key, value) => {
    const next = { ...settings, [key]: value };
    setSettings(next);

    try {
      if (typeof chrome !== "undefined" && chrome?.storage?.local) {
        chrome.storage.local.set({ jsDsaSettings: next });
      } else {
        localStorage.setItem("jsDsaSettings", JSON.stringify(next));
      }
    } catch {
      // ignore
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      if (typeof chrome !== "undefined" && chrome?.storage?.local) {
        chrome.storage.local.set({ jsDsaSettings: DEFAULT_SETTINGS });
      } else {
        localStorage.setItem("jsDsaSettings", JSON.stringify(DEFAULT_SETTINGS));
      }
    } catch {
      // ignore
    }
    onNotify?.({ type: "info", message: "Settings reset to defaults" });
  };

  return (
    <div className="flex flex-col overflow-y-auto max-h-[520px] text-gray-200 p-3.5 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
        <div>
          <h2 className="text-xs font-semibold text-white">Toolkit Preferences</h2>
          <p className="text-[11px] text-gray-400">
            Configure how JS DSA interacts with LeetCode
          </p>
        </div>
        {isSaved && (
          <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md jsdsa-animate-in">
            <Check size={11} /> Saved
          </span>
        )}
      </div>

      {/* Editor & Injection Section */}
      <section className="space-y-2.5">
        <h3 className="font-mono text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
          Automation
        </h3>

        {/* Auto Scan Toggle */}
        <div className="glass-card flex items-center justify-between rounded-xl p-3">
          <div>
            <span className="text-xs font-semibold text-white block">
              Auto-scan on open
            </span>
            <span className="text-[11px] text-gray-400 block mt-0.5">
              Automatically parse the Monaco editor when opening the panel.
            </span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer ml-3">
            <input
              type="checkbox"
              checked={settings.autoScan}
              onChange={(e) => updateSetting("autoScan", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500 peer-checked:after:bg-black"></div>
          </label>
        </div>

        {/* Injection Position */}
        <div className="glass-card rounded-xl p-3 space-y-2">
          <div>
            <span className="text-xs font-semibold text-white block">
              Injection Placement
            </span>
            <span className="text-[11px] text-gray-400 block mt-0.5">
              Where to insert generated class definitions in your LeetCode code.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => updateSetting("injectionPosition", "top")}
              className={`
                rounded-xl border p-2.5 text-left transition-all
                ${
                  settings.injectionPosition === "top"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-white shadow-sm"
                    : "border-white/[0.06] bg-white/[0.02] text-gray-400 hover:bg-white/[0.05]"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">Top of File</span>
                {settings.injectionPosition === "top" && (
                  <Check size={12} className="text-emerald-400" />
                )}
              </div>
              <span className="block text-[10px] text-gray-400 mt-0.5">
                Line 1 (Recommended)
              </span>
            </button>

            <button
              onClick={() => updateSetting("injectionPosition", "cursor")}
              className={`
                rounded-xl border p-2.5 text-left transition-all
                ${
                  settings.injectionPosition === "cursor"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-white shadow-sm"
                    : "border-white/[0.06] bg-white/[0.02] text-gray-400 hover:bg-white/[0.05]"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">At Cursor</span>
                {settings.injectionPosition === "cursor" && (
                  <Check size={12} className="text-emerald-400" />
                )}
              </div>
              <span className="block text-[10px] text-gray-400 mt-0.5">
                Active Selection
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Diagnostics / About */}
      <section className="space-y-2.5 pt-1">
        <h3 className="font-mono text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
          System Info
        </h3>

        <div className="glass-card rounded-xl p-3 font-mono text-xs space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span>Version</span>
            <span className="text-white">v0.1.0</span>
          </div>

          <div className="flex justify-between items-center text-gray-400">
            <span>Catalog Items</span>
            <span className="text-emerald-400">
              {DATA_STRUCTURES_CATALOG.length} data structures
            </span>
          </div>

          <div className="flex justify-between items-center text-gray-400">
            <span>Target Platform</span>
            <span className="text-white">leetcode.com</span>
          </div>

          <div className="flex justify-between items-center text-gray-400">
            <span>Engine</span>
            <span className="text-white">Monaco Editor (VS Code)</span>
          </div>
        </div>

        {/* Reset Defaults */}
        <button
          onClick={handleReset}
          className="
            flex w-full items-center justify-center gap-1.5 rounded-xl
            border border-white/[0.08] bg-white/[0.03] py-2 text-xs font-medium text-gray-400
            transition-all hover:bg-white/[0.07] hover:text-white active:scale-98
          "
        >
          <RotateCcw size={12} />
          <span>Reset Preferences to Defaults</span>
        </button>
      </section>
    </div>
  );
}
