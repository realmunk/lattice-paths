import {
  VISUALIZE_STEP,
  SETUP_REQUESTED,
  SETUP_SUCCEEDED,
  GENERATE_GRID,
  PATHS_CALCULATED,
  VISUALIZE_PATH_REQUESTED,
  RUN_VISUALIZATION_REQUESTED,
  RUN_VISUALIZATION_SUCCEEDED,
  RUN_VISUALIZATION_FAILED
} from "../actionTypes";

const initialState = {
  loading: false,
  runningVisualization: false,
  grid: [],
  possiblePaths: 0,
  currentPath: 0,
  currentIndex: 0,
  x: 0,
  y: 0,
  current: null,
  move: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SETUP_REQUESTED:
      return {
        ...state,
        loading: true
      };

    case SETUP_SUCCEEDED:
      return {
        ...state,
        loading: false
      };

    case GENERATE_GRID:
      const { size } = action.payload;
      return {
        ...state,
        grid: Array(size)
          .fill()
          .map(() => Array(size).fill())
      };

    case PATHS_CALCULATED:
      const { possiblePaths } = action.payload;
      return {
        ...state,
        possiblePaths
      };

    case VISUALIZE_PATH_REQUESTED:
      return {
        ...state,
        currentIndex: action.payload.currentIndex,
        currentPath: action.payload.currentPath
      };

    case RUN_VISUALIZATION_REQUESTED:
      return {
        ...state,
        runningVisualization: true
      };

    case RUN_VISUALIZATION_FAILED:
    case RUN_VISUALIZATION_SUCCEEDED:
      return {
        ...state,
        runningVisualization: false,
        move: null,
        x: 0,
        y: 0,
        currentIndex: 0,
        currentPath: 0
      };

    case VISUALIZE_STEP:
      const { move, x, y } = action.payload;
      return {
        ...state,
        move,
        x,
        y,
        grid: [
          ...state.grid.slice(0, y),
          state.grid[y].map((item, index) => {
            if (index === x) {
              return move;
            }
            return item;
          }),
          ...state.grid.slice(y + 1, state.grid.length)
        ]
      };

    default:
      return state;
  }
}
