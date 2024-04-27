const mongoose = require("mongoose");
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const Card = require("./model/Card");
require("dotenv").config();
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
//
//
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  let error = "";
  res.render("home", { error }); // відкриває html файл
});

app.get("/base", function (req, res) {
  res.render("otherFile");
});

app.post("/add", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const newCard = new Card({ name, email });
  await newCard.save();
  res.render("result", { name, email });
});
app.post("/aa", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === process.env.USERNAME1 && password === process.env.PASSWORD) {
    console.log("hello");
    res.redirect("/");
  } else {
    console.log("error");
    let error = "геть не той пароль123";
    res.render("home", { error });
  }
});
const port = process.env.PORT || 3000;
console.log("server started");

const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    app.listen(port); //port
    console.log("connected to db");
  } catch (e) {
    console.log(e);
  }
};

start();