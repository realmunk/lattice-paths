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

export function nrOfLatticePaths(_gridSize) {
  return (
    factorial(_gridSize * 2) / (factorial(_gridSize) * factorial(_gridSize))
  );
}

export function findLatticePaths(_gridSize) {
  const steps = _gridSize + _gridSize;

  const paths = [];

  function pathFinder(accumulator = "", S = 0, E = 0) {
    if (steps === S + E) {
      paths.push(accumulator);
    }

    if (E < steps / 2) {
      pathFinder(accumulator + "E", S, E + 1);
    }

    if (S < steps / 2) {
      pathFinder(accumulator + "S", S + 1, E);
    }
  }

  pathFinder();
  return paths;
}
