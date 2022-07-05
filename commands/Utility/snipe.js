const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "snipe",
    aliases: ['sniped'],
    cooldown: 3,
    botPermissions: ["MANAGE_MESSAGES"],
    userPermissions: [""],
    description: "To see show delete message",
    category: "Utility",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const msg = client.snipes.get(message.channel.id);
        if(!msg) return errembed(message, `Didn't find any deletes message`);
        const embed = new MessageEmbed()
        .setTitle(`Message deleted by ${msg.author}`)
        .setDescription(msg.content)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})

        if(msg.image) embed.setImage(msg.image)
        message.reply({ embeds: [embed] })
    },
};
