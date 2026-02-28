const api = "http://localhost:3001/users";

async function getUsers() {
  try {
    let { data } = await axios.get(api);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function addUser(user) {
    try {
        const {data} = await axios.post(api,user)
        return data
    } catch (error) {
        console.error(error);
    }
}
export { getUsers,addUser };
