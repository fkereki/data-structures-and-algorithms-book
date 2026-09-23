const newStack = () => null;

const isEmpty = (stack) => stack === null;

const push = (stack, value) => ({ value, next: stack });

const pop = (stack) => (isEmpty(stack) ? stack : stack.next);

const top = (stack) => (isEmpty(stack) ? undefined : stack.value);

module.exports = {
  isEmpty,
  newStack,
  push,
  pop,
  top
};
