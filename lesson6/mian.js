let tbody = document.querySelector('.tbody');
let inpName = document.querySelector('.inpName');
let inpRole = document.querySelector('.inpRole');
let inpEmail = document.querySelector('.inpEmail');
let inpCreate = document.querySelector('.inpCreate');
let btnSave = document.querySelector('.btnSave');
let btnSaveEdit = document.querySelector('.btnSaveEdit');

let inpNameEdit = document.querySelector('.inpNameEdit');
let inpRoleEdit = document.querySelector('.inpRoleEdit');
let inpEmailEdit = document.querySelector('.inpEmailEdit');
let inpCreateEdit = document.querySelector('.inpCreateEdit');

let idx = null;

let users = [
    {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRffirUslv3S2XBdU8Kmuo7E65idxvgyPnau&s",
        fullName: "Diorov",
        role: "Student",
        email: "diorov@gmail.com",
        created: "2024/11/11",
        status: false,
        id: 1
    },
    {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRffirUslv3S2XBdU8Kmuo7E65idxvgyPnau&s",
        fullName: "Muhammadrasul",
        role: "Student",
        email: "muhammadrasul@gmail.com",
        created: "2024/11/11",
        status: true,
        id: 2
    }
];

function deleteUser(id) {
    users = users.filter((user) => user.id !== id);
    getData();
}

function editStatus(id) {
    users = users.map((user) => {
        if (user.id === id) {
            return {
                ...user,
                status: !user.status
            };
        }
        return user;
    });
    getData();
}

btnSaveEdit.onclick = () => {
    users = users.map((user) => {
        if (user.id === idx) {
            return {
                ...user,
                fullName: inpNameEdit.value,
                role: inpRoleEdit.value,
                email: inpEmailEdit.value,
                created: inpCreateEdit.value
            };
        }
        return user;
    });
    getData();
};

btnSave.onclick = () => {
    let newUser = {
        id: Date.now(),
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRffirUslv3S2XBdU8Kmuo7E65idxvgyPnau&s",
        fullName: inpName.value,
        role: inpRole.value,
        email: inpEmail.value,
        created: inpCreate.value,
        status: false
    };
    users.push(newUser);
    getData();
    
    inpName.value = "";
    inpRole.value = "";
    inpEmail.value = "";
    inpCreate.value = "";
};

function getData() {
    tbody.innerHTML = "";
    users.forEach((user) => {
        let trUser = document.createElement("tr");
        let tdUser = document.createElement("td");
        let tdCreate = document.createElement("td");
        let tdStatus = document.createElement("td");
        let tdEmail = document.createElement("td");
        let tdActions = document.createElement("td");

        tdUser.innerHTML = `
        <div class="user-info">
            <img src="${user.avatar}" width="50px" alt="avatar" />
            <div>
                <h3>${user.fullName}</h3>
                <p>${user.role}</p>
            </div>
        </div>`;

        let btnDelete = document.createElement("button");
        btnDelete.innerHTML = "D"; 
        let btnEdit = document.createElement("button");
        btnEdit.innerHTML = "Y";

        let checkboxStatus = document.createElement("input");
        checkboxStatus.type = "checkbox";
        checkboxStatus.checked = user.status;    
        checkboxStatus.onclick = () => {
            editStatus(user.id);
        };

            btnDelete.onclick = () => {
                deleteUser(user.id);
            };

        btnEdit.onclick = () => {
            idx = user.id;
            inpNameEdit.value = user.fullName;
            inpRoleEdit.value = user.role;
            inpEmailEdit.value = user.email;
            inpCreateEdit.value = user.created;
        };

        

        tdStatus.innerHTML = user.status ? '<span style="color:green">Active</span>' : '<span style="color:red">Inactive</span>';
        tdEmail.innerHTML = user.email;
        tdCreate.innerHTML = user.created;
        
        tdActions.append(btnDelete,btnEdit);
        trUser.append(tdUser, tdCreate, tdStatus, tdEmail, tdActions);
        tbody.append(trUser);
    });
}
getData();