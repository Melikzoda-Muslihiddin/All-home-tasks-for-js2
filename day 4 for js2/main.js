let users = [
  {
    id: 1,
    image: "./image.png",
    name: "Stive Jobs",
    company: "Soft Club",
    job: "Mentor",
  },
  {
    id: 2,
    image: "./image.png",
    name: "Maykl Jobs",
    company: "Soft Club",
    job: "Mentor",
  },
  {
    id: 3,
    image: "./image.png",
    name: "Stive Body",
    company: "Soft Club",
    job: "Mentor",
  },
];

let box = document.querySelector(".box");

function deleteUser(id) {
  users = users.filter((el) => el.id != id);
  showUser();
}
function showUser() {
  box.innerHTML = "";
  users.forEach((el) => {
    let div = document.createElement("div");
    let divB = document.createElement("div");
    let image = document.createElement("img");
    let h1 = document.createElement("h1");
    let pT = document.createElement("p");
    let pB = document.createElement("p");
    let btn = document.createElement("button");
    btn.innerHTML = "🛒";
    btn.onclick = () => {
      deleteUser(el.id);
    };

    image.src = el.image;
    h1.innerHTML = el.name;
    pT.innerHTML = el.company;
    pB.innerHTML = el.job;
    div.classList.add("div");
    divB.classList.add("idris");

    divB.append(pT, h1, pB, btn);
    div.append(image, divB);

    box.append(div);
  });
}
showUser();