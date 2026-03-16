import { getUsers } from "./api.js";

const btnAdd = document.querySelector(".btnAdd");
const addModal = document.querySelector(".addModal");
const addForm = document.querySelector(".addForm");
const btnSubmit = document.querySelector(".btnSubmit");
const btnClose = document.querySelector(".btnClose");
const box = document.querySelector(".box");

function showUsers(data) {
  box.innerHTML = "";

  data.forEach((el) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${el.id}</td>
      <td><img src="${el.avatar}" width="40"/></td>
      <td>${el.name}</td>
      <td>${el.age}</td>
    `;
    box.append(tr);
  });
}

async function init() {
  const data = await getUsers();
  showUsers(data);
}

init();