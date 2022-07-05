const { model, Schema } = require("mongoose");

let Data = new Schema({
    GuildID: String,
    Toggle: Boolean
});

module.exports = model("antiscam", Data);