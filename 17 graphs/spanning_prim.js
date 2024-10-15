const spanning = (graph) => {
  const n = graph.length;

  const newGraph = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  const heap = Array(n)
    .fill(0)
    .map((v, i) => ({ from: i, to: i, dist: +Infinity }));

  /*
    bubbleUp and sinkDown written iteratively
    instead of recursively just for variety
  */
  const bubbleUp = (i) => {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (heap[i].dist > heap[p].dist) {
        return;
      }
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };

  const sinkDown = (i) => {
    for (;;) {
      const l = 2 * i + 1;
      const r = l + 1;
      let m = i;
      if (l < heap.length && heap[l].dist < heap[m].dist) {
        m = l;
      }
      if (r < heap.length && heap[r].dist < heap[m].dist) {
        m = r;
      }
      if (m === i) {
        return;
      }
      [heap[m], heap[i]] = [heap[i], heap[m]];
      i = m;
    }
  };

  while (heap.length) {
    // pick the closest point not yet picked
    const from = heap[0].from;
    const to = heap[0].to;

    newGraph[from][to] = graph[from][to];
    newGraph[to][from] = graph[to][from];

    // remove it from the heap
    heap[0] = heap[heap.length - 1];
    heap.pop(); // or the more unconventional heap.length--;
    sinkDown(0);

    // adjust distances from the from point
    // to all the still heap.length points
    for (let i = 0; i < heap.length; i++) {
      const v = heap[i];
      const dist = graph[v.from][from];

      if (dist > 0 && dist < v.dist) {
        v.to = from;
        v.dist = dist;
        bubbleUp(i);
      }
    }
  }

  return newGraph;
};

// -------------------------------------

const { undirected1, undirected2 } = require("./graphs.js");

console.log(spanning(undirected1).map(JSON.stringify));

console.log(spanning(undirected2).map(JSON.stringify));
