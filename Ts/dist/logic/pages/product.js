"use strict";
const laptopData = localStorage.getItem('selectedLaptop');
const detailsContainer = document.getElementById('laptopDetails');
if (laptopData && detailsContainer) {
    const laptop = JSON.parse(laptopData);
    detailsContainer.classList.add('details-container'); // добавляем класс для стилизации
    detailsContainer.innerHTML = `
       <img src="${laptop.avatar}" alt="${laptop.name}" style="width: 900px; height: 700px; border-radius: 15px;" />
        <div>
       
          <h1 style="font-size: 50px; margin-top: 20px;">${laptop.name}</h1>
        <p><strong>Brand:</strong> ${laptop.categoryText}</p>
        <h1 style="font-size: 40px;">${laptop.price}</h1>
        <p><strong>Description:</strong> ${laptop.about}</p>
        
        <button class="add-to-cart">Add to Cart</button> <br> <br>
        <button class="buy-now">Buy Now</button>
        </div>
      `;
}


