import { getState, setState } from "./state.js";

const tbody = document.querySelector("#tbody");
const rangeText = document.querySelector("#rangeText");
const pagination = document.querySelector("#pagination");

const actionsMenu = document.querySelector("#actionsMenu");

const formDialog = document.querySelector("#formDialog");
const form = document.querySelector("#productForm");
const formTitle = document.querySelector("#formTitle");

const infoDialog = document.querySelector("#infoDialog");
const infoContent = document.querySelector("#infoContent");

export function showSpinner(on) {
  document.querySelector("#spinner").classList.toggle("hidden", !on);
}

export function hideMenu() {
  actionsMenu.classList.add("hidden");
}

export function openMenuAt(anchorBtn, id) {
  const rect = anchorBtn.getBoundingClientRect();
  const left = Math.min(rect.left, window.innerWidth - 200);
  const top = rect.bottom + 8;

  actionsMenu.style.left = left + "px";
  actionsMenu.style.top = top + "px";
  actionsMenu.classList.remove("hidden");

  setState({ activeMenuId: id }); // controller uses this
}

export function renderTable() {
  const s = getState();
  tbody.innerHTML = "";

  s.items.forEach((p, idx) => {
    const id = String(p.id);
    const checked = s.selectedIds.has(id);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="w-40">
        <input type="checkbox" data-rowcheck="${id}" ${checked ? "checked" : ""}/>
      </td>
      <td class="w-60">${(s.page - 1) * s.limit + (idx + 1)}</td>
      <td>
        <div class="productCell">
          <img class="avatar" src="${safeImg(p.avatar)}" alt="">
          <p class="pName">${escapeHtml(p.name)}</p>
        </div>
      </td>
      <td>${escapeHtml(p.categories || "")}</td>
      <td>$${formatPrice(p.price)}</td>
      <td>${p.status ? `<span class="badge ok">In Stock</span>` : `<span class="badge bad">Out of Stock</span>`}</td>
      <td class="w-90">
        <button class="eyeBtn" type="button" data-eye="${id}" title="Actions">👁</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  const start = s.total === 0 ? 0 : (s.page - 1) * s.limit + 1;
  const end = Math.min(s.page * s.limit, s.total);
  rangeText.textContent = `Showing ${start}-${end} of ${s.total}`;

  renderPagination();
}

export function renderPagination() {
  const s = getState();
  pagination.innerHTML = "";

  const pages = Math.max(1, Math.ceil(s.total / s.limit));
  const prev = btn("Prev", s.page === 1, () => setState({ page: s.page - 1 }));
  const next = btn("Next", s.page === pages, () =>
    setState({ page: s.page + 1 }),
  );
  pagination.appendChild(prev);

  const windowSize = 5;
  let start = Math.max(1, s.page - Math.floor(windowSize / 2));
  let end = Math.min(pages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);

  for (let i = start; i <= end; i++) {
    const b = btn(String(i), false, () => setState({ page: i }));
    if (i === s.page) b.classList.add("active");
    pagination.appendChild(b);
  }

  pagination.appendChild(next);
}

function btn(text, disabled, onClick) {
  const b = document.createElement("button");
  b.className = "pageBtn";
  b.textContent = text;
  b.disabled = disabled;
  b.addEventListener("click", onClick);
  return b;
}

export function openForm(mode, product) {
  if (mode === "add") {
    formTitle.textContent = "Add Product";
    form.reset();
    form.status.value = "true";
  } else {
    formTitle.textContent = "Edit Product";
    form.name.value = product.name ?? "";
    form.categories.value = product.categories ?? "";
    form.price.value = Number(product.price) || 0;
    form.avatar.value = product.avatar ?? "";
    form.status.value = String(!!product.status);
  }
  formDialog.showModal();
}

export function closeForm() {
  formDialog.close();
}

export function openInfo(product) {
  infoContent.innerHTML = `
    <img class="infoImg" src="${safeImg(product.avatar)}" alt="">
    <div class="kv">
      <p><b>Name:</b> ${escapeHtml(product.name)}</p>
      <p><b>Categories:</b> ${escapeHtml(product.categories || "-")}</p>
      <p><b>Price:</b> $${formatPrice(product.price)}</p>
      <p><b>Status:</b> ${product.status ? "In Stock" : "Out of Stock"}</p>
      <p><b>ID:</b> ${escapeHtml(String(product.id))}</p>
    </div>
  `;
  infoDialog.showModal();
}

export function closeInfo() {
  infoDialog.close();
}

export const els = {
  tbody,
  actionsMenu,
  form,
  formDialog,
  infoDialog,
};

function formatPrice(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return "0";
  return n % 1 === 0 ? String(n) : n.toFixed(2);
}
function safeImg(url) {
  const u = String(url || "").trim();
  return u || "https://via.placeholder.com/80?text=IMG";
}
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
