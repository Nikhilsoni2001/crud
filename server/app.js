const dotenv = require('dotenv');
const express = require("express");
const app = express();

dotenv.config({path: './config.env'});

const PORT = process.env.PORT;

require('./db/conn')
const User = require('./model/userSchema');


app.use(express.json());
app.use(require('./router/auth'));

// Middleware
const middleware = (req, res, next) => {
  console.log("Middleware is running");
  next();
};

app.get("/aboutme", middleware, (req, res) => {
  res.send("Hello about me");
});

app.get("/contact", (req, res) => {
  res.send("Hello Contact");
});

app.get("/signin", (req, res) => {
  res.send("Hello SI");
});

app.get("/signup", (req, res) => {
  res.send("Hello SU");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
