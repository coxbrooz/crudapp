// create_user.js
// Usage: node create_user.js
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function createUser({ name, email, password }) {
  const hash = await bcrypt.hash(password, 10); // 10 rounds
  const db = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'crud-db' });

  const [result] = await db.execute(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, hash]
  );

  await db.end();
  return result.insertId;
}

// Example usage:
(async () => {
  try {
    const id = await createUser({ name: 'Admin', email: 'admin@example.com', password: 'password123' });
    console.log('Created user id', id);
  } catch (err) {
    console.error('Error creating user:', err);
  }
})();
