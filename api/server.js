const express = require("express");

const StudentsRouter = require("./students/students-router");

const server = express();

server.use(express.json());

server.use("/api/students", StudentsRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
