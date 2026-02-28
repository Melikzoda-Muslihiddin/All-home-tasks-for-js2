export class ProductModal {
  constructor({ modal, form, btnClose }) {
    this.modal = modal;
    this.form = form;
    this.btnClose = btnClose;

    this.mode = "add";
    this.currentId = null;

    this.btnClose.onclick = () => this.close();
  }

  openAdd() {
    this.mode = "add";
    this.currentId = null;
    this.form.reset();
    this.form.querySelector(".modalTitle").textContent = "Add Product";
    this.modal.showModal();
  }

  openEdit(product) {
    this.mode = "edit";
    this.currentId = product.id;

    this.form.querySelector(".modalTitle").textContent = "Edit Product";
    this.form.title.value = product.title || "";
    this.form.subtitle.value = product.subtitle || "";
    this.form.category.value = product.category || "";
    this.form.image.value = product.image || "";
    this.form.price.value = product.price ?? "";
    this.form.qty.value = product.qty ?? "";
    this.form.status.value = product.status || "in";

    this.modal.showModal();
  }

  close() {
    this.modal.close();
  }

  getValues() {
    return {
      title: this.form.title.value.trim(),
      subtitle: this.form.subtitle.value.trim(),
      category: this.form.category.value.trim(),
      image: this.form.image.value.trim(),
      price: Number(this.form.price.value),
      qty: Number(this.form.qty.value),
      status: this.form.status.value
    };
  }

  onSubmit(handler) {
    this.form.onsubmit = (e) => {
      e.preventDefault();
      handler({ mode: this.mode, id: this.currentId, values: this.getValues() });
    };
  }
}