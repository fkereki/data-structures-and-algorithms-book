const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
      const strX = JSON.stringify(args);
      if (!cache.has(strX)) {
        cache.set(strX, fn(...args));
      }
      return cache.get(strX);
    };
  };