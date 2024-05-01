// Підключення необхідних модулів та пакетів
const mongoose = require("mongoose"); // для роботи з MongoDB
const express = require("express"); // для створення веб-сервера
const app = express(); // створення екземпляру додатку
const ejs = require("ejs"); // для рендерингу шаблонів EJS
const bodyParser = require("body-parser"); // для обробки даних форми
const Card = require("./model/Card"); // імпорт моделі карти (виду даних)
require("dotenv").config(); // завантаження змінних середовища з .env файлу

// Налаштування двигуна рендерингу та папки з шаблонами
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

// Використання статичної папки для віддачі статичних файлів клієнту
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Головна сторінка - відображення головного шаблону
app.get("/", function (req, res) {
  let error = "";
  res.render("home", { error }); // рендеринг головної сторінки з можливістю передачі помилки
});

// Додаткова сторінка - приклад
app.get("/base", function (req, res) {
  res.render("otherFile"); // рендеринг іншого шаблону
});

// Обробник POST-запиту для додавання нової картки
app.post("/add", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const newCard = new Card({ name, email }); // створення нової картки з отриманими даними
  await newCard.save(); // збереження нової картки в базу даних
  res.render("result", { name, email }); // рендеринг сторінки з результатом додавання
});

// Обробник POST-запиту для аутентифікації
app.post("/aa", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === process.env.USERNAME1 && password === process.env.PASSWORD) {
    // перевірка користувача та пароля на відповідність
    console.log("hello");
    res.redirect("/"); // перенаправлення на головну сторінку у разі успішної аутентифікації
  } else {
    console.log("error");
    let error = "геть не той пароль123";
    res.render("home", { error }); // повернення на головну сторінку з помилкою у разі невірного пароля
  }
});

// Налаштування порту для прослуховування сервером запитів
const port = process.env.PORT || 3000; // використання заданого в .env файлі порту або порту 3000 за замовчуванням
console.log("server started");

// Підключення до бази даних та запуск сервера
const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`); // підключення до MongoDB
    app.listen(port); // запуск веб-сервера на вказаному порті
    console.log("connected to db"); // повідомлення про підключення до бази даних
  } catch (e) {
    console.log(e); // обробка помилок під час підключення до бази даних
  }
};

start(); // виклик функції для підключення та запуску сервера
