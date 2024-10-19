function heapsort(v) {
  const sinkDown = (v, i, h) => {
    const l = 2 * i + 1;
    const r = l + 1;
    let g = i;
    if (l < h && v[l].dist > v[g].dist) {
      g = l;
    }
    if (r < h && v[r].dist > v[g].dist) {
      g = r;
    }
    if (g !== i) {
      [v[g], v[i]] = [v[i], v[g]];
      sinkDown(v, g, h);
    }
  };

  for (let i = Math.floor((v.length - 1) / 2); i >= 0; i--) {
    sinkDown(v, i, v.length);
  }

  for (let i = v.length - 1; i > 0; i--) {
    [v[i], v[0]] = [v[0], v[i]];
    sinkDown(v, 0, i);
  }
  return v;
}

// **********************

const spanning = (graph) => {
  const n = graph.length;

  const newGraph = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  let edges = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (graph[i][j]) {
        edges.push({ from: i, to: j, dist: graph[i][j] });
      }
    }
  }
  edges = heapsort(edges);

  const groups = Array(n)
    .fill(0)
    .map(() => ({ ptr: null, size: 1 }));

const findParent = (x) => {
  if (x.ptr !== null) {
    x.ptr = findParent(x.ptr);
    return x.ptr;
  } else {
    return x;
  }
};

  /* Iterative version:
  const findParent = (x) => {
    let parent = x;
    while (parent.ptr) {
      parent = parent.ptr;
    }

    while (x.ptr) {
      [x.ptr, x] = [parent, x.ptr];
    }
    return parent;
  };
  */

  edges.forEach((v) => {
    const pf = findParent(groups[v.from]);
    const pt = findParent(groups[v.to]);

    if (pf !== pt) {
      if (pf.size < pt.size) {
        pt.size += pf.size;
        pf.ptr = pt;
      } else {
        pf.size += pt.size;
        pt.ptr = pf;
      }

      newGraph[v.from][v.to] = newGraph[v.to][v.from] = graph[v.to][v.from];
    }
  });

  return newGraph;
};

// ---------------------------------

const { undirected1, undirected2 } = require("../graphs.js");

console.log(spanning(undirected1).map(JSON.stringify));
/*
[
  '[0, 4, 0, 5, 0, 0, 0]',
  '[4, 0, 0, 0, 5, 0, 0]',
  '[0, 0, 0, 0, 2, 0, 0]',
  '[5, 0, 0, 0, 0, 3, 0]',
  '[0, 5, 2, 0, 0, 0,10]',
  '[0, 0, 0, 3, 0, 0, 0]',
  '[0, 0, 0, 0,10, 0, 0]'
]
*/

console.log(spanning(undirected2).map(JSON.stringify));
/*
[
  '[0, 4, 0, 5, 0, 0, 0, 0, 0, 0]',
  '[4, 0, 0, 0, 5, 0, 0, 0, 0, 0]',
  '[0, 0, 0, 0, 2, 0, 0, 0, 0, 0]',
  '[5, 0, 0, 0, 0, 3, 0, 0, 0, 0]',
  '[0, 5, 2, 0, 0, 0,10, 0, 0, 0]',
  '[0, 0, 0, 3, 0, 0, 0, 0, 0, 0]',
  '[0, 0, 0, 0,10, 0, 0, 0, 0, 0]',
  '[0, 0, 0, 0, 0, 0, 0, 0, 6, 0]',
  '[0, 0, 0, 0, 0, 0, 0, 6, 0, 3]',
  '[0, 0, 0, 0, 0, 0, 0, 0, 3, 0]'
]
*/
