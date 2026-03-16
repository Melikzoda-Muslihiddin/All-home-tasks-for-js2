"use strict";
// Fake in-memory user storage
const users = [];
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const newUser = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        };
        // Check if user already exists
        if (users.find(u => u.email === newUser.email)) {
            alert('User already exists!');
        }
        else {
            users.push(newUser);
            alert('Registration successful!');
            window.location.href = 'index.html';
        }
    });
}
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            alert(`Welcome back, ${user.name || 'User'}!`);
        }
        else {
            alert('Invalid email or password');
        }
    });
}
