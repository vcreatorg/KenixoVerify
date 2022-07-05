const { model, Schema } = require("mongoose");

let Data = new Schema({
  Guild: String,
  User: String,
  Content: Array
});

module.exports = model("warns", Data);