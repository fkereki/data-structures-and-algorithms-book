const deepFreeze = (o) => {
  if (o && typeof o === "object" && !Object.isFrozen(o)) {
    Object.freeze(o);
    Object.getOwnPropertyNames(o).forEach((p) => deepFreeze(o[p]));
  }
  return o;
};

module.exports = deepFreeze;
