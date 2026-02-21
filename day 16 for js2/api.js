const api = "https://6991ca7c6279728b01555696.mockapi.io/users";

export async function getUsers() {
  const { data } = await axios.get(api);
  return data;
}
export async function getUsersByStatus(status) {
  const { data } = await axios.get(status ? `${api}?status=${status}` : api);
  return data;
}

export async function addUser(user) {
  await axios.post(api, {
    ...user,
    date: new Date().toLocaleDateString(),
  });
}

export async function deleteUser(id) {
  await axios.delete(`${api}/${id}`);
}

export async function updateUser(id, user) {
  await axios.put(`${api}/${id}`, user);
}
