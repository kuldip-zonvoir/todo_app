const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],

  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));
const userRoutes = require("./routes/users");
const authorRoutes = require("./routes/author");
const bookRoutes = require("./routes/book");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));
// App routesn to handle requests

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/authors", authorRoutes);
__dirname = path.resolve();
console.log("current dir", __dirname);
if (process.env.NODE_ENV) {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    console.log(path.resolve(__dirname, "frontend", "build", "index.html"));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is Running! 🚀");
  });
}

// Unhandled Promise Rejection
// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message}`);
//   server.close(() => {
//     process.exit(1);
//   });
// });

module.exports = app;
