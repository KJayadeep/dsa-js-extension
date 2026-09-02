export function detectStructures(code) {
    const structures = [];

    if (!code) {
        return structures;
    }

    // Stack
    if (
        /\.push\s*\(/.test(code) &&
        /\.pop\s*\(/.test(code)
    ) {
        structures.push("Stack");
    }

    // Queue
    if (
        /\.push\s*\(/.test(code) &&
        /\.shift\s*\(/.test(code)
    ) {
        structures.push("Queue");
    }

    return structures;
}