const distance = (graph, from, to) => {
  const n = graph.length;

  const points = [];
  for (let i = 0; i < n; i++) {
    points[i] = {
      i,
      done: false,
      dist: i === from ? 0 : +Infinity,
      prev: null,
      index: -1
    };
  }

  const heap = [from];
  for (let i = 0; i < n; i++) {
    if (i !== from) {
      heap.push(i);
    }
  }
  heap.forEach((v, i) => (points[v].index = i));

  const swap = (i, j) => {
    [heap[i], heap[j]] = [heap[j], heap[i]];
    points[heap[i]].index = i;
    points[heap[j]].index = j;
  };

  const sinkDown = (i) => {
    const l = 2 * i + 1;
    const r = l + 1;
    let g = i;
    if (l < heap.length && points[heap[l]].dist < points[heap[g]].dist) {
      g = l;
    }
    if (r < heap.length && points[heap[r]].dist < points[heap[g]].dist) {
      g = r;
    }
    if (g !== i) {
      swap(g, i);
      sinkDown(g);
    }
  };

  const bubbleUp = (i) => {
    if (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (points[heap[i]].dist < points[heap[p]].dist) {
        swap(p, i);
        bubbleUp(p);
      }
    }
  };

  while (heap.length && heap[0] !== to) {
    const closest = heap[0];
    points[closest].done = true;
    const dist = points[closest].dist;

    swap(0, heap.length - 1);
    heap.pop();
    sinkDown(0);

    graph[closest].forEach((v, next) => {
      if (v > 0 && !points[next].done) {
        const newDist = dist + graph[closest][next];
        if (newDist < points[next].dist) {
          points[next].dist = newDist;
          points[next].prev = closest;
          bubbleUp(points[next].index);
        }
      }
    });
  }

  const path = [to];
  let prev = points[to].prev;
  while (prev !== from) {
    path.unshift(prev);
    prev = points[prev].prev;
  }
  return [points[to].dist, path];
};

// ------------------

const { undirected2 } = require("../graphs.js");

// console.log(distance(undirected2, 0, 0));
console.log(distance(undirected2, 0, 1));
console.log(distance(undirected2, 0, 2));
console.log(distance(undirected2, 0, 3));
console.log(distance(undirected2, 0, 4));
console.log(distance(undirected2, 0, 5));
console.log(distance(undirected2, 0, 6));
