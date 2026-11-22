import { useState, useEffect } from "react";
import {
  Code2,
  CheckCircle2,
  AlertTriangle,
  Layers3,
  PlusCircle,
  Copy,
  RefreshCw,
  Zap,
  Terminal,
  FileCode,
  ArrowRight,
} from "lucide-react";

import { getLeetCodeCode } from "../controllers/codeReader";
import { parseCode } from "../controllers/ast";
import { detectDataStructures } from "../controllers/detector";
import { injectCode } from "../controllers/CodeInjector";
import { getStructureById } from "../datastructures";

export default function Dashboard({ onNavigate, onNotify }) {
  const [code, setCode] = useState("");
  const [detectedStructures, setDetectedStructures] = useState([]);
  const [missingStructures, setMissingStructures] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const scanCode = async () => {
    setIsScanning(true);
    try {
      const currentCode = await getLeetCodeCode();
      if (currentCode) {
        setCode(currentCode);
        const ast = parseCode(currentCode);
        const { detected, missing } = detectDataStructures(ast, currentCode);
        setDetectedStructures(detected);
        setMissingStructures(missing);
      } else {
        setCode("");
        setDetectedStructures([]);
        setMissingStructures([]);
        onNotify?.({
          type: "warning",
          message: "No code found in Monaco editor. Make sure you are on a LeetCode problem page.",
        });
      }
    } catch (err) {
      console.error("[JS-DSA] Scan error:", err);
    } finally {
      setIsScanning(false);
      setHasScanned(true);
    }
  };

  useEffect(() => {
    scanCode();
  }, []);

  const handleInject = async (catalogId) => {
    const item = getStructureById(catalogId);
    if (!item) return;

    const res = await injectCode(item.code, "top");
    if (res.success) {
      onNotify?.({
        type: "success",
        message: `${item.name} injected into editor!`,
      });
      setTimeout(scanCode, 350);
    } else {
      onNotify?.({
        type: "error",
        message: res.message || "Failed to inject code.",
      });
    }
  };

  const handleInjectAllMissing = async () => {
    if (missingStructures.length === 0) return;
    const combinedCode = missingStructures
      .map((m) => getStructureById(m.catalogId)?.code)
      .filter(Boolean)
      .join("\n\n");

    const res = await injectCode(combinedCode, "top");
    if (res.success) {
      onNotify?.({
        type: "success",
        message: `Injected ${missingStructures.length} missing structures!`,
      });
      setTimeout(scanCode, 350);
    }
  };

  const handleCopyCode = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
      onNotify?.({ type: "info", message: "Code copied to clipboard" });
    } catch {
      // fallback
    }
  };

  const lineCount = code ? code.split("\n").length : 0;

  return (
    <div className="flex flex-col overflow-y-auto max-h-[520px] text-gray-200">
      {/* Action Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.06] bg-[#0f121a]/95 backdrop-blur-md px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span>{lineCount > 0 ? `${lineCount} lines` : "Waiting for code"}</span>
          </div>
        </div>

        <button
          onClick={scanCode}
          disabled={isScanning}
          className="
            flex items-center gap-1.5 rounded-lg
            bg-gradient-to-r from-emerald-500 to-teal-400
            px-3 py-1.5 text-xs font-semibold text-black
            shadow-md shadow-emerald-500/20 transition-all
            hover:brightness-110 active:scale-95 disabled:opacity-50
          "
        >
          <RefreshCw size={12} className={isScanning ? "animate-spin" : ""} />
          <span>{isScanning ? "Analyzing..." : "Scan Code"}</span>
        </button>
      </div>

      <div className="space-y-3.5 p-3.5">
        {/* Missing Definitions Alert Banner */}
        {missingStructures.length > 0 && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.08] p-3 text-amber-200">
            <div className="flex items-start gap-2.5">
              <div className="rounded-lg bg-amber-500/20 p-1 text-amber-400 mt-0.5">
                <AlertTriangle size={15} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-amber-300">
                    Missing {missingStructures.length === 1 ? "Definition" : "Definitions"}
                  </h3>
                  <span className="font-mono text-[9px] font-semibold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                    Action Required
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-amber-200/80 leading-relaxed">
                  Your solution instantiates{" "}
                  <span className="font-semibold text-white">
                    {missingStructures.map((m) => m.canonicalName).join(", ")}
                  </span>
                  , but the class is not defined.
                </p>

                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={handleInjectAllMissing}
                    className="
                      flex items-center gap-1.5 rounded-lg
                      bg-amber-400 hover:bg-amber-300 px-2.5 py-1
                      text-[11px] font-bold text-black
                      shadow-md shadow-amber-500/20 transition-all active:scale-95
                    "
                  >
                    <Zap size={12} />
                    <span>Auto-Inject {missingStructures.length > 1 ? "All" : "Class"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Metrics Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="glass-card rounded-xl p-2.5">
            <div className="flex items-center justify-between text-gray-400 text-[10px] uppercase font-mono tracking-wider">
              <span>Detected</span>
              <Layers3 size={13} className="text-gray-500" />
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-white font-mono">
                {detectedStructures.length}
              </span>
              <span className="text-[10px] text-gray-400">instances</span>
            </div>
          </div>

          <div className="glass-card rounded-xl p-2.5">
            <div className="flex items-center justify-between text-gray-400 text-[10px] uppercase font-mono tracking-wider">
              <span>Status</span>
              <CheckCircle2
                size={13}
                className={missingStructures.length > 0 ? "text-amber-400" : "text-emerald-400"}
              />
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span
                className={`text-xs font-semibold ${
                  missingStructures.length > 0 ? "text-amber-400" : "text-emerald-400"
                }`}
              >
                {missingStructures.length === 0 ? "All Defined" : `${missingStructures.length} Missing`}
              </span>
            </div>
          </div>
        </div>

        {/* Detected Structures List */}
        <section>
          <div className="mb-2 flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-300">
              <Terminal size={13} className="text-gray-400" />
              <span>Detected in Code</span>
            </div>
            <span className="font-mono text-[10px] text-gray-500">
              {detectedStructures.length} found
            </span>
          </div>

          <div className="glass-card rounded-xl divide-y divide-white/[0.05] overflow-hidden">
            {detectedStructures.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-gray-400 mb-2">
                  <Layers3 size={18} />
                </div>
                <p className="text-xs font-medium text-gray-300">
                  {hasScanned ? "No custom DSA classes detected" : "Ready to analyze"}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500 max-w-[220px]">
                  Use structures like <code className="text-emerald-400 font-mono">new Queue()</code> or insert from the Library.
                </p>
                <button
                  onClick={() => onNavigate?.("library")}
                  className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Browse Data Structures Library</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            ) : (
              detectedStructures.map((structure, index) => (
                <div
                  key={`${structure.name}-${index}`}
                  className="flex items-center justify-between p-2.5 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05] text-gray-300 border border-white/[0.06]">
                      <FileCode size={13} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-white">
                          {structure.canonicalName || structure.name}
                        </span>
                        <span className="font-mono text-[9px] text-gray-400 bg-white/[0.06] px-1.5 py-0.2 rounded">
                          L:{structure.line}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {structure.isDefined ? "Defined in solution" : "Missing class definition"}
                      </span>
                    </div>
                  </div>

                  <div>
                    {structure.isDefined ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 size={11} />
                        Defined
                      </span>
                    ) : (
                      <button
                        onClick={() => handleInject(structure.catalogId)}
                        className="
                          inline-flex items-center gap-1 rounded-lg
                          bg-white/10 hover:bg-emerald-500 hover:text-black
                          px-2 py-1 text-[10px] font-semibold text-emerald-400
                          border border-emerald-500/30 transition-all active:scale-95
                        "
                      >
                        <PlusCircle size={11} />
                        Inject
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Code Terminal View */}
        <section>
          <div className="mb-2 flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-300">
              <Code2 size={13} className="text-gray-400" />
              <span>Editor Buffer</span>
            </div>
            {code && (
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-white transition-colors"
              >
                <Copy size={11} />
                <span>{copiedCode ? "Copied!" : "Copy"}</span>
              </button>
            )}
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-[#090b10] overflow-hidden">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[10px] text-gray-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500/60 inline-block"></span>
                <span className="h-2 w-2 rounded-full bg-amber-500/60 inline-block"></span>
                <span className="h-2 w-2 rounded-full bg-emerald-500/60 inline-block"></span>
                <span className="ml-1 text-gray-400">solution.js</span>
              </div>
              <span className="text-gray-500">{lineCount} lines</span>
            </div>

            <div className="p-3 max-h-[140px] overflow-auto">
              <pre className="font-mono text-[10px] leading-relaxed text-gray-300 whitespace-pre-wrap break-words">
                {code || "// Open any LeetCode problem editor and click 'Scan Code'"}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
