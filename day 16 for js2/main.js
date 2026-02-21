import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  getUsersByStatus,
} from "./api.js";

const box = document.querySelector(".box");
const modal = document.querySelector(".modal");
const btnAdd = document.querySelector(".btnAdd");
const userForm = document.querySelector(".userForm");
const closeModal = document.querySelector(".closeModal");
const select = document.querySelector(".select");

let editingId = null;

btnAdd.onclick = () => {
  editingId = null;
  userForm.reset();
  modal.showModal();
};

select.onchage = (event) => {
  let value = event.target.value;
  const data = getUsersByStatus(value);
  showUsers(data);
};
closeModal.onclick = () => modal.close();

async function loadUsers() {
  const data = await getUsers();
  showUsers(data);
}

function showUsers(data) {
  box.innerHTML = "";

  data.forEach((user) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td>${user.id}</td>
            <td>
                <img src="${user.avatar}">
                ${user.name}
            </td>
            <td>${user.date}</td>
            <td>${user.role}</td>
            <td>
                <span class="status-dot ${user.status === "true" ? "active" : "inactive"}"></span>
                ${user.status === "true" ? "Active" : "Inactive"}
            </td>
            <td>
                <button class="action-btn edit">✒️</button>
                <button class="action-btn delete">❌</button>
            </td>
        `;

    tr.querySelector(".delete").onclick = async () => {
      await deleteUser(user.id);
      loadUsers();
    };

    tr.querySelector(".edit").onclick = () => {
      editingId = user.id;
      userForm.name.value = user.name;
      userForm.avatar.value = user.avatar;
      userForm.role.value = user.role;
      userForm.status.value = user.status;
      modal.showModal();
    };

    box.appendChild(tr);
  });
}

userForm.onsubmit = async (e) => {
  e.preventDefault();

  const newUser = {
    name: userForm.name.value,
    avatar: userForm.avatar.value,
    role: userForm.role.value,
    status: userForm.status.value,
  };

  if (editingId) {
    await updateUser(editingId, newUser);
  } else {
    await addUser(newUser);
  }

  modal.close();
  loadUsers();
};

loadUsers();

