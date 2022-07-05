const { model, Schema } = require("mongoose");

let Data = new Schema({
  Guild: String,
  Channel: String,
  Text: String
});

module.exports = model("welcome", Data);