import { all } from "redux-saga/effects";

import { latticePathSaga } from "./lattice-path";
import { visualizationSaga } from "./visualization";

export default function* rootSaga() {
  yield all([latticePathSaga(), visualizationSaga()]);
}
