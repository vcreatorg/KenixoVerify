const { Message, Client, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "uptime",
    aliases: ['up','timeon'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see uptime information",
    category: "Information",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const days = Math.floor(client.uptime / 86400000);
        const hours = Math.floor(client.uptime / 3600000) % 24;
        const minutes = Math.floor(client.uptime / 60000) % 60;
        const seconds = Math.floor(client.uptime / 1000) % 60;
        const d = moment.duration(message.client.uptime);
        const date = moment().subtract(d, 'ms').format('dddd, MMMM Do YYYY');
        const RemoveUseless = (Duration) => {
            return Duration.replace("0 day\n", "").replace("0 hour\n", "").replace("0 minute\n", "");
        };
        
        const Uptime = await RemoveUseless(`${days} ${days > 1 ? "days" : "day"}, ${hours} ${hours > 1 ? "hours" : "hour"}, ${minutes} ${minutes > 1 ? "minutes" : "minute"}, ${seconds} ${seconds > 1 ? "seconds" : "second"}`);
        
        const embed = new MessageEmbed()
        .setTitle(`Uptime Information`)
        .setDescription(`\`\`\`css\n${Uptime}\n\`\`\``)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})

        message.reply({ embeds: [embed] })
    },
};
