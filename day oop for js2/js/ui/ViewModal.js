export class ViewModal {
  constructor({ modal, box, closeBtn }) {
    this.modal = modal;
    this.box = box;
    closeBtn.onclick = () => this.modal.close();
  }

  open(product) {
    this.box.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${product.image || "https://via.placeholder.com/120"}" style="width:120px;height:120px;border-radius:12px;object-fit:cover">
      <p><b>Category:</b> ${product.category}</p>
      <p><b>Price:</b> $${Number(product.price).toFixed(2)}</p>
      <p><b>Qty:</b> ${product.qty}</p>
      <p><b>Status:</b> ${product.status === "in" ? "In Stock" : "Out of Stock"}</p>
      <p style="opacity:.7">${product.subtitle || ""}</p>
    `;
    this.modal.showModal();
  }
}