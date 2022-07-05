const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['latency','webshocket','pi','ms'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see ping information",
    category: "Information",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle(`Ping Information`)
        .addField(`API Latency:`, `${client.ws.ping}ms`)
        .addField(`Database Latency:`, `${Date.now() - message.createdTimestamp}ms`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})

        message.reply({ embeds: [embed] })
    },
};
