module.exports = function findMyPath(_x, _y) {
  const x = _x;
  const y = _y;

  const steps = x + y;

  return new Promise(resolve => {
    const paths = [];

    function pathFinder(stringy = "", S = 0, E = 0) {
      if (steps === S + E) {
        paths.push(stringy);
      }

      if (E < steps / 2) {
        pathFinder(stringy + "E", S, E + 1);
      }

      if (S < steps / 2) {
        pathFinder(stringy + "S", S + 1, E);
      }
    }
    pathFinder();

    resolve(paths);
  });
};
