import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require'
});

// Optional: test connection
(async () => {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('Database connected:', result[0]);
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
})();

