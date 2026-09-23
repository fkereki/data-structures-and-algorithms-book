/* append list2 a list1 */

const append = (list1, list2) => {
  if (list1 === null) {
    list1 = list2;
  } else {
    let ptr = list1;
    while (ptr.next !== null) {
      ptr = ptr.next;
    }
    ptr.next = list2;
  }
  return list1;
};

const firstList = {
  value: 22,
  next: { value: 9, next: { value: 60, next: null } }
};

const secondList = {
  value: 12,
  next: { value: 4, next: null }
};

console.log(JSON.stringify(append(firstList, secondList)));
