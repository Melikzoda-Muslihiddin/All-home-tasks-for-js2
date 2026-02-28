export class ProductService {
  constructor(apiClient) {
    this.api = apiClient;
  }

  getAll() {
    return this.api.get("/products");
  }

  add(product) {
    return this.api.post("/products", product);
  }

  update(id, product) {
    return this.api.put(`/products/${id}`, product);
  }

  remove(id) {
    return this.api.delete(`/products/${id}`);
  }
}