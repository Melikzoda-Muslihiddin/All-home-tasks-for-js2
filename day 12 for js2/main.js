const products = "https://6991ca7c6279728b01555696.mockapi.io/products";

const box = document.querySelector(".box");

function showProducts(products) {
  box.innerHTML = "";
  products?.forEach((product) => {
    const container = document.createElement("div");
    container.className = "container";
    container.innerHTML = `
        <img class="imgSoft" src="${product.avatar}" alt="">
                <div class="texts">
                    <h1>${product.name}</h1>
                </div>
                <div class="actions">
                    <img class="icon delete" src="./icons/delete.svg" alt="">
                    <img class="icon edit" src="./icons/edit.svg" alt="">
                    <p><b style="font-size: 20px;">${product.price}</b></p>
                    <input class="check" type="checkbox">
                    <img class="icon info" src="./icons/info.svg" alt="">
                </div>
        `;
    const btnDel = container.querySelector(".delete");
    btnDel.onclick = () => {
      deleteUser(product.id);
      console.log(btnDel);
    };
    box.appendChild(container);
  });
}

showProducts(products);

function deleteUser(id) {
  box.innerHTML = "";
  products = products.filter((el) => el.id != id);
  showProducts(products);
}
