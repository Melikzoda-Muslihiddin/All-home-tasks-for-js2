const api = "https://6991ca7c6279728b01555696.mockapi.io/users";

const tbody = document.querySelector(".tbody");
const addBtn = document.querySelector(".addBtn");
const modal = document.querySelector(".modal");
const form = document.querySelector(".form");
const search = document.querySelector(".search");
const modalTitle = document.querySelector(".modalTitle");
const formInfo = document.querySelector(".formInfo");

let idx = null;

async function getData() {
  const res = await fetch(api);
  const data = await res.json();
  showUser(data);
}

function showUser(data) {
  tbody.innerHTML = "";

  data.forEach((user) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.salary}</td>
      <td>${user.age}</td>
      <td>
        <div class="actions">
          <div class="btn info">i</div>
          <div class="btn edit">✎</div>
          <div class="btn delete">🗑</div>
        </div>
      </td>
    `;

    tbody.append(tr);

    tr.querySelector(".delete").onclick = () => deleteUser(user.id);
    tr.querySelector(".edit").onclick = () => openEdit(user);
    tr.querySelector(".info").onclick = () =>
      alert(`Name: ${user.name}\nSalary: ${user.salary}\nAge: ${user.age}`);
  });
}

async function deleteUser(id) {
  await fetch(`${api}/${id}`, { method: "DELETE" });
  getData();
}

addBtn.onclick = () => {
  form.reset();
  idx = null;
  modalTitle.textContent = "Add Employee";
  modal.showModal();
};

function openEdit(user) {
  idx = user.id;
  form.name.value = user.name;
  form.salary.value = user.salary;
  form.age.value = user.age;
  modalTitle.textContent = "Edit Employee";
  modal.showModal();
}

form.onsubmit = async (e) => {
  e.preventDefault();

  const newUser = {
    name: form.name.value,
    salary: form.salary.value,
    age: form.age.value,
  };

  if (idx) {
    await fetch(`${api}/${idx}`, {
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
  modal.close();
  getData();
};

search.oninput = async () => {
  const res = await fetch(api);
  const data = await res.json();

  const filtered = data.filter((user) =>
    user.name.toLowerCase().includes(search.value.toLowerCase()),
  );

  showUser(filtered);
};
getData();