/**
 * Reads code from LeetCode's Monaco editor.
 * Primary: Communicates with pageBridge in the MAIN world to get the full editor model.
 * Fallback: Scrapes .view-line elements in the DOM.
 */
export async function getLeetCodeCode(timeoutMs = 150) {
  // 1. Try page bridge (fetches 100% of code even if virtualized/scrolled)
  try {
    const bridgeCode = await getCodeFromBridge(timeoutMs);
    if (bridgeCode !== null && bridgeCode !== undefined) {
      return bridgeCode;
    }
  } catch (e) {
    console.debug("[JS-DSA] Bridge read error or timeout, falling back to DOM:", e);
  }

  // 2. Fallback: DOM scraping
  return getCodeFromDOM();
}

function getCodeFromBridge(timeoutMs) {
  return new Promise((resolve) => {
    const requestId = "req_" + Math.random().toString(36).slice(2, 9);
    let resolved = false;

    const cleanup = () => {
      window.removeEventListener("JS_DSA_GET_CODE_RESPONSE", handler);
    };

    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve(null);
      }
    }, timeoutMs);

    const handler = (event) => {
      if (event.detail?.requestId === requestId) {
        resolved = true;
        clearTimeout(timer);
        cleanup();
        resolve(event.detail?.code ?? null);
      }
    };

    window.addEventListener("JS_DSA_GET_CODE_RESPONSE", handler);

    window.dispatchEvent(
      new CustomEvent("JS_DSA_GET_CODE_REQUEST", {
        detail: { requestId },
      })
    );
  });
}

export function getCodeFromDOM() {
  const editors = document.querySelectorAll(".monaco-editor");
  if (editors.length === 0) return null;

  const editor = editors[0];
  const lines = editor.querySelectorAll(".view-line");
  if (lines.length === 0) return null;

  return Array.from(lines)
    .map((line) => line.textContent)
    .join("\n");
}
