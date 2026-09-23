const memoize = (fn) => {
  const newFn = (...args) => {
    newFn.cache = newFn.cache || new Map();
    const strX = JSON.stringify(args);
    if (!newFn.cache.has(strX)) {
      newFn.cache.set(strX, fn(...args));
    }
    return newFn.cache.get(strX);
  };
  return newFn;
};

const fibo = (n) => {
  //  console.log("FIBO CALLED", n);
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fibo(n - 2) + fibo(n - 1);
  }
};

let fibo = memoize(fibo);

/*
const fibo = memoize((n) => {
  console.log("FIBO CALLED", n);
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return fibo(n - 2) + fibo(n - 1);
  }
});
*/

/*
let t;
t = new Date().getTime();
console.log(newfibo(45), new Date().getTime() - t);
t = new Date().getTime();
console.log(newfibo(45), new Date().getTime() - t);
t = new Date().getTime();
console.log(newfibo(40), new Date().getTime() - t);
t = new Date().getTime();
console.log(newfibo(35), new Date().getTime() - t);
t = new Date().getTime();
console.log(newfibo(30), new Date().getTime() - t);
t = new Date().getTime();
console.log(newfibo(25), new Date().getTime() - t);
*/

// console.log(fibo.cache);

function fibo2(n) {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } /* n > 1 */ else {
    return fibo2(n - 2) + fibo2(n - 1);
  }
}

fibo2 = memoize(fibo2);

let t;
t = new Date().getTime();
console.log(fibo2(45), new Date().getTime() - t);
t = new Date().getTime();
console.log(fibo2(45), new Date().getTime() - t);
t = new Date().getTime();
console.log(fibo2(40), new Date().getTime() - t);
t = new Date().getTime();
console.log(fibo2(35), new Date().getTime() - t);
t = new Date().getTime();
console.log(fibo2(30), new Date().getTime() - t);
t = new Date().getTime();
console.log(fibo2(25), new Date().getTime() - t);
