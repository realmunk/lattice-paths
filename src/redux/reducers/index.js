import {
  UPDATE_GRID,
  SETUP_REQUESTED,
  SETUP_SUCCEEDED,
  GENERATE_GRID,
  PATHS_CALCULATED,
  GENERATE_PATHS_REQUESTED,
  GENERATE_PATHS_SUCCEEDED,
  VISUALIZE_PATH_REQUESTED,
  VISUALIZE_PATH_SUCCEEDED,
  RUN_VISUALIZATION_SUCCEEDED
} from "../actionTypes";

const initialState = {
  loading: false,
  grid: [],
  paths: [],
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

    case GENERATE_PATHS_REQUESTED:
      return {
        ...state
      };

    case GENERATE_PATHS_SUCCEEDED:
      const { paths } = action.payload;
      return {
        ...state,
        paths
      };

    case VISUALIZE_PATH_REQUESTED:
      return {
        ...state,
        currentIndex: action.payload.currentIndex,
        currentPath: action.payload.currentPath
      };

    case RUN_VISUALIZATION_SUCCEEDED:
      return {
        ...state,
        move: null,
        x: 0,
        y: 0,
        currentIndex: 0,
        currentPath: 0
      };
    case UPDATE_GRID:
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
