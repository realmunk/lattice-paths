import { delay, put, takeLatest, select } from "redux-saga/effects";
import { RUN_VISUALIZATION, GENERATE_PATHS_SUCCEEDED } from "../actionTypes";

import {
  generateGrid,
  visualizeStep,
  runVisualizationFailed,
  runVisualizationSucceeded,
  visualizePathRequested,
  visualizePathSucceeded,
  visualizePathFailed,
  runVisualizationRequested
} from "../actions";

let paths = []; // PS: we keep paths outside of the store, as they will break the dev-tools due to their huge size.

const ANIMATION_TIME = 75;

// runVisualization: Make this particular function able to run through the defined paths
function* runVisualisation() {
  try {
    console.log("Good job.");
    console.log("All the paths are available here as", paths);
    console.log(
      "This is due to the connection between GENERATE_PATHS_SUCCEEDED and the storePaths in visualizationSaga"
    );
  } catch (e) {
    yield put(runVisualizationFailed(e.message));
  }
}

function* visualizePath(grid, path, index, x = 0, y = 0) {
  try {
    let currentMove, nextMove;

    yield put(visualizePathRequested(path, index));

    for (let i = 0; i < path.length; i++) {
      currentMove = path[i];
      nextMove = path[i + 1];

      grid[y][x] = grid[y][x] ? grid[y][x] + currentMove : currentMove;

      // we start by updating the grid with the current move
      yield put(visualizeStep(grid[y][x], x, y));

      // move diagonally
      if (grid[y][x].length === 2) {
        x++;
        y++;
      } else if (currentMove === "E" && nextMove === "E") {
        // move right
        x++;
      } else if (currentMove === "S" && nextMove === "S") {
        // move down
        y++;
      }

      // as steps will be on both edges of a column/row position, we will overflow unless we make sure they dont.
      if (x === grid.length) {
        x = grid.length - 1;
      }
      if (y === grid.length) {
        y = grid.length - 1;
      }

      yield delay(ANIMATION_TIME);
    }

    yield put(visualizePathSucceeded());
  } catch (e) {
    yield put(visualizePathFailed(e.message));
  }
}

function storePaths(action) {
  paths = action.payload.paths;
}

// visualizationSaga: registers specific actions to trigger functions
export function* visualizationSaga() {
  yield takeLatest(GENERATE_PATHS_SUCCEEDED, storePaths);

  // Start HERE by implementing a connection between the RUN_VISUALIZATION action and this saga...
}
