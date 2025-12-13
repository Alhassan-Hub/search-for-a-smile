// API Configuration
const API_URL = 'http://localhost:5000/api';

// ============================================
// CHECK IF USER IS ALREADY LOGGED IN
// ============================================
window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
        try {
            const response = await fetch(`${API_URL}/auth/verify`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                // User is logged in! Redirect to dashboard
                console.log('User already logged in:', data.user);
                showNotification(`Welcome back, ${data.user.username}!`, 'success');
                
                // TODO: Redirect to dashboard
                // window.location.href = 'dashboard.html';
            } else {
                // Token invalid, remove it
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
            }
        } catch (error) {
            console.error('Token verification error:', error);
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
        }
    }
});

// ============================================
// SLIDING PANEL TOGGLE
// ============================================
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('mainContainer');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// ============================================
// PASSWORD TOGGLE (Show/Hide)
// ============================================
const passwordToggles = document.querySelectorAll('.password-toggle');

passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const eyeIcon = this.querySelector('.eye-icon');
        
        if (input.type === 'password') {
            input.type = 'text';
            eyeIcon.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            `;
            this.classList.add('active');
        } else {
            input.type = 'password';
            eyeIcon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
            this.classList.remove('active');
        }
    });
});

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
        max-width: 400px;
    }
    
    .notification.success {
        background: linear-gradient(135deg, #00E5FF, #00B8D4);
    }
    
    .notification.error {
        background: linear-gradient(135deg, #ff4444, #cc0000);
    }
    
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyle);

// ============================================
// LOGIN FORM HANDLER
// ============================================
const loginForm = document.querySelector('.sign-in-container form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = loginForm.querySelector('input[type="text"]').value.trim();
    const password = loginForm.querySelector('#loginPassword').value;
    const submitBtn = loginForm.querySelector('.btn-primary');
    
    // Validation
    if (!username || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
       if (data.success) {
    // Save token and user data
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userData', JSON.stringify(data.user));
    
    showNotification('Welcome back, ${data.user.username}!', 'success');
    
    // Clear form
    loginForm.reset();
    
    // Redirect after 1.5 seconds
    setTimeout(() => {
        // Redirect to React app (usually on port 5173 for Vite)
        window.location.href = 'http://localhost:5173';
    }, 1500);

            
        } else {
            showNotification(data.message || 'Login failed', 'error');
        }
        
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Connection error. Is the server running?', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
    }
});

// ============================================
// SIGNUP FORM HANDLER
// ============================================
const signupForm = document.querySelector('.sign-up-container form');
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = signupForm.querySelector('input[type="text"]').value.trim();
    const email = signupForm.querySelector('input[type="email"]').value.trim();
    const password = signupForm.querySelector('#signupPassword').value;
    const confirmPassword = signupForm.querySelector('#confirmPassword').value;
    const agreeTerms = signupForm.querySelector('input[type="checkbox"]').checked;
    const submitBtn = signupForm.querySelector('.btn-primary');
    
    // Validation
    if (!username || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showNotification('Please agree to Terms & Conditions', 'error');
        return;
    }
    
    // Show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account...';
    
    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
       if (data.success) {
    // Save token and user data
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userData', JSON.stringify(data.user));
    
    showNotification('Welcome to Search for a Smile, ${data.user.username}!', 'success');
    
    // Clear form
    signupForm.reset();
    
    // Switch to login view and show success
    setTimeout(() => {
        container.classList.remove('right-panel-active');
        showNotification('Account created! You are now logged in!', 'success');
        
        // Redirect to React app (usually on port 5173 for Vite)
        setTimeout(() => {
            window.location.href = 'http://localhost:5173';
        }, 500);
    }, 1500);

            
        } else {
            showNotification(data.message || 'Signup failed', 'error');
        }
        
    } catch (error) {
        console.error('Signup error:', error);
        showNotification('Connection error. Is the server running?', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign Up';
    }
});

// ============================================
// INPUT ANIMATIONS
// ============================================
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================
console.log('%c🎨 Search for a Smile - Authentication System', 'color: #00E5FF; font-size: 20px; font-weight: bold;');
console.log('%c✨ Connected to Backend API!', 'color: #00E5FF; font-size: 14px;');
console.log('%c🔗 API: ' + API_URL, 'color: #ffffff; font-size: 12px;');