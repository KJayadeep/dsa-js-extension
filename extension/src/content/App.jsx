import { useState } from "react";
import { ScanSearch, X, Code2, CircleCheck, Layers3 } from "lucide-react";
import { getLeetCodeCode } from "./codeReader";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");

  const scanCode = () => {
    const currentCode = getLeetCodeCode();

    console.log("LeetCode code:", currentCode);

    if (currentCode) {
      setCode(currentCode);
    } else {
      setCode("Could not find editor code.");
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            fixed bottom-6 right-6 z-[999999]
            flex items-center gap-2
            rounded-xl
            border border-gray-700
            bg-gray-950
            px-4 py-3
            text-sm font-semibold text-white
            shadow-2xl
            transition-all duration-200
            hover:-translate-y-0.5
            hover:bg-gray-900
            hover:shadow-black/30
          "
        >
          <Code2 size={17} />

          <span>JS DSA</span>

          <span className="h-2 w-2 rounded-full bg-emerald-400" />
        </button>
      )}

      {/* Main Panel */}
      {isOpen && (
        <div
          className="
            fixed bottom-6 right-6 z-[999999]
            flex w-[420px] flex-col
            overflow-hidden
            rounded-2xl
            border border-gray-200
            bg-white
            text-gray-900
            shadow-2xl
          "
        >
          {/* Header */}
          <div
            className="
              flex items-center justify-between
              border-b border-gray-200
              bg-gray-950
              px-4 py-3
              text-white
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-lg
                  bg-white/10
                  ring-1 ring-white/10
                "
              >
                <Code2 size={18} />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  JS DSA
                </h2>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                  <span className="text-[11px] text-gray-400">
                    Active on LeetCode
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="
                rounded-lg
                p-2
                text-gray-400
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              <X size={17} />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4 p-4">

            {/* Scan Section */}
            <div
              className="
                rounded-xl
                border border-gray-200
                bg-gray-50
                p-4
              "
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Analyze your code
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Detect DSA structures used in your solution.
                  </p>
                </div>

                <div
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-lg
                    bg-white
                    text-gray-700
                    shadow-sm
                    ring-1 ring-gray-200
                  "
                >
                  <ScanSearch size={18} />
                </div>
              </div>

              <button
                onClick={scanCode}
                className="
                  flex w-full
                  items-center justify-center gap-2
                  rounded-lg
                  bg-gray-900
                  px-4 py-2.5
                  text-sm font-medium text-white
                  shadow-sm
                  transition-all
                  hover:bg-gray-800
                  active:scale-[0.98]
                "
              >
                <ScanSearch size={16} />

                Scan Code
              </button>
            </div>

            {/* Detected Structures */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers3 size={15} className="text-gray-500" />

                  <h3 className="text-sm font-semibold">
                    Detected Structures
                  </h3>
                </div>

                <span
                  className="
                    rounded-full
                    bg-gray-100
                    px-2 py-0.5
                    text-[10px]
                    font-medium
                    text-gray-500
                  "
                >
                  0 found
                </span>
              </div>

              <div
                className="
                  flex min-h-[70px]
                  items-center justify-center
                  rounded-xl
                  border border-dashed border-gray-300
                  bg-gray-50
                "
              >
                <div className="text-center">
                  <Layers3
                    size={20}
                    className="mx-auto mb-1 text-gray-300"
                  />

                  <p className="text-xs text-gray-400">
                    No structures detected yet
                  </p>
                </div>
              </div>
            </div>

            {/* Code Preview */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 size={15} className="text-gray-500" />

                  <h3 className="text-sm font-semibold">
                    Code Preview
                  </h3>
                </div>

                {code && (
                  <div className="flex items-center gap-1 text-[10px] text-emerald-600">
                    <CircleCheck size={12} />
                    Code loaded
                  </div>
                )}
              </div>

              <div
                className="
                  max-h-[240px]
                  overflow-auto
                  rounded-xl
                  border border-gray-800
                  bg-gray-950
                  p-4
                "
              >
                <pre
                  className="
                    whitespace-pre-wrap
                    break-words
                    font-mono
                    text-[11px]
                    leading-5
                    text-gray-300
                  "
                >
                  {code || "// Your LeetCode code will appear here..."}
                </pre>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div
            className="
              border-t border-gray-200
              bg-gray-50
              px-4 py-2.5
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400">
                JS DSA v0.1.0
              </span>

              <span className="text-[10px] text-gray-400">
                JavaScript toolkit
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;