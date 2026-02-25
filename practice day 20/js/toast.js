const toastRoot = document.querySelector("#toastRoot");

export function toast(message, type = "success", ms = 2200) {
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = message;
  toastRoot.appendChild(el);

  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transition = "opacity .2s";
    setTimeout(() => el.remove(), 220);
  }, ms);
}
