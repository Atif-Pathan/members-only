const pool = require('../config/pool');

const messageQueries = {
  // List messages with author full name
  async findAllWithAuthor() {
    const sql = `
      SELECT
        m.id,
        m.title,
        m.content,
        m.created_at,
        CONCAT(u.first_name, ' ', u.last_name) AS author_name
      FROM messages m
      JOIN users u ON m.author_id = u.id
      ORDER BY m.created_at DESC
    `;
    const { rows } = await pool.query(sql);
    return rows;
  },

  // Create a message
  async create({ title, content, author_id }) {
    const sql = `
      INSERT INTO messages (title, content, author_id)
      VALUES ($1, $2, $3)
      RETURNING id, title, content, author_id, created_at
    `;
    const { rows } = await pool.query(sql, [title, content, author_id]);
    return rows[0];
  },

  // Delete a message by id
  async deleteById(id) {
    await pool.query('DELETE FROM messages WHERE id = $1', [id]);
  },
};

module.exports = messageQueries;
