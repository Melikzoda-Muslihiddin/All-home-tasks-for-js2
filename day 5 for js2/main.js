let users = [
  {
    id: 1,
    image: "./image.png",
    name: "Muslim",
    company: "Soft Club",
    job: "mentor",
    status: true,
  },
  {
    id: 2,
    image: "./image.png",
    name: "Matin",
    company: "Soft Club",
    job: "Senior",
    status: false,
  },
  {
    id: 3,
    image: "./image.png",
    name: "Mumin",
    company: "Soft Club",
    job: "meneger",
    status: true,
  },
];

let box = document.querySelector(".box");
let AddForm = document.querySelector(".AddForm");

function checkUser(id) {
    users = users.map((user) => {
        if (user.id == id) {
            user.status = !user.status;
        }
        console.log(id);
    return user;
  });
  ShowUser();
}

function deleteUser(id) {
  users = users.filter((e) => e.id != id);
  ShowUser();
}

function ShowUser() {
  box.innerHTML = "";
  users.forEach((e) => {
    let div = document.createElement("div");
    let divB = document.createElement("div");
    let image = document.createElement("img");
    let h1 = document.createElement("h1");
    let pT = document.createElement("p");
    let pS = document.createElement("p");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = e.status;

    let pB = document.createElement("p");
    let btn = document.createElement("button");
    btn.innerHTML = "🗑️";
    pS.onclick = () => {
      checkUser(e.id);
    };
    checkbox.unchange = () => {
      checkUser(e.id);
    };
    image.src = e.image;
    h1.innerHTML = e.name;
    pT.innerHTML = e.company;
    pB.innerHTML = e.job;
    div.classList.add("div");

    divB.append(pT, h1, pB, btn);
    div.append(image, divB);

    box.append(div);
  });
}
ShowUser();