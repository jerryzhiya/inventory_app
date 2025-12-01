const pool = require('../db/pool');

class Item {
    static async findAllByCategory(categoryID) {
        const result = await pool.query(
            'SELECT * FROM items WHERE category_id = $1 ORDER BY id',
            [categoryID]
        );
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query(
            'SELECT * FROM items WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    static async create(categoryID, name, brand, size, color, price, stock_quantity, description) {
        const result = await pool.query(
            `INSERT INTO items (category_id, name, brand, size, color, price, stock_quantity, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
            [categoryID, name, brand, size, color, price, stock_quantity, description]
        );
        return result.rows[0];
    }

    static async update(id, name, brand, price, size, color, stock_quantity, description) {
        const result = await pool.query(
            `UPDATE items
       SET name=$1, brand=$2, price=$3, size=$4, color=$5, stock_quantity=$6, description=$7, updated_at=NOW()
       WHERE id=$8
       RETURNING *`,
            [name, brand, price, size, color, stock_quantity, description, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        await pool.query(
            'DELETE FROM items WHERE id = $1',
            [id]
        );
    }
}

module.exports = Item;