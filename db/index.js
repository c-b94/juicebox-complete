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
  // console.log("setstrings",setString);

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }
  // console.log(`UPDATE users
  // SET ${setString}
  // WHERE id=${id}
  // RETURNING *;`)
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

async function createPost({
  authorId,
  title,
  content
}) {
  try {
    const { rows } = await client.query(
      `
      INSERT INTO posts(authorId,title,content)
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
      `,
      [authorId,title,content]
    );

    return rows[0];
  } catch (error) {
    throw error;
  }
}

async function updatePost(id, fields = {}) {
   // build the set string
   const setString = Object.keys(fields)
   .map((key, index) => `"${key}"=$${index + 1}`)
   .join(", ");
 // console.log("setstrings",setString);

 // return early if this is called without fields
 if (setString.length === 0) {
   return;
 }
 
  try {
    const {rows: [post]} = await client.query(
      `
      UPDATE posts
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    return post;
    // we can use advanced destructuring here
  } catch (error) {
    throw error;
  }
}

async function getAllPosts() {
  try {
    const { rows } = await client.query(
      `SELECT authorId, title, content 
      FROM users;
      `
    );
  
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPostsByUser(userId) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM posts
      WHERE "authorId"=$1;
    `, [userId]);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPostsByUser(userId) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM posts
      WHERE "authorId"=$1;
    `, [userId]);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM users
      WHERE "id"=$1;
    `, [userId]);
    const userPosts = await getPostsByUser(userId);
    console.log('userPosts',userPosts);
    rows[0].posts = userPosts;
    console.log("get user by id ",rows);
      return rows[0];
  } catch (error) {
    throw error;
  }
  // first get the user (NOTE: Remember the query returns 
    // (1) an object that contains 
    // (2) a `rows` array that (in this case) will contain 
    // (3) one object, which is our user.
  // if it doesn't exist (if there are no `rows` or `rows.length`), return null

  // if it does:
  // delete the 'password' key from the returned object
  // get their posts (use getPostsByUser)
  // then add the posts to the user object with key 'posts'
  // return the user object
}

// and export them
module.exports = {
  client,
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
  getPostsByUser,
  createPost,
  getAllPosts,
  updatePost,
};
