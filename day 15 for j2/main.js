import{editUser,getUsers,postUser} from "./api.js"

const btnAdd = document.querySelector('.btnAdd');
const addModal = document.querySelector('.addModal');
const btnexit = document.querySelector('.Exit');
const Form = document.querySelector('.Form');
let idx = null



btnAdd.onclick = () =>{
    addModal.show()
}
btnexit.onclick = () =>{
    addModal.close()
}

Form.onsubmit = (event) =>{
    event.preventDefault()
    let obj = {
        name: Form["name"].value,
        avatar: Form["avatar"].value
    }
    postUser(event.id)
    Form.reset()
}