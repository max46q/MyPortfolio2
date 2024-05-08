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
    type: Number,
    required: true,
  },
  avatar: {
    type: String
  }
});

module.exports = model("user", CardRegSchema);
