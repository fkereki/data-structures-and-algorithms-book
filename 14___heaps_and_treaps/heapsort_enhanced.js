/*
  Heapsort using _sinkDown, an enhancement by Robert "Bob" Floyd
*/

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

function heapsort_enhanced(v) {
  for (let i = Math.floor((v.length - 1) / 2); i >= 0; i--) {
    _sinkDown(v, i, v.length);
  }

  for (let i = v.length - 1; i > 0; i--) {
    [v[i], v[0]] = [v[0], v[i]];
    _sinkDown(v, 0, i);
  }
  return v;
}

module.exports.heapsort_enhanced = heapsort_enhanced;
