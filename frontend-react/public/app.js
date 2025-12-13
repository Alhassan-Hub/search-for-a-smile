// UI ELEMENTS
const formsWrapper = document.getElementById('formsWrapper');
const toSignupBtn = document.getElementById('toSignup');
const toLoginBtn = document.getElementById('toLogin');

// 1. SLIDE TRANSITION
toSignupBtn.addEventListener('click', () => {
    formsWrapper.classList.add('switch');
});

toLoginBtn.addEventListener('click', () => {
    formsWrapper.classList.remove('switch');
});

// API URL
const API_URL = 'https://search-for-a-smile.onrender.com//api/auth';

// 2. SIGNUP LOGIC
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('signupBtn');
    const originalText = btn.innerHTML;
    
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("❌ Passwords do not match!");
        return;
    }

    btn.innerHTML = 'CREATING...';
    btn.disabled = true;

    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();

        if (data.success) {
            alert("🎉 Account created! Please log in.");
            formsWrapper.classList.remove('switch');
            signupForm.reset();
        } else {
            alert("❌ " + data.message);
        }
    } catch (error) {
        alert("Server Error.");
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});

// 3. LOGIN LOGIC
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('loginBtn');
    const originalText = btn.innerHTML;

    const username = document.getElementById('loginIdentifier').value;
    const password = document.getElementById('loginPassword').value;

    btn.innerHTML = 'VERIFYING...';
    btn.disabled = true;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();

        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = "/";
        } else {
            alert("❌ " + data.message);
        }
    } catch (error) {
        alert("Server Error.");
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});