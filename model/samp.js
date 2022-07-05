const { model, Schema } = require("mongoose");

let Data = new Schema({
  Guild: String,
  Ip: String,
  Port: String
});

module.exports = model("samp", Data);