
import sql from '../db/pool.js';

class Category {
  static async findAll() {
    return await sql`SELECT * FROM categories ORDER BY id`;
  }

  static async findById(id) {
    const result = await sql`SELECT * FROM categories WHERE id = ${id}`;
    return result[0];
  }

  static async create(name, description) {
    const result = await sql`
      INSERT INTO categories (name, description)
      VALUES (${name}, ${description})
      RETURNING *
    `;
    return result[0];
  }

  static async update(id, name, description) {
    const result = await sql`
      UPDATE categories
      SET name=${name}, description=${description}, updated_at=NOW()
      WHERE id=${id}
      RETURNING *
    `;
    return result[0];
  }

  static async delete(id) {
    await sql`DELETE FROM categories WHERE id = ${id}`;
  }
}

export default Category;