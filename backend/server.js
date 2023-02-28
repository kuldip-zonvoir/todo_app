// const express = require("express");
// // const bodyParser = require("body-parser");
// const app = express();
const app = require("./app");
const { default: mongoose } = require("mongoose");

// const handlebars = require("express-handlebars");

const setupDB = require("./config/db");

// const userRoutes = require("./routes/users");
// const authorRoutes = require("./routes/author");
// const bookRoutes = require("./routes/book");

// //instead of app.set('view engine', 'handlebars');
// app.set("view engine", "hbs");
// //instead of app.engine('handlebars', handlebars({
// app.engine(
//   "hbs",
//   hbs({
//     layoutsDir: __dirname + "/views/layouts",
//     //new configuration parameter
//     extname: "hbs",
//   })
// );

setupDB();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// // App routesn to handle requests

// app.use("/api/books", bookRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/authors", authorRoutes);

const port = process.env.PORT || 3000;

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log("server is running on port " + port);
  });
});
module.exports = app;
