import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./api.js";
import { getState, setState, clearSelected } from "./state.js";
import {
  renderTable,
  openMenuAt,
  hideMenu,
  openForm,
  closeForm,
  openInfo,
  closeInfo,
  showSpinner,
  els,
} from "./ui.js";
import { toast } from "./toast.js";

const searchInput = document.querySelector("#searchInput");
const sortPriceBtn = document.querySelector("#sortPriceBtn");
const sortDirEl = document.querySelector("#sortDir");
const addBtn = document.querySelector("#addBtn");
const bulkDeleteBtn = document.querySelector("#bulkDeleteBtn");
const checkAll = document.querySelector("#checkAll");
const statusFilter = document.querySelector("#statusFilter");
const closeInfoBtn = document.querySelector("#closeInfoBtn");
const okInfoBtn = document.querySelector("#okInfoBtn");

let editId = null;
let debounceTimer = null;
let isLoading = false; // ✅ LOCK

init();

async function init() {
  bindUI();
  await loadList();
}

function bindUI() {
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      clearSelected();
      checkAll.checked = false;
      setState({ q: searchInput.value.trim(), page: 1 });
      await loadList();
    }, 350);
  });

  sortPriceBtn.addEventListener("click", async () => {
    const s = getState();
    const nextOrder = s.order === "asc" ? "desc" : "asc";
    sortDirEl.textContent = nextOrder === "asc" ? "↑" : "↓";

    clearSelected();
    setState({ order: nextOrder, page: 1 });
    await loadList();
  });

  statusFilter.addEventListener("change", async () => {
    clearSelected();
    checkAll.checked = false;
    setState({ status: statusFilter.value, page: 1 });
    await loadList();
  });

  addBtn.addEventListener("click", () => {
    editId = null;
    openForm("add");
  });

  bulkDeleteBtn.addEventListener("click", async () => {
    const s = getState();
    if (s.selectedIds.size === 0) return;
    if (!confirm(`Delete ${s.selectedIds.size} selected product(s)?`)) return;

    try {
      showSpinner(true);
      for (const id of s.selectedIds) await deleteProduct(id);
      toast("Deleted selected", "success");
      clearSelected();
      checkAll.checked = false;
      await loadList();
    } catch (err) {
      console.error(err);
      toast(err.message, "error", 3500);
    } finally {
      showSpinner(false);
    }
  });

  els.tbody.addEventListener("click", (e) => {
    const eyeBtn = e.target.closest("[data-eye]");
    if (!eyeBtn) return;
    e.stopPropagation();
    openMenuAt(eyeBtn, eyeBtn.dataset.eye);
  });

  els.tbody.addEventListener("change", (e) => {
    const cb = e.target.closest("[data-rowcheck]");
    if (!cb) return;

    const id = cb.dataset.rowcheck;
    const s = getState();
    if (cb.checked) s.selectedIds.add(id);
    else s.selectedIds.delete(id);

    updateBulkButton();
    updateCheckAll();
    renderTable();
  });

  checkAll.addEventListener("change", () => {
    const s = getState();
    if (checkAll.checked)
      s.items.forEach((p) => s.selectedIds.add(String(p.id)));
    else s.items.forEach((p) => s.selectedIds.delete(String(p.id)));
    updateBulkButton();
    renderTable();
  });

  document.querySelector("#pagination").addEventListener("click", async (e) => {
    const btn = e.target.closest(".pageBtn");
    if (!btn || btn.disabled) return;

    const text = btn.textContent.trim();
    const s = getState();
    const pages = Math.max(1, Math.ceil(s.total / s.limit));

    let nextPage = s.page;
    if (text === "Prev") nextPage = Math.max(1, s.page - 1);
    else if (text === "Next") nextPage = Math.min(pages, s.page + 1);
    else {
      const n = Number(text);
      if (Number.isFinite(n)) nextPage = n;
    }
    if (nextPage === s.page) return;

    clearSelected();
    checkAll.checked = false;
    setState({ page: nextPage });
    await loadList();
  });

  document
    .querySelector("#actionsMenu")
    .addEventListener("click", async (e) => {
      const item = e.target.closest("[data-action]");
      if (!item) return;

      const action = item.dataset.action;
      const s = getState();
      const id = s.activeMenuId;
      const product = s.items.find((p) => String(p.id) === String(id));

      hideMenu();
      if (!product) return;

      if (action === "info") return openInfo(product);

      if (action === "edit") {
        editId = product.id;
        return openForm("edit", product);
      }

      if (action === "delete") {
        if (!confirm(`Delete "${product.name}"?`)) return;
        try {
          showSpinner(true);
          await deleteProduct(id);
          toast("Deleted", "success");
          s.selectedIds.delete(String(id));
          await loadList();
        } catch (err) {
          console.error(err);
          toast(err.message, "error", 3500);
        } finally {
          showSpinner(false);
        }
      }
    });

  document.addEventListener("click", (e) => {
    const isEye = e.target.closest("[data-eye]");
    const isMenu = e.target.closest("#actionsMenu");
    if (!isEye && !isMenu) hideMenu();
  });

  els.form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(els.form);
    const raw = Object.fromEntries(fd.entries());

    const payload = {
      name: String(raw.name || "").trim(),
      categories: String(raw.categories || "").trim(),
      price: Number(raw.price),
      avatar: String(raw.avatar || "").trim(),
      status: raw.status === "true",
    };

    if (!payload.name || payload.name.length < 2)
      return toast("Name too short", "error");
    if (!payload.categories || payload.categories.length < 2)
      return toast("Categories too short", "error");
    if (!Number.isFinite(payload.price) || payload.price < 0)
      return toast("Invalid price", "error");

    try {
      showSpinner(true);
      if (editId == null) {
        await createProduct(payload);
        toast("Added", "success");
      } else {
        await updateProduct(editId, payload);
        toast("Updated", "success");
      }
      closeForm();
      await loadList();
    } catch (err) {
      console.error(err);
      toast(err.message, "error", 3500);
    } finally {
      showSpinner(false);
    }
  });

  closeInfoBtn.addEventListener("click", closeInfo);
  okInfoBtn.addEventListener("click", closeInfo);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideMenu();
      if (document.querySelector("#formDialog")?.open) closeForm();
      if (document.querySelector("#infoDialog")?.open) closeInfo();
    }
  });
}

async function loadList() {
  if (isLoading) return; // ✅ не даём циклу
  isLoading = true;

  const s = getState();
  try {
    showSpinner(true);

    const { data, total } = await listProducts({
      page: s.page,
      limit: s.limit,
      q: s.q,
      sort: s.sort,
      order: s.order,
      status: s.status,
    });

    setState({
  items: Array.isArray(data) ? data : [],  
  total: Number.isFinite(total) ? total : (Array.isArray(data) ? data.length : 0),
});

    updateCheckAll();
    updateBulkButton();
    renderTable();
  } catch (err) {
    console.error(err);
    toast(err.message, "error", 4000);
  } finally {
    showSpinner(false);
    isLoading = false; // ✅ всегда снимаем lock
  }
}

function updateBulkButton() {
  const s = getState();
  bulkDeleteBtn.disabled = s.selectedIds.size === 0;
}

function updateCheckAll() {
  const s = getState();
  checkAll.checked =
    s.items.length > 0 && s.items.every((p) => s.selectedIds.has(String(p.id)));
}
