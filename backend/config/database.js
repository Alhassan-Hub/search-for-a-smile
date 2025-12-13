const sql = require('mssql');
require('dotenv').config();

// SQL Server Configuration
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    },
    connectionTimeout: 30000,
    requestTimeout: 30000,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// Create connection pool
let poolPromise;

const getPool = async () => {
    if (!poolPromise) {
        try {
            console.log('🔄 Connecting to:', config.server);
            console.log('   Database:', config.database);
            console.log('   User:', config.user);
            
            poolPromise = await sql.connect(config);
            console.log('✅ Connected to SQL Server successfully!');
            return poolPromise;
        } catch (error) {
            console.error('❌ Database connection error:', error.message);
            poolPromise = null;
            throw error;
        }
    }
    return poolPromise;
};

module.exports = {
    sql,
    getPool
};