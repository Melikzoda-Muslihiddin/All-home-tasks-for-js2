import {
  getMembers,
  addMember,
  updateMember,
  statusMember,
  deleteMember,
} from "./api.js";

const tbody = document.querySelector(".tbody");
const empty = document.querySelector(".empty");

const viewAllBtn = document.querySelector(".viewAllBtn");
const addBtn = document.querySelector(".addBtn");

const onlineBtn = document.querySelector(".onlineBtn");
const offlineBtn = document.querySelector(".offlineBtn");
const searchInput = document.querySelector(".searchInput");

const addModal = document.querySelector(".addModal");
const addForm = document.querySelector(".addForm");
const modalTitle = document.querySelector(".modalTitle");
const closeBtn = document.querySelector(".closeBtn");

const InfoModal = document.querySelector(".InfoModal");
const infoContent = document.querySelector(".infoContent");
const closeInfoBtn = document.querySelector(".closeInfoBtn");

let members = [];
let filterMode = "all";
let showAll = false;
let editId = null;

function onlineOfflineBtn() {
  onlineBtn.classList.toggle("active", filterMode === "online");
  offlineBtn.classList.toggle("active", filterMode === "offline");
}

function norm(s) {
  return String(s ?? "").toLowerCase();
}

function filtratsiya(list) {
  let result = [...list];

  result = result.filter((m) => {
    return filterMode === "all"
      ? true
      : filterMode == "online"
        ? m.status == true
        : m.status == false;
  });

  const q = norm(searchInput.value);
  if (q) {
    result = result.filter((m) => {
      const text = `${m.name} ${m.email} ${m.job} ${m.position} ${m.employed}`;
      return norm(text).includes(q);
    });
  }
  if (!showAll) result = result.slice(0, 5);

  return result;
}

function showUsers() {
  tbody.innerHTML = "";

  onlineOfflineBtn();

  const list = filtratsiya(members);

  list.forEach((m) => {
    const tr = document.createElement("tr");

    const statusText = m.status ? "ONLINE" : "OFFLINE";
    const statusClass = m.status ? "online" : "offline";

    tr.innerHTML = `
      <td>
        <div class="memberCell">
          <img class="avatar" src="${m.avatar}" alt="${m.name}" />
          <div class="memberText">
            <div class="memberName">${m.name}</div>
            <div class="small">${m.email}</div>
          </div>
        </div>
      </td>

      <td>
        <div>${m.job}</div>
        <div class="small">${m.position}</div>
      </td>

      <td>
        <span class="badge ${statusClass}">${statusText}</span>
      </td>

      <td>${m.employed}</td>

      <td>
        <input class="rowStatus" type="checkbox" ${m.status ? "checked" : ""} />
      </td>

      <td>
        <div class="actions">
          <button class="iconBtn editBtn">Edit</button>
          <button class="iconBtn deleteBtn">Delete</button>
        </div>
      </td>
    `;
    tr.querySelector(".memberCell").onclick = () => openInfo(m);
    tr.querySelector(".editBtn").onclick = () => openEdit(m);
    tr.querySelector(".deleteBtn").onclick = async () => {
      const ok = confirm("Delete this member?");
      if (!ok) return;

      const done = await deleteMember(m.id);
      if (done) {
        members = members.filter((x) => x.id !== m.id);
        showUsers();
      }
    };
    tr.querySelector(".rowStatus").onclick = async (e) => {
      const newStatus = e.target.checked;
      const updated = await statusMember(m.id, { status: newStatus });
      if (updated) {
        members = members.map((x) => (x.id === m.id ? updated : x));
        showUsers();
      } else {
        e.target.checked = !!m.status;
      }
    };
    tbody.appendChild(tr);
  });
  viewAllBtn.textContent = showAll ? "VIEW 5" : "VIEW ALL";
}
function openAdd() {
  editId = null;
  modalTitle.textContent = "Add member";
  addForm.reset();
  addModal.showModal();
}
function openEdit(member) {
  editId = member.id;
  modalTitle.textContent = "Edit member";
  addForm.name.value = member.name;
  addForm.email.value = member.email;
  addForm.avatar.value = member.avatar;
  addForm.job.value = member.job;
  addForm.position.value = member.position;
  addForm.employed.value = member.employed;
  addForm.status.checked = !!member.status;
  addModal.showModal();
}
function openInfo(member) {
  infoContent.innerHTML = `
     <div class="infoRow">
        <div class="infoKey">Name</div>
        <div>${member.name}</div>
    </div>
    <div class="infoRow">
        <div class="infoKey">Email</div>
        <div>${member.email}</div>
    </div>
    <div class="infoRow">
        <div class="infoKey">Job</div>
        <div>${member.job}</div>
    </div>
    <div class="infoRow">
        <div class="infoKey">Position</div>
        <div>${member.position}</div>
    </div>
    <div class="infoRow">
        <div class="infoKey">Employed</div>
        <div>${member.employed}</div>
    </div>
    <div class="infoRow">
        <div class="infoKey">Status</div>
        <div>${member.status ? "ONLINE" : "OFFLINE"}</div>
    </div>
    <div class="infoRow">
        <div class="infoKey">Avatar</div>
        <div><img class="avatar" src="${member.avatar}" alt="${member.name}" /></div>
    </div>
  `;
  InfoModal.showModal();
}
async function init() {
  members = await getMembers();
  showUsers();
}
addBtn.onclick = openAdd;
closeBtn.onclick = () => addModal.close();
closeInfoBtn.onclick = () => InfoModal.close();
viewAllBtn.onclick = () => {
  showAll = !showAll;
  showUsers();
};
onlineBtn.onclick = () => {
  filterMode = "online";
  showUsers();
};
offlineBtn.onclick = () => {
  filterMode = "offline";
  showUsers();
};
searchInput.oninput = () => showUsers();
addForm.onsubmit = async (e) => {
  e.preventDefault();
  const t = e.target;
  const memberObj = {
    name: t.name.value,
    email: t.email.value,
    avatar: t.avatar.value,
    job: t.job.value,
    position: t.position.value,
    employed: t.employed.value,
    status: t.status.checked,
    id: editId ? editId : String(Date.now()),
  };
  if (editId) {
    const updated = await updateMember(editId, memberObj);
    if (updated) {
      members = members.map((x) => (x.id === editId ? updated : x));
      addModal.close();
      addForm.reset();
      showUsers();
    }
  } else {
    const created = await addMember(memberObj);
    if (created) {
      members.unshift(created);
      addModal.close();
      addForm.reset();
      showUsers();
    }
  }
};

init();
