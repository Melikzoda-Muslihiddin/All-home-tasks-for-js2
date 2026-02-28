import { getUsers,addUser } from "./api.js";

const btnAdd = document.querySelector(".btnAdd");
const addModal = document.querySelector(".addModal");
const addForm = document.querySelector(".addForm");
const btnOffModa = document.querySelector(".btnOffModa");
const box = document.querySelector(".box");

btnAdd.onclick = () => addModal.show();
btnOffModa.onclick = () => addModal.close();

function showUsers(data) {
    box.innerHTML = "";
    data.forEach((user) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${user.id}</td>
        <td><img src="${user.avatar}"></td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>
        <button class="btnDelete">🗑️</button>
        <button class="btnEdit">✒️</button>
        </td>
        `;
        box.append(tr);
    });
}

addForm.onsubmit= async (event)=>{
    event.preventDefault()

    const user = {
        id:Date.now(),
        name:addForm["name"].value,
        age:addForm["age"].value,
        avatar:addForm["image"].value,
        email:addForm["email"].value,
    }

    const {data} = await addUser()
    data.unshift(user)
    addModal.close()
    addForm.reset()
    showUsers()
}

async function init() {
  let data = await getUsers();
  showUsers(data);
}
init();