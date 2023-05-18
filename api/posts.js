const express = require('express');
const postsRouter = express.Router();
const posts = reqiure("getAllPosts");
const getAllPosts = require("../db"); 

postsRouter.post((req, res, next) => {
  console.log("A request is being made to /posts");

  res.send({ message: 'hello from /posts!' });
});

module.exports = postsRouter;

// const express = require("express");
// const postsRouter = express.Router();
// //const { getAllPosts } = require("../db");

// // postsRouter.post((req, res, next) => {
// //   console.log("A request is being made to /users");

// //   next();
// // });

// postsRouter.get("/", async (req, res) => {
//   const users = await getAllPosts();
//   res.send({
//     users,
//   });
// });

// module.exports = usersRouter;
