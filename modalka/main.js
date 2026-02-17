let Url = "https://6991ca7c6279728b01555696.mockapi.io/users";

async function getUser() {
  try {
    let res = await fetch(Url);
    const data = await res.json();
    showUser(data);
  } catch (error) {
    console.error(error);
  }
}

getUser();

let tbody = document.querySelector(".tbody");

function showUser(users) {
  tbody.innerHTML = "";
  users.forEach((user) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.age}</td>
              <td><h1 class=${user.status ? "Active" : "inactive"}>${user.status ? "Active" : "inactive"}</h1></td>
              <td>
                      <img class="info" src="./images/info.svg" alt=""/>
              </td> `;
    let info = tr.querySelector(".info");
    let infoModal = document.querySelector(".infoModal");
    info.onclick = () => {
      infoModal.innerHTML = `
                <p style="margin-top: 50px;">${user.id}</p>
                <h1 style="font-size: 20px; font-weight: 100;margin-top: 30px; margin-bottom: 30px">${user.name}</h1>
                <p>${user.age}</p>
                <h1 style="margin-top: 30px; margin-left: 160px;" class=${user.status ? "Active" : "inactive"}>${user.status ? "Active" : "inactive"}</h1>
                <Button class="exat">exat</Button>

               `;

      infoModal.showModal();

      let exat = infoModal.querySelector(".exat");
      exat.onclick = () => {
        infoModal.close();
      };
    };

    tbody.append(tr);
  });
}