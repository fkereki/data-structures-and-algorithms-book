const reverse = (list) => {
  let newList = null;
  while (list !== null) {
    [list.next, newList, list] = [newList, list, list.next];
  }
  return newList;
};

const myList = {
  value: 22,
  next: { value: 9, next: { value: 60, next: null } }
};

console.log(JSON.stringify(myList));
console.log(JSON.stringify(reverse(myList)));
console.log(reverse(null));
