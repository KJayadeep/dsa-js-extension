export function getLeetCodeCode() {
    const editors = document.querySelectorAll(".monaco-editor");

    console.log("Editors found:", editors.length);

    if (editors.length === 0) {
        return null;
    }

    const editor = editors[0];

    const lines = editor.querySelectorAll(".view-line");

    if (lines.length === 0) {
        return null;
    }

    return Array.from(lines)
        .map((line) => line.textContent)
        .join("\n");
}