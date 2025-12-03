
// models/item.js
import sql from '../db/pool.js';

class Item {
  static async findAllByCategory(categoryID) {
    return await sql`
      SELECT * FROM items WHERE category_id = ${categoryID} ORDER BY id
    `;
  }

  static async findById(id) {
    const result = await sql`
      SELECT * FROM items WHERE id = ${id}
    `;
    return result[0];
  }

  static async create(categoryID, name, brand, size, color, price, stock_quantity, description) {
    const result = await sql`
      INSERT INTO items (category_id, name, brand, size, color, price, stock_quantity, description)
      VALUES (${categoryID}, ${name}, ${brand}, ${size}, ${color}, ${price}, ${stock_quantity}, ${description})
      RETURNING *
    `;
    return result[0];
  }

  static async update(id, name, brand, price, size, color, stock_quantity, description) {
    const result = await sql`
      UPDATE items
      SET name=${name}, brand=${brand}, price=${price}, size=${size}, color=${color},
          stock_quantity=${stock_quantity}, description=${description}, updated_at=NOW()
      WHERE id=${id}
      RETURNING *
    `;
    return result[0];
  }

  static async delete(id) {
    await sql`
      DELETE FROM items WHERE id = ${id}
    `;
  }
}

export default Item;