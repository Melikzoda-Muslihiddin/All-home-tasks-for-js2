const api = "https://6991ca7c6279728b01555696.mockapi.io/users"


async function getUsers() {
    try {
        let {data} = await axios.get(api)
        showUsers(data)
    } catch (error) {
        console.error(error);
        
    }
}

async function postUser(id) {
    try {
        await axios.post(api,user)
        getUsers()
    } catch (error) {
        console.error();
    }
}

async function editUser(user) {
    try {
        await axios.put(`${api}/${user.id}`)
        getUsers()
    } catch (error) {
        console.error(error);
    }
}
export {postUser,getUsers,editUser}