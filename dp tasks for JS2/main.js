// let btnGo = document.querySelector(".btnGo");
// let btnLight = document.querySelector(".btnLight");
// let btnDark = document.querySelector(".btnDark");
// let body = document.querySelector(".body");

// let darkMode = localStorage.getItem("darkMode") || "light";

// if (darkMode == "dark") {
//   body.style.backgroundColor = "black";
//   body.style.color = "white";
// }
// if (darkMode == "light") {
//   body.style.backgroundColor = "white";
//   body.style.color = "black";
// }
// btnLight.onclick = () => {
//   localStorage.setItem("darkMode", "light");
//   let darkMode = localStorage.getItem("darkMode") || "light";
//   if (darkMode == "light") {
//     body.style.backgroundColor = "white";
//     body.style.color = "black";
//   }
// };
// btnDark.onclick = () => {
//   localStorage.setItem("darkMode", "dark");
//   let darkMode = localStorage.getItem("darkMode") || "light";
//   if (darkMode == "dark") {
//     body.style.backgroundColor = "black";
//     body.style.color = "white";
//   }
// };

////////////////////////////////////////////////////

// btnGo.onclick = () =>{
//     if(fullName){
//         window.location.href="./index2.html"
//     }
//     else{
//         window.location.href="./login.html"
//     }
// }

//////////////////////////////////////////////////////

let divUsers = document.querySelector(".divUsers")
let btnAdd = document.querySelector(".btnAdd")
let addModal = document.querySelector(".addModal")
let inpName = document.querySelector(".inpName")
let selectStatus = document.querySelector(".selectStatus")
let btnSave = document.querySelector(".btnSave")

btnAdd.onclick =()=>{
    addModal.showModal()
}
let users = JSON.parse(localStorage.getItem("users")) || []

btnSave.onclick=()=>{
    let users = JSON.parse(localStorage.getItem("users")) || []
    users.push({
        name:inpName.value,
        id:Date.now(),
        status:selectStatus.value=="active"
    })
    localStorage.setItem("users",JSON.stringify(users))
    getUsers(users)
    addModal.close()
}

function deleteUser(id){
    let users = JSON.parse(localStorage.getItem("users"))
    users=users.filter(e=>e.id!=id)
    localStorage.setItem("users",JSON.stringify(users))
    getUsers(users)
}
function getUsers(data){
    divUsers.innerHTML = ""
    data.forEach(user => {
        let divUser = document.createElement("div")
        let pName = document.createElement("p")
        pName.innerHTML = user.name
        let pStatus = document.createElement("p")
        pStatus.innerHTML = user.status == true?"Active":"Inactive"

        let btnDelete = document.createElement("button")
        btnDelete.innerHTML = "Delete"

        btnDelete.onclick = () =>{
            deleteUser(user.id)
        }
        divUser.append(pName,pStatus,btnDelete)
        divUsers.append(divUser)
    });
}
getUsers(users)