"use strict";
const regBtn = document.getElementById('#regBtn');
const nameInput = document.getElementById('#regName');
const emailInput = document.getElementById('#regEmail');
const passInput = document.getElementById('#regPassword');
const errorText = document.getElementById('#regError');
regBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passInput.value.trim();
    if (!name || !email || !password) {
        errorText.textContent = "All fields are required!";
        return;
    }
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
        errorText.textContent = "Email already registered!";
        return;
    }
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    window.location.href = "index.html"; 
});
