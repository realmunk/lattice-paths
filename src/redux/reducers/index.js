import {
  UPDATE_GRID,
  GENERATE_LATTICE_PATHS,
  CLEAR_GRID
} from "../actionTypes";

const initialState = {
  grid: [],
  current: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_GRID:
    case CLEAR_GRID: {
      const { grid } = action.payload;
      return {
        ...state,
        grid
      };
    }
    default:
      return state;
  }
}
