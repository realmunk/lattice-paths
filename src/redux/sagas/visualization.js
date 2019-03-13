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

/*
 *
 * We keep the paths out of the store, as they will break the dev-tools due to their huge size.
 *
 */
let paths = [];

const ANIMATION_TIME = 75;

function* runVisualisation() {
  try {
    yield put(runVisualizationRequested());

    // TODO: A visualization should run through all the paths
    const { grid } = yield select(state => state);
    yield visualizePath(grid, paths[0], 1);
    yield delay(500);
    yield put(generateGrid(grid.length));
    yield delay(250);
    yield put(runVisualizationSucceeded());
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

      // we start by updating the grid
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

    // we reset all necessary state with visualizePathSucceeded
    yield put(visualizePathSucceeded());
  } catch (e) {
    yield put(visualizePathFailed(e.message));
  }
}

function storePaths(action) {
  paths = action.payload.paths;
}
export function* visualizationSaga() {
  yield takeLatest(GENERATE_PATHS_SUCCEEDED, storePaths);
  yield takeLatest(RUN_VISUALIZATION, runVisualisation);
}
