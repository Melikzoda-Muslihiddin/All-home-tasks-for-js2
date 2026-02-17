let users = JSON.parse(localStorage.getItem("objs")) || [];
let box = document.querySelector(".box");
let regForm = document.querySelector(".regForm");
let idx = null;

function deleteUser(id) {
  users = users.filter((e) => e.id !== id);
  showUser();
}

function editUser(id) {
  let user = users.find((e) => e.id === id);
  if (user) {
    regForm["name"].value = user.name;
    regForm["age"].value = user.age;
    regForm.querySelector('input[type="checkbox"]').checked = user.status;
    idx = id;
    regForm.querySelector("button").textContent = "Save";
  }
}

regForm.onsubmit = (event) => {
  event.preventDefault();
  let status = regForm.querySelector('input[type="checkbox"]').checked;

  if (idx !== null) {
    users = users.map((u) =>
      u.id === idx
        ? {
            ...u,
            name: regForm["name"].value,
            age: regForm["age"].value,
            status,
          }
        : u,
    );
    idx = null;
    regForm.querySelector("button").textContent = "Add";
  } else {
    users.push({
      id: Date.now(),
      name: regForm["name"].value,
      age: regForm["age"].value,
      status,
    });
  }

  showUser();
  regForm.reset();
};

function showUser() {
  localStorage.setItem("objs", JSON.stringify(users));
  box.innerHTML = "";
  users.forEach((e, i) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${e.name}</td>
            <td>${e.age}</td>
            <td>${e.status ? "Active" : "Inactive"}</td>
            <td>
                <button onclick="deleteUser(${e.id})">🗑️</button>
                <button onclick="editUser(${e.id})">✒️</button>
            </td>
        `;
    box.append(tr);
  });
}
showUser();