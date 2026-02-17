const box = document.querySelector(".box");
const addForm = document.querySelector(".addForm");
const submit = document.querySelector(".submit");
let idx = null;
let users = [
  {
    id: 1,
    name: "John One",
    job: "mentor",
    age: 20,
    city: "Dushanbe",
    status: true,
  },
  {
    id: 2,
    name: "John Two",
    job: "junior",
    age: 25,
    city: "Xatlon",
    status: false,
  },
];
function showUsers() {
  box.innerHTML = "";
  users.forEach((e) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td class="tds">${e.name}</td>
        <td class="tds">${e.job}</td>
        <td class="tds">${e.age}</td>
        <td class="tds">${e.city}</td>
        <td class="tds">${e.status ? "Active" : "Inactive"}</td>
        <td class="tds">
            <button class="btns" onclick="infoUser(${e.id})">ℹ️</button>
            <button class="btns" onclick="deleteUser(${e.id})">🗑️</button>
            <button class="btns" onclick="editUsers(${e.id})">✏️</button>
        </td>`;
    box.append(tr);
  });
}
showUsers();
function deleteUser(id) {
  users = users.filter((e) => e.id !== id);
  showUsers();
}
addForm.onsubmit = (event) => {
  event.preventDefault();
  let obj = {
    id: Date.now(),
    name: addForm["names"].value,
    job: addForm["jobs"].value,
    age: addForm["ages"].value,
    city: addForm["citys"].value,
    status: addForm["status"].checked,
  };
  if (idx) {
    users = users.map((e) => (e.id === idx ? obj : e));
    submit.innerHTML = "Add User";
    idx = null;
  } else {
    users.push(obj);
  }
  addForm.reset();
  showUsers();
};
function editUsers(id) {
  let user = users.find((e) => e.id === id);
  idx = id;
  submit.innerHTML = "Edit User";
  addForm["names"].value = user.name;
  addForm["jobs"].value = user.job;
  addForm["ages"].value = user.age;
  addForm["citys"].value = user.city;
  addForm["status"].checked = user.status;
}
function infoUser(id) {
  let user = users.find((e) => e.id === id);
  alert(`
Name: ${user.name}
Job: ${user.job}
Age: ${user.age}
City: ${user.city}
Status: ${user.status ? "Active" : "Inactive"}
  `);
}
showUsers();