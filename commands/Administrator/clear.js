const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    aliases: ['purge'],
    cooldown: 3,
    botPermissions: ["MANAGE_MESSAGES"],
    userPermissions: ["MANAGE_MESSAGES"],
    description: "To see delete messages",
    category: "Administrator",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!args[0]) return usembed(message, 'clear <anount>', 'clear 50');

        if(isNaN(args[0])) return errembed(message, 'Please enter a valid number');

        if(!args[0] || args[0] < 2 || args[0] > 100) return errembed(message, 'Please enter a number of message between 2 and 100');

        try {
            await message.delete();
            await message.channel.bulkDelete(args[0]).then(async (m) => {
                const embed = new MessageEmbed()
                .setTitle(`Cleared messages by ${message.author.username}'s`)
                .setDescription(`Cleared **${m.size}**/**${args[0]}** messages`)
                .setColor("#2F3136")
                .setFooter({ text: `${client.config.footer}`})
                message.reply({ embeds: [embed] }).then(async (msg) => {
                    setTimeout(() => msg.delete(), 2000)
                  });
            });

        } catch {
            return errembed(message, 'You can only delete the messages which are not older than 14 days')
        }
    },
};
