const isTautology = (fn, args = []) => {
  if (fn.length === args.length) {
    const result = !!fn(...args);
    if (!result) {
      console.log("Failed at", ...args);
    }
    return result;
  } else {
    return (
      isTautology(fn, [...args, false]) && isTautology(fn, [...args, true])
    );
  }
};

module.exports = { isTautology };
