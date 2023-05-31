// inside index.js
require('dotenv').config();
const PORT = 3000;
const express = require("express");
const jwt = require("jsonwebtoken");
const server = express();
const apiRouter = require("./api");
const morgan = require("morgan");
const { client } = require("./db");

server.use(morgan("dev"));

server.use(express.json());

server.use("/api", apiRouter);

client.connect

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
  
});
server.use('/api', (req, res, next) => {
  console.log("A request was made to /api");
  next();
});
server.get('/add/:first/to/:second', (req, res, next) => {
  res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
    Number(req.params.first) + Number(req.params.second)
   }</h1>`);
});

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});
