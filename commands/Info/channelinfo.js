const { Message, Client, MessageEmbed } = require("discord.js");
const { time } = require('@discordjs/builders');

module.exports = {
    name: "channelinfo",
    aliases: ['ci','infochannel','ic'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see channel information",
    category: "Information",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if(!channel) return usembed(message, 'channelinfo <channel>', 'channelinfo #General')

        const createdate = channel.createdAt;
        const agocreatef = time(createdate, 'f');
        const agocreateR = time(createdate, 'R');

        const embed = new MessageEmbed()
        .setTitle(`Channel Information`)
        .addField(`Name:`, `${channel.name}`, true)
        .addField(`ID:`, `${channel.id}`, true)
        .addField(`Type:`, `${channel.type}`)
        .addField(`Description:`, `${channel.description || `No Description`}`)
        .addField(`NFSW:`, `${channel.nsfw}`)
        .addField(`Created At:`, `${agocreatef} (${agocreateR})`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})

        message.reply({ embeds: [embed] })
    },
};
