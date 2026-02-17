let inputName = document.querySelector(".inputName");
let btnLogin = document.querySelector(".btnLogin");

btnLogin.onclick = () => {
  if (inputName.value) {
    localStorage.setItem("name", inputName);
    window.location.href = "./index2.html";
  }
};
