let users = JSON.parse(localStorage.getItem("data")) || [];
let box = document.querySelector(".box");
let Form = document.querySelector(".Form");
let idx= null
function deleteUser(id) {
  users = users.filter((e) => e.id != id);
  showUser();
}

function editUser(id) {
    if(idx){

        users = users.find((e)=>{
            Form["name"].value = e.name;
            Form["job"].value = e.job;
        }) 
    }
}

Form.onsubmit = (event) => {
  event.preventDefault();
  let obj = {
    id: Date.now(),
    name: Form["name"].value,
    job: Form["job"].value,
  };

  users.push(obj);
  localStorage.setItem("data", JSON.stringify(users));
  showUser();
  Form.reset();
};
function showUser() {
  box.innerHTML = "";
  users.forEach((e, i) => {
    let tr = document.createElement("tr");
    let tdid = document.createElement("td");
    let tdName = document.createElement("td");
    let tdJob = document.createElement("td");
    let tdStatus = document.createElement("td");
    let tdActions = document.createElement("td");
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");

    btnDelete.textContent = "Delete";
    btnEdit.textContent = "Edit";
    tdid.innerHTML = i + 1;
    tdName.innerHTML = e.name;
    tdJob.innerHTML = e.job;
    tdStatus.innerHTML = e.status ? "Active" : "Inactive";

    btnDelete.onclick = () => {
      deleteUser(e.id);
    };
    btnEdit.onclick = () => {
      editUser(e.id);
    };

    tdActions.append(btnDelete, btnEdit);
    tr.append(tdid, tdName, tdJob, tdStatus, tdActions);
    box.append(tr);
  });
}
showUser();