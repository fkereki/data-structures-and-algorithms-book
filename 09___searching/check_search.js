const checkSearch = (fn, sorted = false) => {
  const data32 = sorted ? require("../data_sorted_32") : require("../data32");

  const verify = (v, i, f) => {
    if (i !== f) {
      throw new Error(`Failure searching v=${v} i=${i} fn=${f}`);
    }
    if (i !== -1) {
      console.log("Searching v=", v, " i=", i);
    }
  };

  data32.forEach((v, i) => {
    const f = fn([...data32], v);
    verify(v, i, f);
  });

  const m1 = Math.min(...data32);
  const m2 = Math.max(...data32);
  for (let i = m1 - 10; i <= m2 + 10; i++) {
    if (!data32.includes(i)) {
      verify(i, -1, fn([...data32], i));
    }
  }
};

module.exports = checkSearch;
