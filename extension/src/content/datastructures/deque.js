export const Deque = `/**
 * Optimal O(1) Double-Ended Queue (Deque) for JavaScript.
 * Supports O(1) push and pop at both ends.
 */
class Deque {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }

  pushBack(item) {
    this.items[this.tail] = item;
    this.tail++;
  }

  pushFront(item) {
    this.head--;
    this.items[this.head] = item;
  }

  popFront() {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return item;
  }

  popBack() {
    if (this.isEmpty()) return undefined;
    this.tail--;
    const item = this.items[this.tail];
    delete this.items[this.tail];
    return item;
  }

  peekFront() {
    if (this.isEmpty()) return undefined;
    return this.items[this.head];
  }

  peekBack() {
    if (this.isEmpty()) return undefined;
    return this.items[this.tail - 1];
  }

  isEmpty() {
    return this.tail <= this.head;
  }

  size() {
    return Math.max(0, this.tail - this.head);
  }
}
`;
