const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Import Auth Routes
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. EMAIL CONFIG
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // Change this to look for variables
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
    }
});

// 3. ROUTES
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Server is running!' });
});

app.use('/api/auth', authRoutes);

app.post('/api/members/apply', async (req, res) => {
    console.log("📩 Received Application:", req.body.fullName);

    // Destructure fields from req.body (avoid redeclaration if variables exist outside)
    const { fullName, email, phone, address, gender, skills, whyJoin } = req.body;

    // Email to YOU (Admin)
    const adminMailOptions = {
        from: '"Search For A Smile" <allanbah73@gmail.com>',
        to: 'allanbah73@gmail.com',
        subject: `🚨 New Application: ${fullName}`,
        html: `
            <h3>New Member Request!</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Skills:</strong> ${skills}</p>
            <p><strong>Story:</strong> ${whyJoin}</p>
        `
    };

    // Email to the APPLICANT
    const userMailOptions = {
        from: '"Search For A Smile" <allanbah73@gmail.com>',
        to: email, 
        subject: 'We received your application! 💙',
        html: `<h3>Hi ${fullName},</h3><p>We received your details. Welcome to the family!</p>`
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

// 4. START SERVER
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});