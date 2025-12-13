const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql, getPool } = require('../config/database');

// ============================================
// SIGNUP - Register New User
// ============================================
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username, email, and password are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Password strength
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Get client info
        const ipAddress = req.ip || req.connection.remoteAddress;

        // Connect to database
        const pool = await getPool();

        // Check if username exists
        const userCheck = await pool.request()
            .input('Username', sql.NVarChar(50), username)
            .query('SELECT UserID FROM Users WHERE Username = @Username');

        if (userCheck.recordset.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Username already exists'
            });
        }

        // Check if email exists
        const emailCheck = await pool.request()
            .input('Email', sql.NVarChar(100), email)
            .query('SELECT UserID FROM Users WHERE Email = @Email');

        if (emailCheck.recordset.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Insert new user
        const result = await pool.request()
            .input('Username', sql.NVarChar(50), username)
            .input('Email', sql.NVarChar(100), email)
            .input('PasswordHash', sql.NVarChar(255), passwordHash)
            .query(`
                INSERT INTO Users (Username, Email, PasswordHash)
                OUTPUT INSERTED.UserID, INSERTED.Username, INSERTED.Email, INSERTED.CreatedAt
                VALUES (@Username, @Email, @PasswordHash)
            `);

        const newUser = result.recordset[0];

        // Log signup
        await pool.request()
            .input('UserID', sql.Int, newUser.UserID)
            .input('IPAddress', sql.NVarChar(50), ipAddress)
            .input('LoginSuccess', sql.Bit, 1)
            .query(`
                INSERT INTO LoginHistory (UserID, IPAddress, LoginSuccess, FailureReason)
                VALUES (@UserID, @IPAddress, @LoginSuccess, 'Account created')
            `);

        // Create JWT token (30 days)
        const token = jwt.sign(
            {
                userId: newUser.UserID,
                username: newUser.Username,
                email: newUser.Email
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY || '30d' }
        );

        // Store token in database
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        await pool.request()
            .input('UserID', sql.Int, newUser.UserID)
            .input('Token', sql.NVarChar(500), token)
            .input('ExpiresAt', sql.DateTime, expiresAt)
            .input('IPAddress', sql.NVarChar(50), ipAddress)
            .query(`
                INSERT INTO SessionTokens (UserID, Token, ExpiresAt, IPAddress)
                VALUES (@UserID, @Token, @ExpiresAt, @IPAddress)
            `);

        res.status(201).json({
            success: true,
            message: 'Account created successfully!',
            token: token,
            user: {
                userId: newUser.UserID,
                username: newUser.Username,
                email: newUser.Email,
                createdAt: newUser.CreatedAt
            }
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.',
            error: error.message
        });
    }
};

