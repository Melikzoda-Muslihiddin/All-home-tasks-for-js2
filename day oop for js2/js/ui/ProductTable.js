export class ProductTable {
  constructor({ tbody, checkAll, deleteBtn, store, onView, onEdit }) {
    this.tbody = tbody;
    this.checkAll = checkAll;
    this.deleteBtn = deleteBtn;
    this.store = store;
    this.onView = onView;
    this.onEdit = onEdit;

    this.checkAll.onchange = () => {
      const ids = store.getView().map((x) => x.id);
      store.setAllSelected(ids, this.checkAll.checked);
    };

    store.on("change", (list) => this.render(list));
    store.on("selection", (selectedIds) => this.updateSelectionUI(selectedIds));
  }

  money(n) {
    return `$${Number(n).toFixed(2)}`;
  }

  render(list) {
    this.tbody.innerHTML = "";

    list.forEach((p, i) => {
      const tr = document.createElement("tr");
      const checked = this.store.state.selected.has(p.id) ? "checked" : "";

      tr.innerHTML = `
        <td><input class="rowCheck" type="checkbox" ${checked}></td>
        <td>${i + 1}</td>
        <td>
          <div style="display:flex;gap:10px;align-items:center">
            <img src="${p.image || "https://via.placeholder.com/48"}" alt="">
            <div>
              <div style="font-weight:600">${p.title}</div>
              <div style="opacity:.7;font-size:12px">${p.subtitle || ""}</div>
            </div>
          </div>
        </td>
        <td>${p.category}</td>
        <td>${this.money(p.price)}</td>
        <td>${p.qty}</td>
        <td><span class="status ${p.status}">${p.status === "in" ? "In Stock" : "Out of Stock"}</span></td>
        <td class="actions">
          <button class="iconBtn btnView">👁</button>
          <button class="iconBtn btnEdit">✏️</button>
        </td>
      `;

      tr.querySelector(".rowCheck").onchange = () => this.store.toggleSelect(p.id);
      tr.querySelector(".btnView").onclick = () => this.onView(p);
      tr.querySelector(".btnEdit").onclick = () => this.onEdit(p);

      this.tbody.append(tr);
    });

    this.updateSelectionUI(this.store.getSelection());
  }

  updateSelectionUI(selectedIds) {
    this.deleteBtn.disabled = selectedIds.length === 0;

    const viewIds = this.store.getView().map((x) => x.id);
    const allChecked = viewIds.length > 0 && viewIds.every((id) => this.store.state.selected.has(id));
    this.checkAll.checked = allChecked;
  }
}