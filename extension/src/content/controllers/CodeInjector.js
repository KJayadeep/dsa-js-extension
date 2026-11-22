/**
 * Injects code into LeetCode's Monaco editor.
 * Primary: Uses pageBridge in MAIN world to apply edits directly to the Monaco model.
 * Fallback: Copies code to the user's clipboard and instructs them to paste.
 */
export async function injectCode(code, position = "top", timeoutMs = 250) {
  if (!code) {
    return { success: false, message: "No code provided" };
  }

  // 1. Try bridge injection
  try {
    const bridgeResult = await injectViaBridge(code, position, timeoutMs);
    if (bridgeResult?.success) {
      return {
        success: true,
        method: "editor",
        message: bridgeResult.message || "Code injected into editor!",
      };
    }
  } catch (err) {
    console.debug("[JS-DSA] Bridge injection failed, using clipboard fallback:", err);
  }

  // 2. Fallback: Clipboard write
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(code);
      return {
        success: true,
        method: "clipboard",
        message: "Code copied to clipboard! Paste (Cmd+V / Ctrl+V) in editor.",
      };
    }
  } catch (clipErr) {
    console.error("[JS-DSA] Clipboard write failed:", clipErr);
  }

  return {
    success: false,
    message: "Unable to inject code automatically. Please copy manually.",
  };
}

function injectViaBridge(code, position, timeoutMs) {
  return new Promise((resolve) => {
    const requestId = "inj_" + Math.random().toString(36).slice(2, 9);
    let resolved = false;

    const cleanup = () => {
      window.removeEventListener("JS_DSA_INJECT_CODE_RESPONSE", handler);
    };

    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve({ success: false, message: "Injection request timed out" });
      }
    }, timeoutMs);

    const handler = (event) => {
      if (event.detail?.requestId === requestId) {
        resolved = true;
        clearTimeout(timer);
        cleanup();
        resolve(event.detail);
      }
    };

    window.addEventListener("JS_DSA_INJECT_CODE_RESPONSE", handler);

    window.dispatchEvent(
      new CustomEvent("JS_DSA_INJECT_CODE_REQUEST", {
        detail: { requestId, code, position },
      })
    );
  });
}
