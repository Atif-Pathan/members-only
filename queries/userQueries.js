const pool = require('../config/pool');

const userQueries = {
  // Find user by email
  async findByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
  },

  // Find user by ID
  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
  },

  // Create new user
  async create(userData) {
    const { first_name, last_name, email, password } = userData;
    const { rows } = await pool.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [
      first_name,
      last_name,
      email,
      password,
    ]);
    return rows[0];
  },

  // Update membership status
  async updateMembershipStatus(id, isMember) {
    const { rows } = await pool.query('UPDATE users SET is_member = $1 WHERE id = $2 RETURNING *', [isMember, id]);
    return rows[0];
  },

  // Update admin status
  async updateAdminStatus(id, isAdmin) {
    const { rows } = await pool.query('UPDATE users SET is_admin = $1 WHERE id = $2 RETURNING *', [isAdmin, id]);
    return rows[0];
  },
};

module.exports = userQueries;
