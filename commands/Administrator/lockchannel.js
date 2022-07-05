const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "lockchannel",
    aliases: ['lc','lock'],
    cooldown: 3,
    botPermissions: ["MANAGE_CHANNELS"],
    userPermissions: ["MANAGE_CHANNELS","MANAGE_SERVER"],
    description: "To see lock channel and member can't send messages",
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
        message.channel.permissionOverwrites.edit(role, { SEND_MESSAGES: false });

        const embed = new MessageEmbed()
        .setTitle(`This channel has been locked by ${message.author.username}'s`)
        .setDescription(`${reason}`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})

        message.reply({ embeds: [embed] })
    },
};
