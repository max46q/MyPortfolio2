const { Schema, model } = require("mongoose");
const CardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = model("Card", CardSchema);
