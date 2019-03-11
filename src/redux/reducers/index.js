import {
  GENERATE_GRID,
  CLEAR_GRID,
  CALCULATE_PATHS,
  UPDATE_GRID
} from "../actionTypes";

import { calculateLatticePaths } from "../../lattice-paths";

const initialState = {
  grid: [],
  paths: [],
  currentPath: 0,
  x: 0,
  y: 0,
  current: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CALCULATE_PATHS:
      return {
        ...state,
        paths: calculateLatticePaths(action.payload.size)
      };

    case UPDATE_GRID:
      const { x, y } = action.payload;
      return {
        ...state,
        grid: [...state.grid.slice(0)],
        x,
        y
      };

    case GENERATE_GRID:
      const { size } = action.payload;
      const generatedGrid = Array(size)
        .fill()
        .map(() => Array(size).fill());
      return {
        ...state,
        grid: generatedGrid
      };

    case CLEAR_GRID: {
      const grid = state.grid.slice(0);

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
          grid[i][j] = undefined;
        }
      }
      return {
        ...state,
        grid
      };
    }
    default:
      return state;
  }
}
