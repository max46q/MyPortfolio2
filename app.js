const mongoose = require("mongoose");
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const userCard = require("./model/CardWithMoreInf");

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

app.get("/all", async (req, res) => {
  const allCards = await userCard.find(); //дістає всіх користувачів з модельки userCards
  res.render("all", { allCards });
});

app.post("/add", async (req, res) => {
  const { name, email, age } = req.body;
  // const newCard = new Card({ name, email });
  const newCard = new userCard({ name, email, age });

  await newCard.save();
  res.render("result.ejs", { name, email });
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
