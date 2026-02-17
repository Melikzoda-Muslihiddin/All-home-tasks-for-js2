// let users = JSON.parse(localStorage.getItem("users")) || [];

// let infoModal = document.querySelector(".infoModal");
// let tabBody = document.querySelector(".tabBody");
// let addForm = document.querySelector(".addForm");
// let cheks = document.querySelector(".cheks");
// let sub = document.querySelector(".sub");

// function deleteUser(id) {
//   let del = JSON.parse(localStorage.getItem("users")) || [];
//   del = del.filter((e) => e.id != id);
//   localStorage.setItem("users", JSON.stringify(del));
//   showUser();
// }

// function showUser() {
//   users = JSON.parse(localStorage.getItem("users")) || [];
//   tabBody.innerHTML = "";
//   users.forEach((el) => {
//     let tr = document.createElement("tr");
//     tr.innerHTML = `
//     <td>${el.vazifa}</td>
//     <td>${el.time}</td>
//     <td>${el.cheks ? "ijroshud" : "ijro nashud"}</td>
//     <td><button onclick="deleteUser(${el.id})">Delete</button></td>
//     `;
//     tabBody.append(tr);
//   });
//   localStorage.setItem("users", JSON.stringify(users));
// }
// showUser();

let btnPlus = document.querySelector(".btnPlus");
let btnMin = document.querySelector(".btnMin");
let cnt = document.querySelector(".cnt");
let btnRes = document.querySelector("btnRes");

let count = JSON.parse(localStorage.getItem("cnt")) || 0;

syncData();
btnPlus.onclick = () => {
    count++;
    syncData();
};

btnMin.onclick = () => {
    count--;
    syncData();
};

btnRes.onclick = () => {
    count = 0;
  syncData();
};

    function syncData() {
    cnt.innerText = count;
    localStorage.setItem("cnt", JSON.stringify(count));
    }