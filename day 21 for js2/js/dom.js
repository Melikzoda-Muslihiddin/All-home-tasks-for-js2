const box = document.querySelector(".box");

let toggleHandler = null;

export function setToggleHandler(fn) {
  toggleHandler = fn;
}

export function showData(arr) {
  box.innerHTML = "";

  arr.forEach((el, i) => {
    box.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${el.name}</td>
        <td>${el.email}</td>
        <td>
          <input class="statusCheck" type="checkbox" value="${el.id}" ${el.status ? "checked" : ""} />
          <span>${el.status ? "online" : "offline"}</span>
        </td>
      </tr>
    `;
  });
}

box.onchange = (e) => {
  if (!e.target.classList.contains("statusCheck")) return;
  if (!toggleHandler) return;

  toggleHandler(e.target.value, e.target.checked);
};
