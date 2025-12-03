import dotenv from 'dotenv';
dotenv.config({path: '.env.production'});
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

// Supabase requires SSL, so add ssl: 'require'
const sql = postgres(connectionString, {
  ssl: 'require'
});
(async ()=> {
  try {
    const reult = await sql`SELECT NOW()`;
    console.log('Database connected:', reult[0]);
  } catch (error) {
    console.log('Database connection error', error.message);
  }
})();
export default sql;