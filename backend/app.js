const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const sessions = require('express-session')

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://priyanshugupta2193:12341234@cluster0.hboohgw.mongodb.net/Crotispa"
  )
  .then((res) => console.log("Db Connected"))
  .catch((err) => console.log(err));

// Create a user schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "CrotispaCollection" }
);

// Create a user model
const User = mongoose.model("User", userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(sessions({
  secret: 'hello',
  resave: false,
  saveUninitialized:false
}))
// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.find({
      username: req.body.username,
      password: req.body.password,
    });
    if (user) {
      req.session.username = req.body.username
      res.redirect('/home');
    } else {
      res.send("invalid");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

app.get('/home', (req, res) => {
  res.render('home.ejs', req.session)
})

// Signup route
app.post("/signup", async (req, res) => {
  try {
    await User.create(req.body);
    res.render("home.ejs", req.body);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});
