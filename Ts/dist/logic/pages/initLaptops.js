const laptopBox = document.querySelector('.PremiumLaptops');
const paginationBox = document.querySelector('.pagination');
const searchInput = document.querySelector('.search');
let allData = [];
let filteredData = [];
let currentPage = 1;
const limit = 6;
async function fetchProducts() {
    const res = await fetch('db.json');
    const data = await res.json();
    return data.products;
}
function renderPage() {
    laptopBox.innerHTML = '';
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    const paginatedData = filteredData.slice(start, end);
    paginatedData.forEach((el) => {
        const card = document.createElement('div');
        card.className = 'laptop-card';
        card.innerHTML = `
            <img src="${el.avatar}" alt="${el.name}" style="width:200px; border-radius:10px;">
            <h3>${el.name}</h3>
            <p>${el.price || ''}</p>
        `;
        // --- КЛИК НА КАРТОЧКУ ---
        card.addEventListener('click', () => {
            // сохраняем объект в localStorage
            localStorage.setItem('selectedLaptop', JSON.stringify(el));
            // переходим на страницу продукта
            window.location.href = 'product.html';
        });
        laptopBox.appendChild(card);
    });
    renderPagination();
}
function renderPagination() {
    paginationBox.innerHTML = '';
    const pageCount = Math.ceil(filteredData.length / limit);
    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement('button');
        btn.textContent = i.toString();
        btn.className = i === currentPage ? 'active' : '';
        btn.addEventListener('click', () => {
            currentPage = i;
            renderPage();
        });
        paginationBox.appendChild(btn);
    }
}
function applySearch() {
    const val = searchInput?.value.toLowerCase() || '';
    filteredData = allData.filter(p => p.name.toLowerCase().includes(val));
    currentPage = 1;
    renderPage();
}
// --- ИНИЦИАЛИЗАЦИЯ ---
(async function init() {
    allData = await fetchProducts();
    filteredData = [...allData];
    renderPage();
    searchInput?.addEventListener('input', applySearch);
})();
export {};
