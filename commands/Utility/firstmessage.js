const { Message, Client, MessageEmbed } = require("discord.js");
const { time } = require('@discordjs/builders');

module.exports = {
    name: "firstmessage",
    aliases: ['fm'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see show information first message on channel",
    category: "Utility",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
            const fetchmessages = await message.channel.messages.fetch({ limit: 1, after: 1 })
            const msg = fetchmessages.first()
    
            const created = msg.createdAt;
            const agocreatef = time(created, 'f');
            const agocreateR = time(created, 'R');
            
            const embed = new MessageEmbed()
            .setTitle(`First Message Information`)
            .addField(`Message Content:`, `${msg.content || `-`}`)
            .addField(`Sent By:`, `${msg.author}`)
            .addField(`Date Sent:`, `${agocreatef} (${agocreateR})`)
            .addField(`URL:`, `[Click Me](${msg.url})`)
            .setURL(msg.url)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
    
            message.reply({ embeds: [embed] })     
        } catch (error) {
            console.log(error)
        }
    },
};
