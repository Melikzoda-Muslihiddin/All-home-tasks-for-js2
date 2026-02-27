import { getUsers, deleteUser, updateUser, patchUser, createUser } from "./api.js";

const box = document.querySelector(".box");
const searchInput = document.querySelector(".searchInput");

const btnAdd = document.querySelector(".btnAdd");

const addModal = document.querySelector(".addModal");
const addForm = document.querySelector(".addForm");
const btnCloseAdd = document.querySelector(".btnCloseAdd");

const addName = document.querySelector(".addName");
const addEmail = document.querySelector(".addEmail");
const addAvatar = document.querySelector(".addAvatar");
const addJob = document.querySelector(".addJob");
const addPosition = document.querySelector(".addPosition");
const addEmployed = document.querySelector(".addEmployed");
const addStatus = document.querySelector(".addStatus");

const btnOnline = document.querySelector(".btnOnline");
const btnOffline = document.querySelector(".btnOffline");
const btnAll = document.querySelector(".btnAll");

const infoModal = document.querySelector(".infoModal");
const infoBody = document.querySelector(".infoBody");
const btnCloseInfo = document.querySelector(".btnCloseInfo");

const editModal = document.querySelector(".editModal");
const editForm = document.querySelector(".editForm");
const btnCloseEdit = document.querySelector(".btnCloseEdit");

const editName = document.querySelector(".editName");
const editEmail = document.querySelector(".editEmail");
const editAvatar = document.querySelector(".editAvatar");
const editJob = document.querySelector(".editJob");
const editPosition = document.querySelector(".editPosition");
const editStatus = document.querySelector(".editStatus");

let users = [];
let filterMode = "all";
let editingUserId = null;

function norm(s) {
  return (s ?? "").toString().trim().toLowerCase();
}

function applyFilters(list) {
  let res = [...list]

  res = res.filter((u) => {
    if (filterMode === "online") return u.status === true;
    if (filterMode === "offline") return u.status === false;
    return true;
  });

  const q = norm(searchInput.value);
  if (q) {
    res = res.filter((u) => {
      const name = norm(u.name);
      const email = norm(u.email);
      return name.includes(q) || email.includes(q);
    });
  }

  return res;
}

btnAdd.onclick = () => addModal.showModal();

btnCloseAdd.onclick = () => {
  addModal.close();
  addForm.reset();
};

addForm.onsubmit = async (e) => {
  e.preventDefault();

  const user = {
    name: addName.value.trim(),
    email: addEmail.value.trim(),
    avatar: addAvatar.value.trim(),
    job: addJob.value.trim(),
    position: addPosition.value.trim(),
    employed: addEmployed.value.trim(),
    status: addStatus.checked
  };

  if (!user.name) return;

  const created = await createUser(user);
  if (!created) return alert("Create error");

  users.unshift(created);
  addModal.close();
  addForm.reset();
  render();
};

function makeCard(user) {
  const div = document.createElement("div");
  div.className = "card";

  const avatar = user.avatar || "https://via.placeholder.com/80";
  const name = user.name ?? "No name";
  const email = user.email ?? "No email";
  const job = user.job ?? "-";
  const position = user.position ?? "-";
  const employed = user.employed ?? "-";

  div.innerHTML = `
    <div class="cardTop">
      <img class="avatar" src="${avatar}" alt="${name}">
      <div>
        <h3 class="name">${name}</h3>
        <p class="sub">${email}</p>
      </div>
    </div>

    <div class="badges">
      <span class="badge">Job: ${job}</span>
      <span class="badge">Position: ${position}</span>
      <span class="badge">Employed: ${employed}</span>
    </div>

    <div class="badges statusRow">
      <span class="badge">${user.status ? "Online" : "Offline"}</span>
      <label class="statusRow">
        <input class="statusCheck" type="checkbox" ${user.status ? "checked" : ""} />
        <span>status</span>
      </label>
    </div>

    <div class="actions">
      <button class="actionBtn btnInfo">Info</button>
      <button class="actionBtn btnEdit">Edit</button>
      <button class="actionBtn btnDelete">Delete</button>
    </div>
  `;

  div.querySelector(".btnInfo").onclick = () => openInfo(user);

  div.querySelector(".btnEdit").onclick = () => openEdit(user);

  div.querySelector(".btnDelete").onclick = async () => {
    const ok = confirm(`Delete "${name}" ?`);
    if (!ok) return;

    const res = await deleteUser(user.id);
    if (!res) return alert("Delete error");

    users = users.filter((u) => u.id !== user.id);
    render();
  };

  div.querySelector(".statusCheck").onchange = async (e) => {
    const newStatus = e.target.checked;

    const oldStatus = user.status;
    user.status = newStatus;
    render();

    const updated = await patchUser(user.id, { status: newStatus });
    if (!updated) {
      user.status = oldStatus;
      render();
      alert("Status update error");
      return;
    }

    user.status = updated.status;
    render();
  };

  return div;
}

function render() {
  box.innerHTML = "";
  const list = applyFilters(users);

  if (list.length === 0) {
    box.innerHTML = `<p class="sub">No users...</p>`;
    return;
  }

  list.forEach((u) => box.appendChild(makeCard(u)));
}

function openInfo(user) {
  const lines = [
    ["ID", user.id],
    ["Name", user.name],
    ["Email", user.email],
    ["Job", user.job],
    ["Position", user.position],
    ["Employed", user.employed],
    ["Status", user.status ? "Online" : "Offline"],
  ];

  infoBody.innerHTML = `
    <div class="cardTop">
      <img class="avatar" src="${user.avatar || "https://via.placeholder.com/80"}" alt="">
      <div>
        <h3 class="name">${user.name ?? "-"}</h3>
        <p class="sub">${user.email ?? "-"}</p>
      </div>
    </div>
    <div style="margin-top:10px;">
      ${lines
        .map(([k, v]) => `<div class="infoLine"><b>${k}:</b> ${v ?? "-"}</div>`)
        .join("")}
    </div>
  `;

  infoModal.showModal();
}

btnCloseInfo.onclick = () => infoModal.close();

function openEdit(user) {
  editingUserId = user.id;

  editName.value = user.name ?? "";
  editEmail.value = user.email ?? "";
  editAvatar.value = user.avatar ?? "";
  editJob.value = user.job ?? "";
  editPosition.value = user.position ?? "";
  editStatus.checked = user.status === true;

  editModal.showModal();
}

btnCloseEdit.onclick = () => {
  editModal.close();
  editForm.reset();
  editingUserId = null;
};

editForm.onsubmit = async (e) => {
  e.preventDefault();
  if (editingUserId == null) return;

  const oldUser = users.find((u) => u.id === editingUserId);
  if (!oldUser) return;

  const newUser = {
    ...oldUser,
    name: editName.value.trim(),
    email: editEmail.value.trim(),
    avatar: editAvatar.value.trim(),
    job: editJob.value.trim(),
    position: editPosition.value.trim(),
    status: editStatus.checked,
  };

  const updated = await updateUser(editingUserId, newUser);
  if (!updated) return alert("Edit error");

  users = users.map((u) => (u.id === editingUserId ? updated : u));

  editModal.close();
  editForm.reset();
  editingUserId = null;

  render();
};

searchInput.oninput = () => render();

btnOnline.onclick = () => {
  filterMode = "online";
  render();
};

btnOffline.onclick = () => {
  filterMode = "offline";
  render();
};

btnAll.onclick = () => {
  filterMode = "all";
  render();
};
async function init() {
  users = await getUsers();
  render();
}

init();
