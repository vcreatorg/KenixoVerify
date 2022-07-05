const { model, Schema } = require("mongoose");

let Data = new Schema(
{
   Guild: String,
   User: String,
   Reason: String,
   Date: String

});


module.exports = model("afk", Data);