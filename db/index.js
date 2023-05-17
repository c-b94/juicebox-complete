// inside db/index.js
const { Client } = require("pg"); // imports the pg module

// supply the db name and location of the database
const client = new Client("postgres://localhost:5432/juicebox-dev");

async function createUser({ username, password, name, location }) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO users(username, password, name, location)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
      `,
      [username, password, name, location]
    );

    return rows[0];
  } catch (error) {
    throw error;
  }
}

// later

async function getAllUsers() {
  const { rows } = await client.query(
    `SELECT id, username, name, location, active 
    FROM users;
    `
  );

  return rows;
}

async function updateUser(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  console.log("setstrings",setString);

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }
  console.log(`UPDATE users
  SET ${setString}
  WHERE id=${id}
  RETURNING *;`)
  try {
    const {rows: [user]} = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    return user;
    // we can use advanced destructuring here

  } catch (error) {
    throw error;
  }
}

// and export them
module.exports = {
  client,
  getAllUsers,
  createUser,
  updateUser,
};
