const makeChainable = (obj) =>
  new Proxy(obj, {
    get(target, property, receiver) {
      return typeof target[property] === "function"
        ? (...args) => {
            const result = target[property](...args);
            return result === undefined ? receiver : result;
          }
        : target[property];
    }
  });

class Mobster {
  constructor(firstName, lastName, nickname) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickname = nickname;
  }

  setFirstName(newFirst) {
    this.firstName = newFirst;
  }
  setLastName(newLast) {
    this.lastName = newLast;
  }
  setNickname(newNickname) {
    this.nickname = newNickname;
  }
  getFullName() {
    return `${this.firstName} "${this.nickname}" ${this.lastName}`;
  }
}

const makeMobster = (...args) => makeChainable(new Mobster(...args));

const gangster = makeMobster("Alphonse", "Capone", "Al");
console.log(gangster.getFullName());

console.log(
  gangster
    .setFirstName("Benjamin")
    .setLastName("Siegel")
    .setNickname("Bugsy")
    .getFullName()
);
