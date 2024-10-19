const newQueue = () => [];

const isEmpty = (queue) => queue.length === 0;

const print = (queue) => console.log(queue);

const enter = (queue, value) => {
  queue.unshift(value);
  return queue;
};

const exit = (queue) => {
  if (!isEmpty(queue)) {
    queue.pop();
  }
  return queue;
};

module.exports = { newQueue, isEmpty, print, enter, exit };
