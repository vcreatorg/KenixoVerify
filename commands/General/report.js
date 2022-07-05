const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "report",
    aliases: ['bug'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see send report",
    category: "General",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!args[0]) return usembed(message, 'report <text>', 'report have bug');
        const embedIn = new MessageEmbed()
        .setTitle('Reported')
        .setDescription(`${args[0]}`)
        .setColor("#2F3136")
        .setFooter({ text: `Report by: ${message.author.id}`})

        esend(message, 'Successfuly send report message to Server Support');

        client.channels.cache.get("934103733648887849").send({ embeds: [embedIn]})
    },
};
