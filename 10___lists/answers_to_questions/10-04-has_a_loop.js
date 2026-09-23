const hasALoop = (list) => {
  if (list === null) {
    return false;
  } else {
    let ptr1 = list;
    let ptr2 = list.next;

    while (ptr2 !== null && ptr2 !== ptr1) {
      ptr1 = ptr1.next;
      ptr2 = ptr2.next ? ptr2.next.next : null;
    }

    return ptr2 === ptr1;
  }
};

const myList = {
  value: 22,
  next: {
    value: 9,
    next: {
      value: 60,
      next: {
        value: 12,
        next: { value: 4, next: { value: 56, next: null } }
      }
    }
  }
};
console.log(hasALoop(myList));

myList.next.next.next.next.next.next = myList.next.next.next;
console.log(hasALoop(myList));
