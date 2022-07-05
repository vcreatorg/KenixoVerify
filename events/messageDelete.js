const client = require("../index");

client.snipes = new Map();
client.on("messageDelete", async (message, channel) => {
    client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.author.tag,
      member: message.member,
      image: message.attachments.first() ? message.attachments.first().proxyURL : null
    });
});