function merge_away(lists) {
  const heap = [];

  const add = (node) => {
    const bubbleUp = (i) => {
      if (i > 0) {
        const p = Math.floor((i - 1) / 2);
        if (heap[i].key < heap[p].key) {
          [heap[p], heap[i]] = [heap[i], heap[p]];
          bubbleUp(p);
        }
      }
    };

    // push only actual nodes, not null values

    if (node) {
      heap.push(node);
      bubbleUp(heap.length - 1);
    }
  };

  const remove = () => {
    const sinkDown = (i, h) => {
      const l = 2 * i + 1;
      const r = l + 1;
      let g = i;
      if (l < h && heap[l].key < heap[g].key) {
        g = l;
      }
      if (r < h && heap[r].key < heap[g].key) {
        g = r;
      }
      if (g !== i) {
        [heap[g], heap[i]] = [heap[i], heap[g]];
        sinkDown(g, h);
      }
    };

    const node = heap[0];
    heap[0] = heap[heap.length - 1];
    heap.pop();
    sinkDown(0, heap.length);

    return node;
  };

  // set up the heap, with the first element of each list
  lists.forEach((list) => add(list));

  // set up the output list with a dummy first node
  const first = { next: null };
  let last = first;

  // until all nodes have been dealt with
  while (heap.length > 0) {
    // remove the node with the lowest key from the heap
    const node = remove();

    // push its next node into the heap
    add(node.next);

    // add the extracted node to the output list
    last.next = node;
    last = node;
    node.next = null;
  }

  // skip the dummy initial node
  return first.next;
}

const list1 = { key: 2, next: { key: 3, next: { key: 8, next: null } } };
const list2 = { key: 1, next: { key: 13, next: { key: 55, next: null } } };
const list3 = null;
const list4 = { key: 21, next: null };
const list5 = { key: 5, next: { key: 34, next: null } };

const merged = merge_away([list1, list2, list3, list4, list5]);

let p = merged;
while (p) {
  console.log(p.key);
  p = p.next;
}
