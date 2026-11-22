export const Heap = `/**
 * Binary Heap / PriorityQueue implementation for JavaScript.
 * Supports O(log N) push and pop, O(1) peek.
 * Default is MinHeap. Pass comparator (a, b) => b - a for MaxHeap.
 */
class PriorityQueue {
  constructor(compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
    this.data = [];
    this.compare = compare;
  }

  push(val) {
    this.data.push(val);
    this._siftUp(this.data.length - 1);
  }

  pop() {
    if (this.isEmpty()) return undefined;
    const top = this.data[0];
    const bottom = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = bottom;
      this._siftDown(0);
    }
    return top;
  }

  peek() {
    return this.data[0];
  }

  size() {
    return this.data.length;
  }

  isEmpty() {
    return this.data.length === 0;
  }

  _siftUp(idx) {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.compare(this.data[idx], this.data[parentIdx]) < 0) {
        [this.data[idx], this.data[parentIdx]] = [this.data[parentIdx], this.data[idx]];
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  _siftDown(idx) {
    const len = this.data.length;
    while (idx * 2 + 1 < len) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallest = idx;

      if (left < len && this.compare(this.data[left], this.data[smallest]) < 0) {
        smallest = left;
      }
      if (right < len && this.compare(this.data[right], this.data[smallest]) < 0) {
        smallest = right;
      }

      if (smallest !== idx) {
        [this.data[idx], this.data[smallest]] = [this.data[smallest], this.data[idx]];
        idx = smallest;
      } else {
        break;
      }
    }
  }
}

class MinHeap extends PriorityQueue {
  constructor(compare = (a, b) => a - b) {
    super(typeof compare === "function" && compare.length === 2 ? (a, b) => (compare(a, b) < 0 ? -1 : compare(a, b) > 0 ? 1 : 0) : (a, b) => (a < b ? -1 : a > b ? 1 : 0));
  }
}

class MaxHeap extends PriorityQueue {
  constructor(compare = (a, b) => b - a) {
    super(typeof compare === "function" && compare.length === 2 ? (a, b) => (compare(b, a) < 0 ? -1 : compare(b, a) > 0 ? 1 : 0) : (a, b) => (a > b ? -1 : a < b ? 1 : 0));
  }
}
`;
