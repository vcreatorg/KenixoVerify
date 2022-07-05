const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: ['pp','av'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see profil picture",
    category: "Information",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const user = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])
        || message.member;

        message.reply(`**${user.user.username}'s Avatar**\n${user.user.displayAvatarURL({ size: 4096, dynamic: true })}`)
    },
};
