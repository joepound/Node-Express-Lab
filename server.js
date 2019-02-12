const express = require("express");
const cors = require("cors");

const postsRoutes = require("./routes/postsRoutes");

const server = express();
server.use(express.json());
server.use(cors());
server.use("/api/posts", postsRoutes);

module.exports = server;
