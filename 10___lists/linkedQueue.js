const newQueue = () => ({ first: null, last: null });

const isEmpty = (queue) => queue.first === null;

const enter = (queue, value) => {
  if (isEmpty(queue)) {
    queue.first = queue.last = { value, next: null };
  } else {
    queue.last.next = { value, next: null };
    queue.last = queue.last.next;
  }
  return queue;
};

const exit = (queue) => {
  if (!isEmpty(queue)) {
    queue.first = queue.first.next;
    if (queue.first === null) {
      queue.last = null;
    }
  }
  return queue;
};

const front = (queue) => (isEmpty(queue) ? undefined : queue.first.value);

module.exports = {
  isEmpty,
  newQueue,
  enter,
  exit,
  front
};
