import { Emitter } from "./Emitter.js";

export class Store extends Emitter {
  constructor() {
    super();
    this.state = {
      items: [],
      query: "",
      sort: "title-asc",
      selected: new Set()
    };
  }

  setItems(items) {
    this.state.items = items;
    this.emit("change", this.getView());
  }

  setQuery(query) {
    this.state.query = query;
    this.emit("change", this.getView());
  }

  setSort(sort) {
    this.state.sort = sort;
    this.emit("change", this.getView());
  }

  toggleSelect(id) {
    this.state.selected.has(id) ? this.state.selected.delete(id) : this.state.selected.add(id);
    this.emit("selection", this.getSelection());
  }

  setAllSelected(ids, checked) {
    this.state.selected = checked ? new Set(ids) : new Set();
    this.emit("selection", this.getSelection());
  }

  clearSelected() {
    this.state.selected = new Set();
    this.emit("selection", this.getSelection());
  }

  getSelection() {
    return Array.from(this.state.selected);
  }

  getView() {
    const q = this.state.query.trim().toLowerCase();

    let list = [...this.state.items];

    if (q) {
      list = list.filter((p) => {
        const blob = `${p.title} ${p.subtitle} ${p.category}`.toLowerCase();
        return blob.includes(q);
      });
    }

    const [field, dir] = this.state.sort.split("-");
    const sign = dir === "asc" ? 1 : -1;

    list.sort((a, b) => {
      const A = a[field];
      const B = b[field];
      if (typeof A === "number" && typeof B === "number") return (A - B) * sign;
      return String(A).localeCompare(String(B)) * sign;
    });

    return list;
  }
}