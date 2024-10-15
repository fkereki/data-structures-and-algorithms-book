const deepCopy = (o) => {
  let aux = o;
  if (o && typeof o === "object") {
    aux = new o.constructor();
    Object.getOwnPropertyNames(o).forEach((p) => (aux[p] = deepCopy(o[p])));
  }
  return aux;
};

module.exports = deepCopy;
