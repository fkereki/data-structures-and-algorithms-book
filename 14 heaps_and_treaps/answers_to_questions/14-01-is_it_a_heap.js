function isHeap1(v) {
  for (let i = 1; i < v.length; i++) {
    if (v[i] > v[Math.floor((i - 1) / 2)]) {
      return false;
    }
  }
  return true;
}

function isHeap2(heap) {
  return heap.every((v, i) => i === 0 || v <= heap[Math.floor((i - 1) / 2)]);
}

console.log(isHeap1([60, 56, 40, 34, 24, 22, 11, 9, 12, 4])); // true
console.log(isHeap1([56, 60, 40, 34, 24, 22, 11, 9, 12, 4])); // false
console.log(isHeap1([60, 56, 40, 9, 24, 22, 11, 34, 12, 4])); // false

console.log(isHeap2([60, 56, 40, 34, 24, 22, 11, 9, 12, 4])); // true
console.log(isHeap2([56, 60, 40, 34, 24, 22, 11, 9, 12, 4])); // false
console.log(isHeap2([60, 56, 40, 9, 24, 22, 11, 34, 12, 4])); // false
