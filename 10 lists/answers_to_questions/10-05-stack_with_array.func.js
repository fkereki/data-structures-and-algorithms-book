const newStack = () => [];

const isEmpty = (stack) => stack.length === 0;

const print = (stack) => console.log(stack);

const push = (stack, value) => {
  stack.push(value);
  return stack;
};

const top = (stack) => (isEmpty(stack) ? undefined : stack[stack.length - 1]);

const pop = (stack) => {
  if (!isEmpty(stack)) {
    stack.pop();
  }
  return stack;
};

module.exports = { newStack, isEmpty, print, push, top, pop };
