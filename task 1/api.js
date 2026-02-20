import{showUsers} from "./main.js"
const api = "https://6991ca7c6279728b01555696.mockapi.io/users";


async function editUser(id){
  try {
    await axios.put(`${api}/${id}`)
    getUsers()
  } catch (error) {
    console.error(error);
  }
}

async function postUser(newUser) {
  try {
    await axios.post(api,newUser)
  } catch (error) {
    console.error(error);
  }
}

async function deleteUser(id){
  try {
    await axios.delete(`${api}/${id}`)
    getUsers()
  } catch (error) {
    console.error(error);
  }
}

async function getUsers() {
  try {
    let {data} = await axios.get(api);
    showUsers(data);
  } catch (error) {
    console.error(error);
  }
}
getUsers()
export{editUser,getUsers,deleteUser,postUser}