export const BinarySearch = `/**
 * Binary Search utilities for JavaScript (equivalent to Python bisect_left and bisect_right).
 */
const BinarySearch = {
  // Returns leftmost index where target could be inserted to keep arr sorted
  lowerBound(arr, target, keyFn = (x) => x) {
    let l = 0;
    let r = arr.length;
    while (l < r) {
      const mid = Math.floor((l + r) / 2);
      if (keyFn(arr[mid]) < target) {
        l = mid + 1;
      } else {
        r = mid;
      }
    }
    return l;
  },

  // Returns rightmost index where target could be inserted to keep arr sorted
  upperBound(arr, target, keyFn = (x) => x) {
    let l = 0;
    let r = arr.length;
    while (l < r) {
      const mid = Math.floor((l + r) / 2);
      if (keyFn(arr[mid]) <= target) {
        l = mid + 1;
      } else {
        r = mid;
      }
    }
    return l;
  }
};
`;
