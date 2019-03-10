import { CLEAR_GRID } from "./actionTypes";

export const clear = _grid => {
  const grid = _grid.slice(0);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      grid[i][j] = undefined;
    }
  }

  return {
    type: CLEAR_GRID,
    payload: { grid }
  };
};
