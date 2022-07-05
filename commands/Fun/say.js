const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    aliases: [''],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To bot say with your input text",
    category: "Fun",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const text = args.join(" ");
        if(!text) return usembed(message, 'say <text>', 'say hello');
        const data = message.attachments.first() ? message.attachments.first().proxyURL : null;

        if(data) {
            message.delete();
            message.reply(text)
            message.reply(data)
        } else {
            message.reply(text)
        }
    },
};
