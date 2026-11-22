import { Queue } from "./queue.js";
import { Deque } from "./deque.js";
import { Heap } from "./heap.js";
import { Trie } from "./trie.js";
import { UnionFind } from "./unionFind.js";
import { SegmentTree } from "./segmentTree.js";
import { BinarySearch } from "./binarySearch.js";
import { Helpers } from "./helpers.js";

export const DATA_STRUCTURES_CATALOG = [
  {
    id: "queue",
    name: "Queue",
    category: "Linear",
    description: "Optimal O(1) FIFO Queue using object map and pointer offsets (faster than Array.shift).",
    timeComplexity: {
      Enqueue: "O(1)",
      Dequeue: "O(1)",
      Peek: "O(1)",
      Size: "O(1)",
    },
    spaceComplexity: "O(N)",
    aliases: ["Queue"],
    code: Queue,
    exampleUsage: `const q = new Queue();
q.enqueue(10);
q.enqueue(20);
console.log(q.peek());    // 10
console.log(q.dequeue()); // 10
console.log(q.size());    // 1`,
  },
  {
    id: "deque",
    name: "Deque",
    category: "Linear",
    description: "Double-ended queue with O(1) operations at both the front and back.",
    timeComplexity: {
      "Push Front/Back": "O(1)",
      "Pop Front/Back": "O(1)",
      "Peek Front/Back": "O(1)",
      Size: "O(1)",
    },
    spaceComplexity: "O(N)",
    aliases: ["Deque", "DoubleEndedQueue"],
    code: Deque,
    exampleUsage: `const dq = new Deque();
dq.pushBack(1);
dq.pushFront(0);
console.log(dq.popFront()); // 0
console.log(dq.popBack());  // 1`,
  },
  {
    id: "priority-queue",
    name: "MinHeap / PriorityQueue",
    category: "Heaps",
    description: "Binary Heap / PriorityQueue supporting custom comparators, MinHeap and MaxHeap.",
    timeComplexity: {
      Push: "O(log N)",
      Pop: "O(log N)",
      Peek: "O(1)",
      Build: "O(N)",
    },
    spaceComplexity: "O(N)",
    aliases: ["PriorityQueue", "MinHeap", "MaxHeap", "Heap"],
    code: Heap,
    exampleUsage: `// MinHeap
const minH = new MinHeap();
minH.push(5);
minH.push(1);
console.log(minH.pop()); // 1

// Custom PriorityQueue (e.g., pairs [val, freq])
const pq = new PriorityQueue((a, b) => b[1] - a[1]); // Max on freq`,
  },
  {
    id: "trie",
    name: "Trie (Prefix Tree)",
    category: "Trees",
    description: "Prefix tree for fast string retrieval, prefix checking, and autocomplete.",
    timeComplexity: {
      Insert: "O(L)",
      Search: "O(L)",
      StartsWith: "O(L)",
    },
    spaceComplexity: "O(N · L · Σ)",
    aliases: ["Trie", "PrefixTree"],
    code: Trie,
    exampleUsage: `const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));   // true
console.log(trie.search("app"));     // false
console.log(trie.startsWith("app")); // true`,
  },
  {
    id: "union-find",
    name: "Union-Find (Disjoint Set)",
    category: "Graphs",
    description: "Disjoint-Set with path compression & union by rank for cycle detection & connected components.",
    timeComplexity: {
      Find: "α(N) ≈ O(1)",
      Union: "α(N) ≈ O(1)",
      Connected: "α(N) ≈ O(1)",
    },
    spaceComplexity: "O(N)",
    aliases: ["UnionFind", "DisjointSet", "DSU"],
    code: UnionFind,
    exampleUsage: `const uf = new UnionFind(5);
uf.union(0, 1);
uf.union(1, 2);
console.log(uf.connected(0, 2)); // true
console.log(uf.connected(0, 3)); // false`,
  },
  {
    id: "segment-tree",
    name: "Segment Tree",
    category: "Advanced",
    description: "Segment Tree for logarithmic range queries (sum, min, max) and point updates.",
    timeComplexity: {
      Build: "O(N)",
      Query: "O(log N)",
      Update: "O(log N)",
    },
    spaceComplexity: "O(N)",
    aliases: ["SegmentTree"],
    code: SegmentTree,
    exampleUsage: `const seg = new SegmentTree([1, 3, 5, 7, 9, 11]);
console.log(seg.query(1, 3)); // 15 (3 + 5 + 7)
seg.update(1, 10);
console.log(seg.query(1, 3)); // 22`,
  },
  {
    id: "binary-search",
    name: "Binary Search (Bisect)",
    category: "Utilities",
    description: "Lower bound (first position >= target) and Upper bound (first position > target).",
    timeComplexity: {
      lowerBound: "O(log N)",
      upperBound: "O(log N)",
    },
    spaceComplexity: "O(1)",
    aliases: ["BinarySearch", "lowerBound", "upperBound"],
    code: BinarySearch,
    exampleUsage: `const arr = [1, 2, 4, 4, 4, 6, 7];
const idx1 = BinarySearch.lowerBound(arr, 4); // 2
const idx2 = BinarySearch.upperBound(arr, 4); // 5`,
  },
  {
    id: "helpers",
    name: "ListNode & TreeNode Helpers",
    category: "Utilities",
    description: "Construct linked lists and binary trees from arrays for fast local debugging.",
    timeComplexity: {
      Conversion: "O(N)",
    },
    spaceComplexity: "O(N)",
    aliases: ["ListNode", "TreeNode"],
    code: Helpers,
    exampleUsage: `const head = ListNode.fromArray([1, 2, 3, 4]);
const root = TreeNode.fromArray([1, null, 2, 3]);`,
  },
];

export function getStructureById(id) {
  return DATA_STRUCTURES_CATALOG.find((item) => item.id === id);
}

export function getStructureByName(name) {
  return DATA_STRUCTURES_CATALOG.find(
    (item) => item.name === name || item.aliases.includes(name)
  );
}
