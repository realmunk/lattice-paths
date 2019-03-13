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

// calculatePaths: calculates the number of possible lattice paths

// 1. You are only move to East or South,
// 2. You start in the top left corner
// 3. You end in the bottom right corner

function calculatePaths(_gridSize) {
  return (
    factorial(_gridSize + _gridSize) /
    (factorial(_gridSize) * factorial(_gridSize))
  );
}

// generatePaths() : generates the possible lattice paths

// 1. A given path through the matrice is represented as a string
// 2. The path only consists of two characters, representing East with 'E' and South with 'S'
// 3. An example of a valid string follows: 'EEEEEEEEEEEESSSSSSSSSSSS'

function generatePaths(_gridSize) {
  // TODO: Generate all the possible paths through the grid
  return ["EEEEEEEEEEEESSSSSSSSSSSS"];
}

module.exports = {
  calculatePaths,
  generatePaths
};
