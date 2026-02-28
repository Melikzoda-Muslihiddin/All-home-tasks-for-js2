import { ApiClient } from "./api/ApiClient.js";
import { ProductService } from "./api/ProductService.js";
import { Store } from "./core/Store.js";
import { ProductTable } from "./ui/ProductTable.js";
import { ProductModal } from "./ui/ProductModal.js";
import { ViewModal } from "./ui/ViewModal.js";

const api = new ApiClient("http://localhost:3001");
const service = new ProductService(api);
const store = new Store();

const tbody = document.querySelector(".tbody");
const searchInput = document.querySelector(".searchInput");
const sortSelect = document.querySelector(".sortSelect");
const btnAdd = document.querySelector(".btnAdd");
const btnDeleteSelected = document.querySelector(".btnDeleteSelected");
const checkAll = document.querySelector(".checkAll");

const productModal = new ProductModal({
  modal: document.querySelector(".productModal"),
  form: document.querySelector(".productForm"),
  btnClose: document.querySelector(".btnClose"),
});

const viewModal = new ViewModal({
  modal: document.querySelector(".viewModal"),
  box: document.querySelector(".viewBox"),
  closeBtn: document.querySelector(".viewClose"),
});

new ProductTable({
  tbody,
  checkAll,
  deleteBtn: btnDeleteSelected,
  store,
  onView: (p) => viewModal.open(p),
  onEdit: (p) => productModal.openEdit(p),
});

searchInput.oninput = (e) => store.setQuery(e.target.value);
sortSelect.onchange = (e) => store.setSort(e.target.value);

btnAdd.onclick = () => productModal.openAdd();

btnDeleteSelected.onclick = async () => {
  const ids = store.getSelection();
  try {
    await Promise.all(ids.map((id) => service.remove(id)));
    store.clearSelected();
    await load();
  } catch (e) {
    console.error(e);
  }
};

productModal.onSubmit(async ({ mode, id, values }) => {
  try {
    if (mode === "add") await service.add(values);
    else await service.update(id, values);

    productModal.close();
    await load();
  } catch (e) {
    console.error(e);
  }
});

async function load() {
  try {
    const items = await service.getAll();
    store.setItems(items);
  } catch (e) {
    console.error(e);
  }
}

load();
