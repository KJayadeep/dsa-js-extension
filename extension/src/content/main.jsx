import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import styleText from "./index.css?inline";

function initApp() {
  if (document.getElementById("js-dsa-root")) {
    return;
  }

  const host = document.createElement("div");
  host.id = "js-dsa-root";
  host.style.position = "static";
  host.style.zIndex = "2147483647";
  document.body.appendChild(host);

  // Attach Shadow DOM for complete CSS encapsulation from LeetCode
  const shadowRoot = host.attachShadow({ mode: "open" });

  // Injected CSS inside shadow root
  const styleElement = document.createElement("style");
  styleElement.textContent = styleText;
  shadowRoot.appendChild(styleElement);

  // React mount point
  const container = document.createElement("div");
  container.id = "js-dsa-app";
  shadowRoot.appendChild(container);

  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
