// Runs in MAIN world (same execution context as LeetCode's page)
// Has direct access to window.monaco

(function () {
  if (window.__JS_DSA_PAGE_BRIDGE_INITIALIZED__) return;
  window.__JS_DSA_PAGE_BRIDGE_INITIALIZED__ = true;

  function getMonacoModel() {
    try {
      if (window.monaco && window.monaco.editor) {
        const models = window.monaco.editor.getModels();
        if (models && models.length > 0) {
          return models[0];
        }
      }
    } catch (e) {
      console.warn("[JS-DSA Bridge] Error getting Monaco model:", e);
    }
    return null;
  }

  function getActiveEditor() {
    try {
      if (window.monaco && window.monaco.editor) {
        const editors = window.monaco.editor.getEditors();
        if (editors && editors.length > 0) {
          // Find the focused or first editor
          return editors.find((ed) => ed.hasTextFocus()) || editors[0];
        }
      }
    } catch (e) {
      console.warn("[JS-DSA Bridge] Error getting Monaco editor:", e);
    }
    return null;
  }

  // Handle Get Code
  window.addEventListener("JS_DSA_GET_CODE_REQUEST", (event) => {
    const requestId = event.detail?.requestId;
    const model = getMonacoModel();
    let code = null;

    if (model) {
      code = model.getValue();
    }

    window.dispatchEvent(
      new CustomEvent("JS_DSA_GET_CODE_RESPONSE", {
        detail: {
          requestId,
          code,
          success: code !== null,
        },
      })
    );
  });

  // Handle Inject Code
  window.addEventListener("JS_DSA_INJECT_CODE_REQUEST", (event) => {
    const { requestId, code, position = "top" } = event.detail || {};
    let success = false;
    let message = "";

    try {
      const model = getMonacoModel();
      const editor = getActiveEditor();

      if (model && window.monaco) {
        if (position === "cursor" && editor) {
          const pos = editor.getPosition();
          editor.executeEdits("js-dsa", [
            {
              range: new window.monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column),
              text: code + "\n",
              forceMoveMarkers: true,
            },
          ]);
          editor.focus();
          success = true;
          message = "Injected at cursor";
        } else {
          // Default: insert at top of file
          const currentCode = model.getValue();
          // Check if code is already present to prevent duplicate injection
          if (currentCode.includes(code.trim().slice(0, 40))) {
            message = "Already present in editor";
            success = true;
          } else {
            model.applyEdits([
              {
                range: new window.monaco.Range(1, 1, 1, 1),
                text: code.trim() + "\n\n",
                forceMoveMarkers: true,
              },
            ]);
            success = true;
            message = "Injected at top of editor";
          }
        }
      } else {
        message = "Monaco model not found";
      }
    } catch (err) {
      console.error("[JS-DSA Bridge] Injection error:", err);
      message = err.message;
    }

    window.dispatchEvent(
      new CustomEvent("JS_DSA_INJECT_CODE_RESPONSE", {
        detail: {
          requestId,
          success,
          message,
        },
      })
    );
  });

  console.log("🚀 [JS-DSA] Page bridge initialized successfully");
})();
