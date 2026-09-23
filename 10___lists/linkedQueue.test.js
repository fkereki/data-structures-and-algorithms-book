const { isEmpty, newQueue, enter, exit, front } = require("./linkedQueue");

let qq = newQueue();
console.log("QUEUE (should be null, true) ", qq, isEmpty(qq));

qq = enter(qq, 22);
qq = enter(qq, 9);
qq = enter(qq, 60);

console.log("QUEUE (should be 22 9 60, false) ", qq, isEmpty(qq));
console.log("TOP (should be 22)", front(qq));

qq = exit(qq);
qq = exit(qq);
console.log("FRONT1 (should be 60, false) ", qq, isEmpty(qq));

qq = enter(qq, 12);
qq = enter(qq, 4);
console.log("FRONT2 (should be 60 12 4, false) ", qq, isEmpty(qq));
qq = exit(qq);
console.log("FRONT3 (should be 12 4, false) ", qq, isEmpty(qq));
qq = exit(qq);
console.log("FRONT4 (should be 4, false) ", qq, isEmpty(qq));
qq = exit(qq);
console.log("FRONT5 (should be null, true) ", qq, isEmpty(qq));
