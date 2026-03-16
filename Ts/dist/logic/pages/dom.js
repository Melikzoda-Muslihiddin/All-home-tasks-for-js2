const box = document.querySelector('.cardsCategoys');
const popularBox = document.querySelector('.PopularLaptops');
const laptopBox = document.querySelector('.PremiumLaptops');
const paginationBox = document.querySelector('.pagination');
const searchInput = document.querySelector('input[type="text"]');
let allData = [];
let filteredData = [];
let currentPage = 1;
const limit = 6;
let categories = [];
export function ShowCategory(data) {
    box.innerHTML = '';
    data.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
      <img src="${item.icon}" alt="" style="width: 70px; height: 70px;">
      <h3>${item.name}</h3>
      <p>${item.about}</p>
      <img class="cardCategory" src="${item.avatar}" alt="${item.name}" style="width:100%; border-radius: 10px;">
    `;
        box.appendChild(card);
    });
}
export function PopularLaptop(data) {
    popularBox.innerHTML = '';
    data.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'popular-card';
        card.innerHTML = `
      <img src="${item.avatar}" alt="${item.name}" style="width:100%; border-radius: 10px;">
      <div style="display: flex; gap: 70px; justify-content: center; align-items: center; height:80px;">
        <h3>${item.name}</h3>
        <p>${item.cost}</p>
      </div>
      <h4>${item.about}</h4>
      <button style="background-color: #0F172A; color: white; border: none; border-radius: 5px; cursor: pointer; width: 300px; height: 40px;">Add to Cart</button>
    `;
        popularBox.appendChild(card);
    });
}
export function initLaptops(data) {
    allData = data.map(p => {
        const cat = categories.find(c => c.id === p.categoryId);
        return {
            ...p,
            categoryText: cat ? cat.name : '',
            categoryNormalized: cat ? cat.name.toLowerCase().replace(/\s+/g, '') : '',
            priceNumber: Number(p.price.replace('$', ''))
        };
    });
    filteredData = [...allData];
    currentPage = 1;
    renderPage();
}
function applyFilters() {
    const priceCheckboxes = document.querySelectorAll('.filter-price:checked');
    const brandCheckboxes = document.querySelectorAll('.filter-brand:checked');
    const searchValue = searchInput?.value.toLowerCase().trim() || '';
    const selectedPrices = Array.from(priceCheckboxes).map(cb => cb.value);
    const selectedBrands = Array.from(brandCheckboxes).map(cb => cb.value.toLowerCase().replace(/\s+/g, ''));
    filteredData = allData.filter(item => {
        let priceMatch = true;
        if (selectedPrices.length > 0) {
            priceMatch = selectedPrices.some(range => {
                if (range === "2500+")
                    return item.priceNumber >= 2500;
                const [min, max] = range.split('-').map(Number);
                return item.priceNumber >= min && item.priceNumber <= max;
            });
        }
        let brandMatch = true;
        if (selectedBrands.length > 0) {
            brandMatch = selectedBrands.includes(item.categoryNormalized);
        }
        let searchMatch = true;
        if (searchValue)
            searchMatch = item.name.toLowerCase().includes(searchValue);
        return priceMatch && brandMatch && searchMatch;
    });
    currentPage = 1;
    renderPage();
}
function applySort(order) {
    filteredData.sort((a, b) => order === 'high' ? b.priceNumber - a.priceNumber : a.priceNumber - b.priceNumber);
    currentPage = 1;
    renderPage();
}
function renderPage() {
    laptopBox.innerHTML = '';
    if (filteredData.length === 0) {
        laptopBox.innerHTML = '<h2 style="color:red; text-align:center; margin-top:50px;">Not Found</h2>';
        paginationBox.innerHTML = '';
        return;
    }
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    const paginatedData = filteredData.slice(start, end);
    paginatedData.forEach(el => {
        const card = document.createElement('div');
        card.className = 'laptop-card';
        card.innerHTML = `
    <img src="${el.avatar}" alt="${el.name}" style="width:100%; border-radius: 10px;">
    <div>
      <h3>${el.name}</h3>
      <p>${el.about}</p>
    </div>
    <h4>${el.price}</h4>
  `;
        card.addEventListener('click', () => {
            localStorage.setItem('selectedLaptop', JSON.stringify(el));
            window.location.href = 'product.html';
        });
        laptopBox.appendChild(card);
    });
    renderPagination();
}
function renderPagination() {
    if (!paginationBox)
        return;
    paginationBox.innerHTML = '';
    const pageCount = Math.ceil(filteredData.length / limit);
    for (let i = 1; i <= pageCount; i++) {
        const btnPag = document.createElement('button');
        btnPag.textContent = i.toString();
        btnPag.className = i === currentPage ? 'btnPag active' : 'btnPag';
        btnPag.addEventListener('click', () => {
            currentPage = i;
            renderPage();
        });
        paginationBox.appendChild(btnPag);
    }
}
const filterBtn = document.querySelector('.filterbtn');
filterBtn?.addEventListener('click', applyFilters);
searchInput?.addEventListener('input', applyFilters);
document.querySelector('.sort-high')?.addEventListener('click', () => applySort('high'));
document.querySelector('.sort-low')?.addEventListener('click', () => applySort('low'));
const sortBtns = document.querySelectorAll('.title, .sort-low, .sort-high');
sortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sortBtns.forEach(b => b.classList.remove('active-sort'));
        btn.classList.add('active-sort');
        if (btn.classList.contains('sort-low')) {
            applySort('low');
        }
        if (btn.classList.contains('sort-high')) {
            applySort('high');
        }
        if (btn.classList.contains('title')) {
            filteredData = [...allData];
            currentPage = 1;
            renderPage();
        }
    });
});
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
const LaptopData = localStorage.getItem('selectedLaptop');
const DetailsContainer = document.getElementById('laptopDetails');
if (LaptopData && DetailsContainer) {
    const laptop = JSON.parse(LaptopData);
    DetailsContainer.classList.add('details-container');
    DetailsContainer.innerHTML = `
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
