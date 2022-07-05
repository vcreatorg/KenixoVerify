const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "invite",
    aliases: ['addbot','inv','pi','iv'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see how to add bots and get invite links",
    category: "General",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embedIn = new MessageEmbed()
        .setTitle('How to invite!')
        .setDescription(`Click the bot profile then press the **Add to server** button and select which server you want to add this bot to or click button **Invite Now!** and select your server.`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})

        const row = new MessageActionRow()
        .addComponents([
            new MessageButton() .setURL(client.config.invite) .setLabel("Invite Now!") .setStyle("LINK")
        ])

        message.reply({ embeds: [embedIn], components: [row] })
    },
};
