"use strict";
const loginBtn = document.getElementById('loginBtn');
const emailInput = document.getElementById('loginEmail');
const passInput = document.getElementById('loginPassword');
const errorText = document.getElementById('loginError');
loginBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = passInput.value.trim();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
        localStorage.setItem('currentUser', JSON.stringify(found));
        window.location.href = "index.html"; 
    }
    else {
        errorText.textContent = "Invalid email or password!";
    }
});
