const { Schema, model } = require("mongoose");
const CardRegSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    text: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("Card", CardRegSchema);