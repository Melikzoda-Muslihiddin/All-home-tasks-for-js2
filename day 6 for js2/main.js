// let box = document.querySelector(".box");
// let addForm = document.querySelector(".addForm");
// let submit = document.querySelector(".submit");
// let idx = null;
// let users = [
//   {
//     id: 1,
//     name: "Majid",
//     status: false,
//   },
//   {
//     id: 2,
//     name: "Munis",
//     status: true,
//   },
// ];

// function deleteUser(id) {
//   users = users.filter((el) => el.id != id);
//   showUsers();
// }
// addForm.onsubmit = (event) => {
//   event.preventDefault();
//   let obj = {
//     id: Date.now(),
//     name: addForm["names"].value,
//     status: addForm["status"].value == "true" ? true : false,
//   };
//   if (idx) {
//     users = users.map((e) => {
//       if (e.id == idx) {
//         e = obj;
//       }
//       return e;
//     });
//     submit.innerHTML = "Add User";
//     idx = null;
//   } else {
//     users.push(obj);
//   }
//   addForm.reset();
//   showUsers();
// };
// function editUsers(e) {
//   idx = e.id;
//   submit.innerHTML = "Edit User";
//   addForm["name"].value = e.name;
//   addForm["status"].value = e.status ? "true" : "false";
//   showUsers();
// }
// function showUsers() {
//   box.innerHTML = "";
//   users.forEach((e) => {
//     let tr = document.createElement("tr");
//     let tdName = document.createElement("td");
//     let tdStatus = document.createElement("td");
//     let tdActions = document.createElement("td");
//     let bntDelete = document.createElement("button");
//     let bntEdit = document.createElement("button");

//     bntDelete.onclick = () => {
//       deleteUser(e.id);
//     };
//     bntEdit.onclick = () => {
//       editUsers(e.id);
//     };

//     bntEdit.innerHTML = "✒️";
//     bntDelete.innerHTML = "🗑️";
//     tdName.innerHTML = e.name;
//     tdStatus.innerHTML = e.status ? "Active" : "Inactive";
//     tdActions.append(bntDelete, bntEdit);
//     tr.append(tdName, tdStatus, tdActions);
//     box.append(tr);
//   });
// }
// showUsers();

// let box = document.querySelector(".box");
// let addForm = document.querySelector(".addForm");
// let submit = document.querySelector(".submit");
// let btx = null;

// let users = [
//   {
//     id: 1,
//     name: "David",
//     status: true,
//   },
//   {
//     id: 2,
//     name: "Musalmon",
//     status: false,
//   },
// ];

// function deleteUser(id){
//     users = users.filter(el=>el.id!=id)
//     showUsers()
// }

// addForm.onsubmit = (event) =>{
//     event.preventDefault()
//     let obj = {
//         id:Date.now(),
//         name:addForm["names"].value,
//         status:addForm["status"].value=="true"?true:false
//     }
//     if(idx){
//         users = users.map(e=>{
//             if(e.id==idx){
//                 e = obj
//             }
//             return e
//         })
//         submit.innerHTML = "Add User"
//         idx=null
//     }
//     else{
//         users.push(obj)
//     }
//     addForm.reset()
//     showUsers()
// }
// function editUsers(e){
//     idx = e.id
//     submit.innerHTML = "Edit User"
//     addForm["name"].value = e.name
//     addForm["status"].value = e.status?"true":"false"
//     showUsers() 
// }
// function showUsers(){
//     box.innerHTML = ""
//     users.forEach(e=>{
//         let tr = document.createElement("tr")
//         let tdName = document.createElement("td")
//         let tdStatus = document.createElement("td")
//         let tdActions = document.createElement("td")
//         let bntDelete = document.createElement("button")
//         let bntEdit = document.createElement("button")

//         bntDelete.onclick = () => {
//             deleteUser(e.id)
//         }
//         bntEdit.onclick = () => {
//             editUsers(e.id)
//         }

//         bntDelete.innerHTML = "🗑️"
//         bntEdit.innerHTML = "✒️"
//         tdName.innerHTML = e.name
//         tdStatus.innerHTML = e.status?"Active":"Inactive"
//         tdActions.append(bntDelete,bntEdit)
//         tr.append(tdName,tdStatus,tdActions)
//         box.append(tr)
//     })
// }
// showUsers()