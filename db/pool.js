const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:SUPERlove1$@localhost:5432/shoe_inventory',
});

module.exports = pool;