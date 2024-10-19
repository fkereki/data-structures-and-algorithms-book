const solve = (goal, rings, score = 0, hit = []) => {
  if (score === goal) {
    return hit;
  } else if (score > goal || rings.length === 0) {
    return null;
  } else {
    const again = solve(goal, rings, score + rings[0], [...hit, rings[0]]);
    if (again) {
      return again;
    } else {
      const chosen = rings[0];
      const others = rings.slice(1);
      return (
        solve(goal, others, score + chosen, [...hit, chosen]) ||
        solve(goal, others, score, hit)
      );
    }
  }
};

console.log(solve(100, [40, 39, 24, 23, 17, 16]));
