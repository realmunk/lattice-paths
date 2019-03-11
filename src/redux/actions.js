import {
  CLEAR_GRID,
  GENERATE_GRID,
  UPDATE_GRID,
  CALCULATE_PATHS,
  GENERATING_PATHS
} from "./actionTypes";

export const calculatePaths = size => {
  return {
    type: CALCULATE_PATHS,
    payload: { size }
  };
};

export const updateGrid = (move, x, y) => {
  return {
    type: UPDATE_GRID,
    payload: { x, y }
  };
};

export const generatingPaths = () => {
  return {
    type: GENERATING_PATHS
  };
};

export const generateGrid = size => {
  return {
    type: GENERATE_GRID,
    payload: { size }
  };
};

export const clearGrid = _grid => {
  return {
    type: CLEAR_GRID
  };
};
