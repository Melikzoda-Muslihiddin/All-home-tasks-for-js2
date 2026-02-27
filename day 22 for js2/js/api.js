const API_URL = "http://localhost:3000/users";

async function getUsers() {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    console.log("GET error:", error);
    return [];
  }
}

async function deleteUser(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.log("DELETE error:", error);
    return false;
  }
}

async function updateUser(id, newData) {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, newData);
    return data;
  } catch (error) {
    console.log("PUT error:", error);
    return null;
  }
}

async function patchUser(id, newData) {
  try {
    const { data } = await axios.patch(`${API_URL}/${id}`, newData);
    return data;
  } catch (error) {
    console.log("PATCH error:", error);
    return null;
  }
}

async function createUser(user) {
  try {
    const { data } = await axios.post(API_URL, user);
    return data;
  } catch (error) {
    console.log("POST error:", error);
    return null;
  }
}

export { getUsers, deleteUser, updateUser, patchUser, createUser };