// ============================================
// LOGIN - Authenticate User
// ============================================
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }

        // Get client info
        const ipAddress = req.ip || req.connection.remoteAddress;

        // Connect to database
        const pool = await getPool();

        // Get user from database (allow login with username OR email)
        const result = await pool.request()
            .input('Username', sql.NVarChar(100), username)
            .query(`
                SELECT UserID, Username, Email, PasswordHash, IsActive, LastLogin
                FROM Users
                WHERE Username = @Username OR Email = @Username
            `);

        if (result.recordset.length === 0) {
            // Log failed attempt
            await pool.request()
                .input('IPAddress', sql.NVarChar(50), ipAddress)
                .input('LoginSuccess', sql.Bit, 0)
                .input('FailureReason', sql.NVarChar(255), 'User not found')
                .query(`
                    INSERT INTO LoginHistory (IPAddress, LoginSuccess, FailureReason)
                    VALUES (@IPAddress, @LoginSuccess, @FailureReason)
                `);

            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        const user = result.recordset[0];

        // Check if account is active
        if (!user.IsActive) {
            return res.status(403).json({
                success: false,
                message: 'Account is disabled. Please contact support.'
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.PasswordHash);

        if (!isValidPassword) {
            // Log failed attempt
            await pool.request()
                .input('UserID', sql.Int, user.UserID)
                .input('IPAddress', sql.NVarChar(50), ipAddress)
                .input('LoginSuccess', sql.Bit, 0)
                .input('FailureReason', sql.NVarChar(255), 'Invalid password')
                .query(`
                    INSERT INTO LoginHistory (UserID, IPAddress, LoginSuccess, FailureReason)
                    VALUES (@UserID, @IPAddress, @LoginSuccess, @FailureReason)
                `);

            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        // Log successful login
        await pool.request()
            .input('UserID', sql.Int, user.UserID)
            .input('IPAddress', sql.NVarChar(50), ipAddress)
            .input('LoginSuccess', sql.Bit, 1)
            .query(`
                INSERT INTO LoginHistory (UserID, IPAddress, LoginSuccess)
                VALUES (@UserID, @IPAddress, @LoginSuccess)
            `);

        // Update last login
        await pool.request()
            .input('UserID', sql.Int, user.UserID)
            .query('UPDATE Users SET LastLogin = GETDATE() WHERE UserID = @UserID');

        // Create JWT token (30 days)
        const token = jwt.sign(
            {
                userId: user.UserID,
                username: user.Username,
                email: user.Email
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY || '30d' }
        );

        // Store token in database
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        // Deactivate old tokens
        await pool.request()
            .input('UserID', sql.Int, user.UserID)
            .query('UPDATE SessionTokens SET IsActive = 0 WHERE UserID = @UserID AND IsActive = 1');

        // Insert new token
        await pool.request()
            .input('UserID', sql.Int, user.UserID)
            .input('Token', sql.NVarChar(500), token)
            .input('ExpiresAt', sql.DateTime, expiresAt)
            .input('IPAddress', sql.NVarChar(50), ipAddress)
            .query(`
                INSERT INTO SessionTokens (UserID, Token, ExpiresAt, IPAddress)
                VALUES (@UserID, @Token, @ExpiresAt, @IPAddress)
            `);

        res.json({
            success: true,
            message: 'Login successful!',
            token: token,
            user: {
                userId: user.UserID,
                username: user.Username,
                email: user.Email,
                lastLogin: user.LastLogin
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed. Please try again.',
            error: error.message
        });
    }
};

// ============================================
// VERIFY TOKEN - Check if user is logged in
// ============================================
const verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check token in database
        const pool = await getPool();
        const result = await pool.request()
            .input('Token', sql.NVarChar(500), token)
            .query(`
                SELECT st.SessionID, st.ExpiresAt, u.UserID, u.Username, u.Email, u.IsActive
                FROM SessionTokens st
                INNER JOIN Users u ON st.UserID = u.UserID
                WHERE st.Token = @Token AND st.IsActive = 1 AND st.ExpiresAt > GETDATE()
            `);

        if (result.recordset.length === 0) {
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

        const user = result.recordset[0];

        if (!user.IsActive) {
            return res.status(403).json({
                success: false,
                message: 'Account is disabled'
            });
        }

        res.json({
            success: true,
            user: {
                userId: user.UserID,
                username: user.Username,
                email: user.Email
            }
        });

    } catch (error) {
        console.error('Token verification error:', error);
        res.status(403).json({
            success: false,
            message: 'Invalid token',
            error: error.message
        });
    }
};

// ============================================
// LOGOUT - Invalidate token
// ============================================
const logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'No token provided'
            });
        }

        const pool = await getPool();
        await pool.request()
            .input('Token', sql.NVarChar(500), token)
            .query('UPDATE SessionTokens SET IsActive = 0 WHERE Token = @Token');

        res.json({
            success: true,
            message: 'Logged out successfully'
        });

    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Logout failed',
            error: error.message
        });
    }
};

module.exports = {
    signup,
    login,
    verifyToken,
    logout
};