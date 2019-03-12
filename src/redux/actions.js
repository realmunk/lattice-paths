import {
  SETUP,
  SETUP_FAILED,
  SETUP_SUCCEEDED,
  SETUP_REQUESTED,
  GENERATE_PATHS,
  GENERATE_PATHS_REQUESTED,
  GENERATE_PATHS_SUCCEEDED,
  GENERATE_PATHS_FAILED,
  PATHS_CALCULATED,
  UPDATE_GRID,
  GENERATE_GRID,
  RUN_VISUALIZATION,
  RUN_VISUALIZATION_FAILED,
  VISUALIZE_PATH,
  VISUALIZE_PATH_REQUESTED,
  VISUALIZE_PATH_SUCCEEDED,
  VISUALIZE_PATH_FAILED
} from "./actionTypes";

/**
 * sync actions
 * */

export const updateGrid = (move, x, y) => {
  return {
    type: UPDATE_GRID,
    payload: { move, x, y }
  };
};

export const generateGrid = size => {
  return {
    type: GENERATE_GRID,
    payload: { size }
  };
};

export const pathsCalculated = possiblePaths => {
  return {
    type: PATHS_CALCULATED,
    payload: { possiblePaths }
  };
};

/**
 * all async actions are expressed with [action]Requested|Succeeded|Failed
 * in the cases where action is expressed as is – without postfix, the action itself is triggered by middleware.
 * */

export const setup = size => {
  return {
    type: SETUP,
    payload: { size }
  };
};

export const setupRequested = () => {
  return {
    type: SETUP_REQUESTED
  };
};

export const setupSucceeded = () => {
  return {
    type: SETUP_SUCCEEDED
  };
};

export const setupFailed = message => {
  return {
    type: SETUP_FAILED,
    message
  };
};

export const generatePaths = size => {
  return {
    type: GENERATE_PATHS,
    size
  };
};

export const generatePathsRequested = () => {
  return {
    type: GENERATE_PATHS_REQUESTED
  };
};

export const generatePathsSucceeded = paths => {
  return {
    type: GENERATE_PATHS_SUCCEEDED,
    payload: { paths }
  };
};

export const generatePathsFailed = message => {
  return {
    type: GENERATE_PATHS_FAILED,
    message
  };
};

export const runVisualization = () => {
  return {
    type: RUN_VISUALIZATION
  };
};

export const runVisualizationFailed = message => {
  return {
    type: RUN_VISUALIZATION_FAILED,
    message
  };
};

export const visualizePath = message => {
  return {
    type: VISUALIZE_PATH,
    message
  };
};

export const visualizePathRequested = (currentPath, currentPosition) => {
  return {
    type: VISUALIZE_PATH_REQUESTED,
    payload: {
      currentPath,
      currentPosition
    }
  };
};

export const visualizePathSucceeded = () => {
  return {
    type: VISUALIZE_PATH_SUCCEEDED
  };
};

export const visualizePathFailed = message => {
  return {
    type: VISUALIZE_PATH_FAILED,
    message
  };
};
