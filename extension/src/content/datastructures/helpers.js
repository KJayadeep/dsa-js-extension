export const Helpers = `/**
 * ListNode and TreeNode helper utilities for debugging LeetCode problems locally.
 */
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }

  static fromArray(arr) {
    const dummy = new ListNode(0);
    let curr = dummy;
    for (const val of arr) {
      curr.next = new ListNode(val);
      curr = curr.next;
    }
    return dummy.next;
  }

  static toArray(head) {
    const res = [];
    while (head) {
      res.push(head.val);
      head = head.next;
    }
    return res;
  }
}

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  static fromArray(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length > 0 && i < arr.length) {
      const curr = queue.shift();
      if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
        curr.left = new TreeNode(arr[i]);
        queue.push(curr.left);
      }
      i++;
      if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
        curr.right = new TreeNode(arr[i]);
        queue.push(curr.right);
      }
      i++;
    }
    return root;
  }
}
`;
