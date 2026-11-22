import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(
    readFileSync(new URL("./manifest.json", import.meta.url), "utf-8")
);

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        crx({manifest})
    ]
});