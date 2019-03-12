import { delay, put, takeLatest, select } from "redux-saga/effects";
import { RUN_VISUALIZATION } from "../actionTypes";

import {
  generateGrid,
  updateGrid,
  runVisualizationFailed,
  runVisualizationSucceeded,
  visualizePathRequested,
  visualizePathSucceeded,
  visualizePathFailed
} from "../actions";

let count = 0;
const ANIMATION_TIME = 250;

function* runVisualisation() {
  try {
    // to have reached this destination ... we know we have all the paths. lets grab em!
    const { paths } = yield select(state => state);

    for (let i = 0; i < paths.length; i++) {
      const { grid } = yield select(state => state);
      yield visualizePath(grid, paths[i], i + 1);
      yield delay(750);
      yield put(generateGrid(grid.length));
      yield delay(250);
    }

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
      let move = grid[y][x];
      yield put(updateGrid(move, x, y));
      // move diagonally
      if (move.length === 2) {
        x++;
        y++;
      } else if (currentMove === "E" && nextMove === "E") {
        // move right
        x++;
      } else if (currentMove === "S" && nextMove === "S") {
        // move down
        y++;
      }

      // as steps are on both edges of a coordinate, we will overflow unless we make sure they dont.
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

export function* visualizationSaga() {
  yield takeLatest(RUN_VISUALIZATION, runVisualisation);
}
