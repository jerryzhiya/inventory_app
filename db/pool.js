// import postgres from 'postgres';

// const sql = postgres(process.env.DATABASE_URL, {
//   ssl: 'require'
// });

// // Optional: test connection
// (async () => {
//   try {
//     const result = await sql`SELECT NOW()`;
//     console.log('Database connected:', result[0]);
//   } catch (err) {
//     console.error('Database connection error:', err.message);
//   }
// })();

require('dotenv').config({ path: '.env.production' });

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    ssl: 'require'
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
