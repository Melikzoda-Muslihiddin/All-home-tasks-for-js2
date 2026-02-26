export const API = "https://6991ca7c6279728b01555696.mockapi.io/products";

export const getProducts = async () => {
  const { data } = await axios.get(API);
  return data;
};

export const addProduct = async (obj) => {
  await axios.post(API, obj);
};
  
export const updateProduct = async (id, obj) => {
  await axios.put(`${API}/${id}`, obj);
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API}/${id}`);
};
