const express = require('express');
const router = express.Router();
const { signup, login, verifyToken, logout } = require('../controllers/authcontroller');

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// ============================================
// PROTECTED ROUTES (Authentication required)
// ============================================

// Verify token route
router.get('/verify', verifyToken);

// Logout route
router.post('/logout', logout);

module.exports = router;