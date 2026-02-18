let api = "https://6991ca7c6279728b01555696.mockapi.io/products";

async function getProduct() {
  try {
    let response = await fetch(api);
    let data = await response.json();
    showProduct(data);
  } catch (error) {
    console.error(error);
  }
}

let addModal = document.querySelector(".addModal");
let btnAdd = document.querySelector(".btnAdd");

let btnReg = document.querySelector(".btnReg");
let pages = document.querySelector(".pages");

let editForm = document.querySelector("#editForm");
let editModal = document.querySelector(".editModal");

let addForm = document.querySelector("#addForm");

btnReg.onclick = () => {
  addModal.showModal();
};

addForm.onsubmit = async (event) => {
  event.preventDefault();
  let newUser = {
    name: addForm["name"].value,
    info: addForm["info"].value,
  };
  try {
    await fetch(api, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser),
    });
    getProduct();
    addModal.close();
    addForm.reset();
  } catch (error) {
    console.error(error);
  }
};

async function deleteUser(id) {
  try {
    await fetch(`${api}/${id}`, { method: "DELETE" });
    getProduct();
  } catch (error) {
    console.error(error);
  }
}

async function editUser(product) {
  editModal.showModal();
  editForm["name"].value = product.name;
  editForm["info"].value = product.info;
  editForm.onsubmit = async (e) => {
    e.preventDefault();
    let editUser = {
      name: editForm["name"].value,
      info: editForm["info"].value,
    };
    try {
      await fetch(`${api}/${product.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(editUser),
      });
      getProduct();
      editForm.reset();
      editModal.close();
    } catch (error) {
      console.error(error);
    }
  };
}

function showProduct(data = []) {
  pages.innerHTML = "";
  data.forEach((product) => {
    let contDiv = document.createElement("div");
    contDiv.className = "container";
    contDiv.innerHTML = `
        <h1 class="names">${product.name}</h1>
            <p>${product.info}</p>
            <div class="action">
                <div class="icons">
                    <img class="icon delet" src="./icons/delete.svg" alt="">
                    <img class="icon edit" src="./icons/edit.svg" alt="">
                </div>
                <label><input type="checkbox" class="check"> done</label>
            </div>
        `;
    let check = contDiv.querySelector(".check");
    let names = document.querySelector(".names");

    check.onchange = () => {
      if (check.checked) {
        names.style.textDecoration = "line-through";
      } else {
        names.style.textDecoration = "none";
      }
    };

    let delet = contDiv.querySelector(".delet");
    delet.onclick = () => {
      deleteUser(product.id);
    };
    let edit = contDiv.querySelector(".edit");
    edit.onclick = () => {
      editUser(product);
    };
    pages.append(contDiv);
  });
}
getProduct();
