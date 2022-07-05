const { model, Schema } = require("mongoose");

let Data = new Schema({
  ID: String,
  Time: String
});

module.exports = model("uptime", Data);