import { delay, put, takeLatest, select } from "redux-saga/effects";
import { RUN_VISUALIZATION } from "../actionTypes";

import {
  generateGrid,
  runVisualizationFailed,
  updateGrid,
  visualizePathRequested,
  visualizePathSucceeded,
  visualizePathFailed
} from "../actions";

const ANIMATION_TIME = 125;

function* runVisualisation() {
  try {
    // to have reached this destination ... we know we have all the paths. lets grab em!
    const { paths } = yield select(state => state);

    for (let i = 0; i < paths.length; i++) {
      const { grid } = yield select(state => state);
      yield visualizePath(grid, paths[i]);
      yield put(generateGrid(grid.length));
      yield delay(250);
    }
  } catch (e) {
    yield put(runVisualizationFailed(e.message));
  }
}

function* visualizePath(grid, path, x = 0, y = 0) {
  try {
    let currentMove, nextMove;

    yield put(visualizePathRequested(path));

    for (let i = 0; i < path.length; i++) {
      currentMove = path[i];
      nextMove = path[i + 1];

      grid[y][x] = grid[y][x] ? grid[y][x] + currentMove : currentMove;
      let move = grid[y][x];

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

      // as steps be on both edges of a coordinate, we will overflow unless we make sure they dont.
      if (x === grid.length) {
        x = grid.length - 1;
      }
      if (y === grid.length) {
        y = grid.length - 1;
      }

      yield put(updateGrid(move, x, y));
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
