const api = "http://localhost:3001/users";

const onModal = document.querySelector(".onModal");
const addModal = document.querySelector(".addModal");
const addForm = document.querySelector(".addForm");
const exitModal = document.querySelector(".exitModal");
const box = document.querySelector(".box");

onModal.onclick = () => addModal.showModal();
exitModal.onclick = () => addModal.close();

async function getUsers() {
  try {
    const response = await fetch(api);
    const data = await response.json();
    showUsers(data);
  } catch (error) {
    console.error(error);
  }
}

function showUsers(users) {
  box.innerHTML = "";

  users.forEach((el, i) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${el.name}</td>
      <td>${el.age}</td>
      <td>${el.status ? "Active" : "Inactive"}</td>
      <td>
        <button class="btnDel" data-id="${el.id}">Delete</button>
        <button class="btnEdit" data-id="${el.id}">Delete</button>
      </td>
    `;

    box.appendChild(tr);
  });
}

box.addEventListener("click", async (e) => {

  const id = e.target.dataset.id;

  try {
    await fetch(`${api}/${id}`, { method: "DELETE" });
    getUsers();
  } catch (error) {
    console.error(error);
  }
});

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = addForm.elements.name.value.trim();
  const age = Number(addForm.elements.age.value);

  const status = addForm.elements.status.checked;

  const newUser = { name, age, status };

  try {
    await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    addForm.reset();
    addModal.close();
    getUsers();
  } catch (error) {
    console.error(error);
  }
});

getUsers();
