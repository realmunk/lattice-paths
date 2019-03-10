import {
  GENERATE_LATTICE_PATHS,
  VISUALIZE_PATH,
  SET_FILTER
} from "./actionTypes";

let nextTodoId = 0;

export const addTodo = content => ({
  type: GENERATE_LATTICE_PATHS,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo = id => ({
  type: VISUALIZE_PATH,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
