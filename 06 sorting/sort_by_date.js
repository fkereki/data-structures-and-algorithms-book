const people = [
  { d: 22, m: 9, y: 60, n: "alpha" },
  { d: 12, m: 4, y: 56, n: "bravo" },
  { d: 22, m: 3, y: 56, n: "hotel" },
  { d: 9, m: 1, y: 60, n: "foxtrot" },
  { d: 22, m: 4, y: 56, n: "echo" },
  { d: 22, m: 3, y: 56, n: "delta" },
  { d: 22, m: 3, y: 56, n: "india" },
  { d: 14, m: 1, y: 34, n: "charlie" },
  { d: 9, m: 12, y: 40, n: "golf" }
];

const dateNameCompare = (a, b) => {
  if (a.y !== b.y) {
    return a.y - b.y;
  } else if (a.m !== b.m) {
    return a.m - b.m;
  } else if (a.d !== b.d) {
    return a.d - b.d;
  } else if (a.n < b.n) {
    return -1;
  } else if (a.n > b.n) {
    return 1;
  } else {
    return 0;
  }
};

console.log(people.sort(dateNameCompare));
