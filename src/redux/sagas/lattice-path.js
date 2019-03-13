import { put, takeLatest } from "redux-saga/effects";
import { SETUP } from "../actionTypes";

import {
  setupRequested,
  setupSucceeded,
  setupFailed,
  pathsCalculated,
  generatePathsRequested,
  generatePathsSucceeded,
  generatePathsFailed,
  generateGrid
} from "../actions";

import { calculatePaths, generatePaths } from "../../lattice-paths";

function* runSetup(action) {
  try {
    const { size } = action.payload;
    yield put(setupRequested());

    // start by constructing a grid
    yield put(generateGrid(size));

    // calculate the number of all possible routes
    const possiblePaths = yield calculatePaths(size);
    yield put(pathsCalculated(possiblePaths));

    // generate the possible routes (as this is an async operation, it will put its own actions)
    yield generateLatticePaths(size);

    // setup is finished.
    yield put(setupSucceeded());
  } catch (e) {
    console.log(e);
    yield put(setupFailed(e.message));
  }
}

// this will be expressed as a generator function with its own action sets... this can potentially take a while.
function* generateLatticePaths(size) {
  try {
    const startTime = Date.now();
    yield put(generatePathsRequested());

    const paths = yield generatePaths(size);
    const timeSpent = startTime - Date.now();
    yield put(generatePathsSucceeded(paths, timeSpent));
    return true;
  } catch (e) {
    yield put(generatePathsFailed(e.message));
  }
}

export function* latticePathSaga() {
  yield takeLatest(SETUP, runSetup);
}
