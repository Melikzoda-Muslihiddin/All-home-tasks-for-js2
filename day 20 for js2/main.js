import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./api.js";

const tbody = document.querySelector("#tbody");
const search = document.querySelector("#search");
const sortBtn = document.querySelector("#sortBtn");
const addBtn = document.querySelector("#addBtn");
const deleteSelectedBtn = document.querySelector("#deleteSelected");


const menu = document.querySelector("#menu");
const formDialog = document.querySelector("#formDialog");
const form = document.querySelector("#form");
const formTitle = document.querySelector("#formTitle");
const closeForm = document.querySelector("#closeForm");

const infoDialog = document.querySelector("#infoDialog");
const infoBox = document.querySelector("#infoBox");
const closeInfo = document.querySelector("#closeInfo");

let data = [];
let editId = null;
let sortAsc = true;
let selected = new Set();
let activeId = null;

init();

async function init() {
  data = await getProducts();
  showProducts();
}

function showProducts() {
  let filtered = data.filter((p) =>
    p.name.toLowerCase().includes(search.value.toLowerCase()),
  );

  filtered.sort((a, b) =>
    sortAsc
      ? Number(a.price) - Number(b.price)
      : Number(b.price) - Number(a.price),
  );

  tbody.innerHTML = "";

  filtered.forEach((p, i) => {
    tbody.innerHTML += `
    <tr>
      <td><input type="checkbox" data-id="${p.id}" ${selected.has(p.id) ? "checked" : ""}></td>
      <td>${i + 1}</td>
      <td>
        <img src="${p.avatar}" width="30">
        ${p.name}
      </td>
      <td>${p.categories}</td>
      <td>$${p.price}</td>
      <td>${p.status ? "In Stock" : "Out of Stock"}</td>
      <td><button data-eye="${p.id}">👁</button></td>
    </tr>
    `;
  });

  deleteSelectedBtn.disabled = selected.size === 0;
}

search.oninput = showProducts;

sortBtn.onclick = () => {
  sortAsc = !sortAsc;
  sortBtn.textContent = `Sort by Price ${sortAsc ? "↑" : "↓"}`;
  showProducts();
};

tbody.addEventListener("change", (e) => {
  if (e.target.dataset.id) {
    if (e.target.checked) selected.add(e.target.dataset.id);
    else selected.delete(e.target.dataset.id);
  }
  deleteSelectedBtn.disabled = selected.size === 0;
});

deleteSelectedBtn.onclick = async () => {
  for (let id of selected) {
    await deleteProduct(id);
  }
  selected.clear();
  data = await getProducts();
  showProducts();
};

tbody.addEventListener("click", (e) => {
  if (e.target.dataset.eye) {
    activeId = e.target.dataset.eye;
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
    menu.classList.remove("hidden");
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.dataset.eye && !e.target.dataset.act) {
    menu.classList.add("hidden");
  }
});

menu.addEventListener("click", async (e) => {
  const product = data.find((p) => p.id === activeId);

  if (e.target.dataset.act === "info") {
    infoBox.innerHTML = `
      <img src="${product.avatar}" width="100"><br>
      Name: ${product.name}<br>
      Category: ${product.categories}<br>
      Price: $${product.price}<br>
      Status: ${product.status ? "In Stock" : "Out of Stock"}
    `;
    infoDialog.showModal();
  }

  if (e.target.dataset.act === "edit") {
    editId = product.id;
    formTitle.textContent = "Edit";
    form.name.value = product.name;
    form.categories.value = product.categories;
    form.price.value = product.price;
    form.avatar.value = product.avatar;
    form.status.value = product.status;
    formDialog.showModal();
  }

  if (e.target.dataset.act === "delete") {
    await deleteProduct(product.id);
    data = await getProducts();
    showProducts();
  }

  menu.classList.add("hidden");
});

addBtn.onclick = () => {
  editId = null;
  form.reset();
  formTitle.textContent = "Add";
  formDialog.showModal();
};

form.onsubmit = async (e) => {
  e.preventDefault();

  const obj = {
    name: form.name.value,
    categories: form.categories.value,
    price: form.price.value,
    avatar: form.avatar.value,
    status: form.status.value === "true",
  };

  if (editId) {
    await updateProduct(editId, obj);
  } else {
    await addProduct(obj);
  }

  formDialog.close();
  data = await getProducts();
  showProducts();
};
closeForm.onclick = () => formDialog.close();
closeInfo.onclick = () => infoDialog.close();