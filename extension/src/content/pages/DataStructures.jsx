import { useState, useMemo } from "react";
import {
  Search,
  Code2,
  Copy,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Check,
  Cpu,
} from "lucide-react";

import { DATA_STRUCTURES_CATALOG } from "../datastructures";
import { injectCode } from "../controllers/CodeInjector";

export default function DataStructures({ onNotify }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState("queue");
  const [copiedId, setCopiedId] = useState(null);
  const [injectingId, setInjectingId] = useState(null);

  const categories = ["All", "Linear", "Heaps", "Trees", "Graphs", "Advanced", "Utilities"];

  const filteredItems = useMemo(() => {
    return DATA_STRUCTURES_CATALOG.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.aliases.some((a) => a.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const handleCopy = async (item, e) => {
    e?.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.code);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
      onNotify?.({
        type: "success",
        message: `${item.name} copied to clipboard!`,
      });
    } catch {
      onNotify?.({
        type: "error",
        message: "Failed to copy code to clipboard.",
      });
    }
  };

  const handleInject = async (item, e) => {
    e?.stopPropagation();
    setInjectingId(item.id);
    try {
      const res = await injectCode(item.code, "top");
      if (res.success) {
        onNotify?.({
          type: "success",
          message: `${item.name} injected into editor!`,
        });
      } else {
        onNotify?.({
          type: "error",
          message: res.message || "Failed to inject into editor.",
        });
      }
    } finally {
      setInjectingId(null);
    }
  };

  return (
    <div className="flex flex-col overflow-y-auto max-h-[520px] text-gray-200">
      {/* Search & Filter Header */}
      <div className="sticky top-0 z-10 border-b border-white/[0.06] bg-[#0f121a]/95 backdrop-blur-md p-3 space-y-2.5">
        <div className="relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search data structures (Queue, Heap, Trie...)"
            className="
              w-full rounded-xl border border-white/[0.08] bg-white/[0.04]
              py-1.5 pl-8 pr-3 text-xs text-white
              placeholder-gray-500 outline-none
              transition focus:border-emerald-500/50 focus:bg-white/[0.07]
            "
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-[11px] no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  rounded-lg px-2.5 py-1 font-medium whitespace-nowrap transition-all
                  ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                      : "bg-white/[0.04] text-gray-400 hover:text-gray-200 hover:bg-white/[0.08] border border-white/[0.04]"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog List */}
      <div className="space-y-2.5 p-3">
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center text-xs text-gray-500">
            No data structures found matching "{search}".
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;
            const isCopied = copiedId === item.id;
            const isInjecting = injectingId === item.id;

            return (
              <div
                key={item.id}
                className="
                  glass-card rounded-xl overflow-hidden
                  border border-white/[0.06] hover:border-white/[0.12]
                  transition-all
                "
              >
                {/* Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="
                    flex items-center justify-between p-3
                    cursor-pointer hover:bg-white/[0.02] transition-colors
                  "
                >
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-semibold text-white">
                        {item.name}
                      </h3>
                      <span className="font-mono text-[9px] font-medium bg-white/[0.06] border border-white/[0.06] text-gray-300 px-1.5 py-0.2 rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-gray-400 line-clamp-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => handleInject(item, e)}
                      disabled={isInjecting}
                      className="
                        flex items-center gap-1 rounded-lg
                        bg-emerald-500/15 hover:bg-emerald-500 hover:text-black
                        border border-emerald-500/30 px-2.5 py-1
                        text-[10px] font-semibold text-emerald-300
                        transition-all active:scale-95 disabled:opacity-50
                      "
                      title="Inject into LeetCode editor"
                    >
                      <PlusCircle size={11} />
                      <span>{isInjecting ? "..." : "Inject"}</span>
                    </button>

                    <button
                      onClick={(e) => handleCopy(item, e)}
                      className="
                        flex h-6 w-6 items-center justify-center rounded-lg
                        border border-white/[0.08] text-gray-400
                        hover:bg-white/[0.08] hover:text-white transition-colors
                      "
                      title="Copy code"
                    >
                      {isCopied ? (
                        <Check size={12} className="text-emerald-400" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>

                    <div className="text-gray-500 pl-0.5">
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-white/[0.06] bg-[#090b10] p-3 space-y-2.5">
                    {/* Time & Space Complexity Matrix */}
                    <div>
                      <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        <Zap size={11} className="text-amber-400" />
                        <span>Complexity Matrix</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                          <span className="text-gray-400 font-mono block mb-1">
                            Time Complexity:
                          </span>
                          <div className="space-y-0.5 text-gray-300 font-mono">
                            {Object.entries(item.timeComplexity || {}).map(([op, comp]) => (
                              <div key={op} className="flex justify-between">
                                <span className="text-gray-400">{op}:</span>
                                <span className="text-emerald-400 font-semibold">{comp}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                          <span className="text-gray-400 font-mono block mb-1">
                            Space Complexity:
                          </span>
                          <span className="font-mono text-emerald-400 font-semibold">
                            {item.spaceComplexity}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Example Usage */}
                    {item.exampleUsage && (
                      <div>
                        <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                          <Sparkles size={11} className="text-cyan-400" />
                          <span>Usage Example</span>
                        </div>
                        <div className="rounded-lg border border-white/[0.06] bg-[#07080c] p-2.5">
                          <pre className="font-mono text-[10px] leading-relaxed text-emerald-300 whitespace-pre-wrap">
                            {item.exampleUsage}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Code Snippet Box */}
                    <div>
                      <div className="mb-1 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        <div className="flex items-center gap-1">
                          <Code2 size={11} className="text-gray-400" />
                          <span>Implementation</span>
                        </div>
                        <button
                          onClick={(e) => handleCopy(item, e)}
                          className="text-[10px] font-normal normal-case text-gray-400 hover:text-white"
                        >
                          {isCopied ? "Copied!" : "Copy Full Code"}
                        </button>
                      </div>
                      <div className="rounded-lg border border-white/[0.06] bg-[#07080c] p-2.5 max-h-[140px] overflow-auto">
                        <pre className="font-mono text-[10px] leading-relaxed text-gray-300 whitespace-pre-wrap break-words">
                          {item.code.trim()}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
