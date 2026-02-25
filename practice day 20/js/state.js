const state = {
  items: [],
  total: 0,

  page: 1,
  limit: 5,

  q: "",
  status: "all",

  sort: "price",
  order: "asc",

  selectedIds: new Set(),
};

const listeners = new Set();

export function getState() {
  return state;
}

export function setState(patch) {
  Object.assign(state, patch);
  for (const fn of listeners) fn(state);
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function clearSelected() {
  state.selectedIds.clear();
  for (const fn of listeners) fn(state);
}
