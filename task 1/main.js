// STATE (данные приложения, источник истины)
// → где хранится массив объектов (todos, users и т.д.)

import{getUsers,postUser,deleteUser} from "./api.js"

let box = document.querySelector(".box");
const onModal = document.querySelector(".onModal");
const addModal = document.querySelector(".addModal");
const addForm = document.querySelector(".addForm");
const inputName = document.querySelector(".inputName");
const inputAge = document.querySelector(".inputAge");
const exitModal = document.querySelector(".exitModal");
const addUser = document.querySelector(".addUser");

// RENDER (отображение данных в DOM)
// → превращаем массив в HTML и показываем на странице

function showUsers(users) {
  box.innerHTML = "";
  users.forEach((user) => {
    box.innerHTML += `<tr>
      <td>${user.id}</td>
      <td><img style="width:50px; border-radius:50%;" src="${user.avatar}"/></td>
      <td>${user.name}</td>
      <td>${user.age}</td>
      <td class="th3">
        <button class="btnDelete" onclick="deleteUser(${user.id})"><img style="width:30px;" src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Delete_icon_1.png"/></button>
        <button class="btnEdit" onclick="editUser(${user.id})"><img style="width:30px;" src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png"/></button>
      </td>
      </tr>
      `;
  });
}

// EVENTS (действия пользователя)
// → клики, submit, input, checkbox и другие события

onModal.onclick = () => {
  addModal.show();
};
exitModal.onclick = () => {
  addModal.close();
};

// UPDATE STATE (изменение данных)
// → изменяем массив: push, filter, find, map



addForm.onsubmit= async (e)=>{
  e.preventDefault()
  let newUser ={
    id:Date.now(),
    name:addForm["name"].value.trim(),
    age:addForm["age"].value
  }
  postUser(newUser)
  addForm.reset()
}



// RENDER (повторная перерисовка интерфейса)
// → заново отображаем обновлённые данные
getUsers();

export{showUsers,inputName,inputAge,addUser}