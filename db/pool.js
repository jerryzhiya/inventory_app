// pool.js
require('dotenv').config({ path: '.env.production' });

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false   // accept Supabase's self-signed cert
  }
});

// Optional: test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Database connected:', res.rows[0]);
  }
});

module.exports = pool;