const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

// IMPORT YOUR AUTH ROUTES (This is what I missed last time!)
const authRoutes = require('./routes/authRoutes');
const { getPool } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// 1. MIDDLEWARE
// ============================================
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true }));

// ============================================
// 2. EMAIL CONFIGURATION (Nodemailer)
// ============================================
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'allanbah73@gmail.com', // Your real email
        pass: 'utxg modp vetb diql' // ⚠ PASTE YOUR APP PASSWORD HERE
    }
});

// ============================================
// 3. ROUTES
// ============================================

// A. HEALTH CHECK
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Server is running!' });
});

// B. AUTHENTICATION ROUTES (Login/Signup)
// This connects to the authRoutes.js file you created earlier
app.use('/api/auth', authRoutes); 

// C. MEMBER APPLICATION ROUTE (The New Email System)
app.post('/api/members/apply', async (req, res) => {
    console.log("📩 Received Application:", req.body.fullName);

    const { fullName, email, phone, address, gender, skills, whyJoin } = req.body;

    // Email to YOU (Admin)
    const adminMailOptions = {
        from: '"Search For A Smile System" <allanbah73@gmail.com>',
        to: 'allanbah73@gmail.com',
        subject: `🚨 New Application: ${fullName}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-top: 5px solid #00f3ff;">
                <h2 style="color: #333;">New Family Member Request!</h2>
                <h3>👤 Personal Details</h3>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Gender:</strong> ${gender}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Address:</strong> ${address}</p>
                <h3>⚡ Superpowers (Skills)</h3>
                <p style="background: #f0f0f0; padding: 10px; border-radius: 5px;">${skills || "None listed"}</p>
                <h3>📝 Their Story</h3>
                <p><em>"${whyJoin}"</em></p>
            </div>
        `
    };

    // Email to the APPLICANT (Welcome)
    const userMailOptions = {
        from: '"Search For A Smile" <allanbah73@gmail.com>',
        to: email, 
        subject: 'We received your application! 💙',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #00f3ff;">Hi ${fullName},</h2>
                <p>Thank you for wanting to join <strong>Search For A Smile</strong>.</p>
                <p>We have received your details. Our team will review your application and contact you soon.</p>
                <br/>
                <p>Best regards,<br/>The Team</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);
        console.log(`✅ Application emails sent for ${fullName}`);
        res.status(200).json({ success: true, message: 'Application received' });
    } catch (error) {
        console.error('❌ Email error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

// ============================================
// 4. START SERVER
// ============================================
app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    
    // Test Database Connection
    try {
        await getPool();
        console.log('✅ Database connection established!');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
});