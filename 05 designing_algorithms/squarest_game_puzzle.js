const solve = (goal, standing, score = 0, dropped = []) => {
  if (score === goal) {
    return dropped;
  } else if (score > goal || standing.length === 0) {
    return null;
  } else {
    const chosen = standing[0];
    const others = standing.slice(1);
    return (
      solve(goal, others, score + chosen, [...dropped, chosen]) ||
      solve(goal, others, score, dropped)
    );
  }
};

module.exports = { solve };
