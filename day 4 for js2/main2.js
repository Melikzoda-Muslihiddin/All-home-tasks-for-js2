let users = [
  {
    id: 1,
    image: "./cr7.png",
    name: "Cristiano Ronaldo",
    company: "Al-Nassr",
    job: "Ataka",
  },
  {
    id: 2,
    image: "./ser4.png",
    name: "Sergio Ramos",
    company: "Real Madrid",
    job: "Deferent",
  },
  {
    id: 3,
    image: "./kb9.png",
    name: "Karim Benzema",
    company: "Real Madrid",
    job: "Ataka",
  },
];

let box = document.querySelector(".box");
let nom = document.querySelector(".nom");
let company = document.querySelector(".com");
let job = document.querySelector(".job");
let image = document.querySelector(".img");
let btnreg = document.querySelector(".reg");
let divr = document.querySelector(".divr");

function deleteUser(id) {
  users = users.filter((el) => el.id !== id);
  showUser();
}

btnreg.onclick = () => {
  if (nom.value == "" || job.value == "" || company.value == "") {
    alert("Zapolni vse");
    return;
  }
  let obj = {};
  obj.id = users.length + 1;
  obj.name = nom.value;
  obj.company = company.value;
  obj.job = job.value;
  console.log(obj);

  if (image.files.length > 0) {
    obj.image = URL.createObjectURL(image.files[0]);
  } else {
    obj.image = "./default.png";
  }

  users.push(obj);

  nom.value = "";
  company.value = "";
  job.value = "";
  image.value = "";

  showUser();
};

function showUser() {


    box.innerHTML = "";
    users.forEach((el) => {
        box.innerHTML += `
        <div class="div">
        <img src="${el.image}" class="imgall" alt="">
        <div class="div1">
        <p>${el.company}</p>
        <h1>${el.name}</h1>
        <p>${el.job}</p>
        <button class="del-btn" onclick="deleteUser(${el.id})">🗑️</button>
        </div>
        </div>
        `;
    let div = document.createElement("div");
    let divB = document.createElement("div");
    let image = document.createElement("img");
    let h1 = document.createElement("h1");
    let pT = document.createElement("p");
    let pB = document.createElement("p");
    let btn = document.createElement("button");

    btn.innerHTML = "🗑️";
    btn.onclick = () => {
      deleteUser(el.id);
    };

    image.src = el.image;
    h1.innerHTML = el.name;
    pT.innerHTML = el.company;
    pB.innerHTML = el.job;

    div.classList.add("div");
    divB.classList.add("div1");
    image.classList.add("imgall");

    divB.append(pT, h1, pB, btn);
    div.append(image, divB);

    box.append(div);
  });
}
showUser();