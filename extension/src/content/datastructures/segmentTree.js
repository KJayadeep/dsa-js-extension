export const SegmentTree = `/**
 * Segment Tree for range queries and point updates.
 * Query time: O(log N), Update time: O(log N).
 */
class SegmentTree {
  constructor(nums, mergeFn = (a, b) => a + b, defaultVal = 0) {
    this.n = nums.length;
    this.merge = mergeFn;
    this.defaultVal = defaultVal;
    this.tree = new Array(4 * this.n).fill(defaultVal);
    if (this.n > 0) this._build(nums, 0, 0, this.n - 1);
  }

  _build(nums, treeIdx, l, r) {
    if (l === r) {
      this.tree[treeIdx] = nums[l];
      return;
    }
    const mid = Math.floor((l + r) / 2);
    const leftChild = 2 * treeIdx + 1;
    const rightChild = 2 * treeIdx + 2;
    this._build(nums, leftChild, l, mid);
    this._build(nums, rightChild, mid + 1, r);
    this.tree[treeIdx] = this.merge(this.tree[leftChild], this.tree[rightChild]);
  }

  update(index, val) {
    this._update(0, 0, this.n - 1, index, val);
  }

  _update(treeIdx, l, r, index, val) {
    if (l === r) {
      this.tree[treeIdx] = val;
      return;
    }
    const mid = Math.floor((l + r) / 2);
    const leftChild = 2 * treeIdx + 1;
    const rightChild = 2 * treeIdx + 2;
    if (index <= mid) {
      this._update(leftChild, l, mid, index, val);
    } else {
      this._update(rightChild, mid + 1, r, index, val);
    }
    this.tree[treeIdx] = this.merge(this.tree[leftChild], this.tree[rightChild]);
  }

  query(ql, qr) {
    return this._query(0, 0, this.n - 1, ql, qr);
  }

  _query(treeIdx, l, r, ql, qr) {
    if (ql <= l && r <= qr) return this.tree[treeIdx];
    if (qr < l || ql > r) return this.defaultVal;
    const mid = Math.floor((l + r) / 2);
    const leftRes = this._query(2 * treeIdx + 1, l, mid, ql, qr);
    const rightRes = this._query(2 * treeIdx + 2, mid + 1, r, ql, qr);
    return this.merge(leftRes, rightRes);
  }
}
`;
