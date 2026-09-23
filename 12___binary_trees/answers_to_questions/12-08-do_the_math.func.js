const evaluate = (tree) => {
  if (!tree) {
    return 0;
  } else if (typeof tree.key === "number") {
    return tree.key;
  } else if (tree.key === "+") {
    return evaluate(tree.left) + evaluate(tree.right);
  } else if (tree.key === "-") {
    return evaluate(tree.left) - evaluate(tree.right);
  } else if (tree.key === "*") {
    return evaluate(tree.left) * evaluate(tree.right);
  } else if (tree.key === "/") {
    return evaluate(tree.left) / evaluate(tree.right);
  } else {
    throw new Error("Don't know what to do with ", tree.key);
  }
};

const exampleInBook = {
  key: "*",
  left: {
    key: "+",
    left: { key: 2 },
    right: { key: 3 }
  },
  right: {
    key: 6
  }
};

console.log(evaluate(exampleInBook));
// 30
