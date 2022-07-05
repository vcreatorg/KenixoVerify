const { model, Schema } = require("mongoose");

let Data = new Schema({
  Guild: String,
  Channel: String,
  Role: String,
  Tag: String,
  Msg: String
});

module.exports = model("register", Data);