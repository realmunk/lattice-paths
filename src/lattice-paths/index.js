// calculate the factorial of a given number
function factorial(num) {
  if (num <= 1) {
    return 1;
  }

  for (let i = num - 1; i >= 1; i--) {
    num = num * i;
  }

  return num;
}

// calculate the number of possible lattice paths
function calculatePaths(_gridSize) {
  return (
    factorial(_gridSize * 2) / (factorial(_gridSize) * factorial(_gridSize))
  );
}

// calculate and memoize the possible lattice paths
function generatePaths(_gridSize) {
  const moves = _gridSize + _gridSize;

  const paths = [];

  function pathFinder(accumulator = "", S = 0, E = 0) {
    if (moves === S + E) {
      paths.push(accumulator);
      return paths;
    }

    if (E < moves / 2) {
      pathFinder(accumulator + "E", S, E + 1);
    }

    if (S < moves / 2) {
      pathFinder(accumulator + "S", S + 1, E);
    }
  }

  pathFinder();

  return paths;
}

module.exports = {
  calculatePaths,
  generatePaths
};
