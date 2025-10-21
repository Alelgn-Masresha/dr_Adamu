const { Pool } = require('pg');
const config = require('./config');

// Create PostgreSQL connection pool
const pool = new Pool(config.database);

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
  process.exit(-1);
});

// Database query helper function
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Initialize database tables
const initDatabase = async () => {
  try {
    // Read and execute schema.sql
    const fs = require('fs');
    const path = require('path');
    const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await query(schema);
    console.log('Database tables initialized successfully');
    
    // Create initial admin user if none exists
    const { createInitialAdmin } = require('./scripts/createInitialAdmin');
    await createInitialAdmin(query);
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

module.exports = {
  query,
  pool,
  initDatabase
};
