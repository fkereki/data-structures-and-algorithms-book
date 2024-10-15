/*
  Original heapsort method by John W J Williams, 1964
*/

const _bubbleUp = (v, i) => {
  if (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (v[i] > v[p]) {
      [v[p], v[i]] = [v[i], v[p]];
      _bubbleUp(v, p);
    }
  }
};

const _sinkDown = (v, i, h) => {
  const l = 2 * i + 1;
  const r = l + 1;
  let g = i;
  if (l < h && v[l] > v[g]) {
    g = l;
  }
  if (r < h && v[r] > v[g]) {
    g = r;
  }
  if (g !== i) {
    [v[g], v[i]] = [v[i], v[g]];
    _sinkDown(v, g, h);
  }
};

function heapsort_original(v) {
  for (let i = 1; i < v.length; i++) {
    _bubbleUp(v, i);
  }

  for (let i = v.length - 1; i > 0; i--) {
    [v[i], v[0]] = [v[0], v[i]];
    _sinkDown(v, 0, i);
  }

  return v;
}

module.exports.heapsort_original = heapsort_original;
