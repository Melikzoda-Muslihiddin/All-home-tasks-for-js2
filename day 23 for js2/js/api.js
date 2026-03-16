const api = "http://localhost:3001/users";

async function getUsers() {
  try {
    const { data } = await axios.get(api);
    return data; 
  } catch (error) {
    console.error(error);
    return [];
  }
}

export { getUsers };