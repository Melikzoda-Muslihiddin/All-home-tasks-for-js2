const api = "https://6991ca7c6279728b01555696.mockapi.io/users";

const onModal = document.querySelector(".onModal");
const addModal = document.querySelector(".addModal");
const addForm = document.querySelector(".addForm");
const exitModal = document.querySelector(".exitModal");
let box = document.querySelector(".box");

let editId = null;

onModal.onclick = () => {
  addForm.reset();
  editId = null;
  addForm.querySelector("h1").textContent = "Registration";
  addForm.querySelector(".btnExit").textContent = "Add User";
  addModal.showModal(); 
};

addModal.onclick = (e) => {
  if (e.target === addModal) addModal.close();
};

async function getUsers() {
  try {
    let response = await fetch(api);
    let data = await response.json();
    showUsers(data);
  } catch (error) {
    console.error("Ошибка при получении:", error);
  }
}

async function deleteUser(id) {
  try {
    await fetch(`${api}/${id}`, { method: "DELETE" });
    getUsers();
  } catch (error) {
    console.error("Ошибка при удалении:", error);
  }
}

addForm.onsubmit = async (e) => {
  e.preventDefault();

  const newUser = {
    name: addForm.name.value,
    email: addForm.email.value,
    contact: addForm.contact.value,
    address: addForm.address.value,
    salary: addForm.salary.value,
  };

  try {
    if (editId) {
      await fetch(`${api}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
    } else {
      await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
    }

    addModal.close();
    addForm.reset();
    getUsers();
  } catch (error) {
    console.error("Ошибка при сохранении:", error);
  }
};

function editUser(user) {
  editId = user.id;
  addForm.name.value = user.name;
  addForm.email.value = user.email;
  addForm.contact.value = user.contact;
  addForm.address.value = user.address;
  addForm.salary.value = user.salary;

  addForm.querySelector("h1").textContent = "Edit User";
  addForm.querySelector(".btnExit").textContent = "Save Changes";
  addModal.showModal();
}

function showUsers(data = []) {
  box.innerHTML = "";
  data.forEach((user) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
            <td class="container2">${user.name}</td>
            <td class="container2">${user.email}</td>
            <td class="container2">${user.contact}</td>
            <td class="container2">${user.salary}</td>
            <td class="container2">${user.address}</td>
            <td class="container2">
                <img class="icon info" src="./icons/info.svg" alt="info">
                <img class="icon edit" src="./icons/edit.svg" alt="edit">
                <img class="icon delete" src="./icons/del.svg" alt="delete">
            </td>
        `;
    box.append(tr);

    tr.querySelector(".delete").onclick = () => deleteUser(user.id);
    tr.querySelector(".edit").onclick = () => editUser(user);
  });
}
getUsers();