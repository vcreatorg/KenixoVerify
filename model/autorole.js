const { model, Schema } = require("mongoose");

let Data = new Schema({
  GuildID: String,
  RoleID: String
});

module.exports = model("autorole", Data);