# JS DSA - LeetCode JavaScript Toolkit 🚀

A modern Chrome / Chromium browser extension (Manifest V3) that provides a comprehensive JavaScript Data Structures & Algorithms (DSA) toolkit directly inside LeetCode.

Unlike C++, Java, or Python, JavaScript natively lacks built-in standard interview data structures like an $O(1)$ Queue, Min/Max Heap, Trie, and Union-Find. **JS DSA** analyzes your JavaScript solution in real time, detects instantiated structures, flags missing definitions, and lets you inject optimal, interview-tested implementations with a single click.

---

## ✨ Features

- 🔍 **Real-Time Solution Analysis**: Automatically scans your LeetCode Monaco editor code and parses it into an AST (Abstract Syntax Tree) using `acorn` and `acorn-walk`.
- ⚠️ **Missing Definition Detection**: Detects calls like `new Queue()`, `new MinHeap()`, or `new Trie()`. If the class definition isn't in your solution, it flags it with a 1-click **"Inject Definition"** button.
- ⚡ **Direct Monaco Editor Bridge**: Connects directly to LeetCode's Monaco editor model to insert class definitions seamlessly at Line 1 (or at cursor position) without breaking undo history or virtualized scrolling.
- 📦 **Data Structures Library**: Searchable catalog of optimal JavaScript implementations:
  - **Queue**: $O(1)$ amortized object-based FIFO queue
  - **Deque**: Double-ended queue with $O(1)$ front/back operations
  - **MinHeap / PriorityQueue**: Binary Heap with custom comparator support
  - **MaxHeap**: Binary Max-Heap
  - **Trie**: Prefix Tree for fast string operations
  - **Union-Find / Disjoint-Set**: Path compression & union by rank
  - **Segment Tree**: Logarithmic range queries & point updates
  - **Binary Search**: `lowerBound` and `upperBound` (bisect) utilities
  - **Helpers**: Array-to-LinkedList and Array-to-BinaryTree converters
- 📊 **Complexity & Usage**: Each structure includes time and space complexity breakdowns, method summaries, and example usage snippets.
- ⚙️ **Customizable Preferences**: Configure auto-scan behavior and injection placement (Top of file vs At cursor) with persistent storage.

---

## 🛠️ Tech Stack

- **Extension Framework**: Manifest V3, Vite 8, `@crxjs/vite-plugin`
- **Frontend**: React 19, Tailwind CSS v4, Lucide React
- **Code Parsing**: `acorn`, `acorn-walk`
- **Editor Integration**: Monaco Editor model manipulation via page bridge

---

## 🚀 Getting Started

### 1. Install Dependencies & Build
```bash
cd extension
npm install
npm run build
```

The production-ready extension will be bundled into `extension/dist/`.

### 2. Load Extension in Chrome / Edge / Brave
1. Open your browser and navigate to `chrome://extensions/` (or `edge://extensions/`).
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked**.
4. Select the `extension/dist` folder from this repository.

### 3. Use on LeetCode
1. Open any problem on LeetCode (e.g. `https://leetcode.com/problems/two-sum/`).
2. You will see the floating **JS DSA** button in the bottom-right corner.
3. Click it to open the toolkit:
   - **Dashboard**: Click **Scan Code** to analyze your solution and inject missing structures.
   - **Library**: Browse, search, copy, or inject any data structure.
   - **Settings**: Customize auto-scan and injection preferences.

---

## 📁 Project Structure

```
dsa-js-extension/
├── README.md
└── extension/
    ├── manifest.json              # Chrome Manifest V3 configuration
    ├── vite.config.js             # Vite 8 + CRXJS + Tailwind build setup
    ├── package.json
    └── src/
        ├── background/
        │   └── background.js      # Background service worker
        └── content/
            ├── main.jsx           # Content script mounting React UI
            ├── pageBridge.js      # Main-world script accessing Monaco editor
            ├── App.jsx            # Main app container & tab manager
            ├── components/
            │   ├── FloatingButton.jsx
            │   ├── Header.jsx
            │   └── Toast.jsx
            ├── pages/
            │   ├── Dashboard.jsx
            │   ├── DataStructures.jsx
            │   └── Settings.jsx
            ├── controllers/
            │   ├── ast.js         # Acorn AST parser
            │   ├── detector.js    # AST structure detector
            │   ├── codeReader.js  # Monaco code reader
            │   └── CodeInjector.js# Monaco code injector
            └── datastructures/    # DSA implementations
                ├── queue.js
                ├── deque.js
                ├── heap.js
                ├── trie.js
                ├── unionFind.js
                ├── segmentTree.js
                ├── binarySearch.js
                ├── helpers.js
                └── index.js       # Catalog registry
```

---

## 📄 License
MIT
