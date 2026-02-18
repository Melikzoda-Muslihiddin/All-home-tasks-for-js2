let api = "https://6991ca7c6279728b01555696.mockapi.io/users"

const onModal = document.querySelector('.onModal');
const btnAdd = document.querySelector('.btnAdd');
const addModal = document.querySelector('.addModal');
const tBody = document.querySelector('.tBody');

onModal.onclick=()=>{
    addModal.show()
}
btnAdd.onclick=()=>{
    addModal.close()
}

async function getUsers(users) {
    try {
        const response = await fetch(api)
        const data = await response.json()
        showUsers(data)
    } catch (error) {
        console.error(error);
    }
}

async function showUsers(data) {
    data.forEach((el) => {
        let tr = document.createElement("tr")
        tr.className = "trTable"
        tr.innerHTML = `
        <tr>
            <td class="trTable">${el.name}</td>
            <td class="trTable">${el.age}</td>
            <td class="trTable">${el.job}</td>
            <td class="trTable">${el.country}</td>
            <td class="trTable">${el.status?"Active":"Inactive"}</td>
            <td class="trTable">
                <img class="icon del" src="./icons/delete.svg" alt="">
                <img class="icon edit" src="./icons/edit.svg" alt="">
            </td>
        </tr>
        `
        tBody.append(tr)



    });
}
getUsers()