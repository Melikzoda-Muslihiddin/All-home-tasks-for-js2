"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = "http://localhost:3001/users";
let box = document.querySelector(".box");
let onModal = document.querySelector(".onModal");
let addModal = document.querySelector(".addModal");
let addForm = document.querySelector(".addForm");
let addUser = document.querySelector(".addUser");
let offModal = document.querySelector(".offModal");
onModal.onclick = () => {
    addModal?.showModal();
};
offModal.onclick = () => {
    addModal?.close();
};
async function getUsers() {
    try {
        let { data: users } = await axios.get();
        return data;
    }
    catch (error) {
        console.error(error);
    }
}
async function init() {
    let data = await getUsers();
}
init();
