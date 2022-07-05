const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "unlockchannel",
    aliases: ['uc','unlock'],
    cooldown: 3,
    botPermissions: ["MANAGE_CHANNELS"],
    userPermissions: ["MANAGE_CHANNELS","MANAGE_SERVER"],
    description: "To see unlock channel and member can send messages",
    category: "Administrator",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const reason = args.join(" ") || `No reason`;
        const role = message.channel.guild.roles.everyone;
        message.channel.permissionOverwrites.edit(role, { SEND_MESSAGES: true });

        const embed = new MessageEmbed()
        .setTitle(`This channel has been unlocked by ${message.author.username}'s`)
        .setDescription(`${reason}`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})

        message.reply({ embeds: [embed] })
    },
};
