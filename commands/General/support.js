const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { support } = require("../../config.json");

module.exports = {
    name: "support",
    aliases: ['supportserver','join support server','supp','join'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see button join support server",
    category: "General",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embedIn = new MessageEmbed()
        .setTitle('Join support server!')
        .setDescription(`You can press the button below to join the support server.`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})

        const row = new MessageActionRow()
        .addComponents([
            new MessageButton().setURL(support).setLabel("Join support server").setStyle("LINK")
        ])

        message.reply({ embeds: [embedIn], components: [row] })
    },
};
