const { Message, Client, MessageEmbed } = require("discord.js");
const register = require("../../model/register.js");

module.exports = {
    name: "setregister",
    aliases: ['sg','setup register'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: ["ADMINISTRATOR"],
    description: "To see setting for register command",
    category: "Config",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        const tag = args.slice(2).join(" ");

        if(!channel) return usembed(message, 'setregister <channel> <role> <tag>', 'setregister #register @member [MEMBER]');
        if(!role) return usembed(message, 'setregister <channel> <role> <tag>', 'setregister #register @member [MEMBER]');

        register.findOne({ Guild: message.guild.id }, async (err, data) => {
            if(data) data.delete();
            new register({
              Guild: message.guild.id,
              Channel: channel.id,
              Role: role.id,
              Tag: tag,
            }).save();
               if(tag === '') {
                 const embed1 = new MessageEmbed()
                 .setTitle(`Successfuly setting for register command`)
                 .addField(`Channel:`, `<#${channel.id}>`, true)
                 .addField(`Role:`, `<@&${role.id}>`, true)
                 .setColor("#2F3136")
                 .setFooter({ text: `${client.config.footer}`})
                 return message.reply({ embeds: [embed1] })
               } else {
                const embed2 = new MessageEmbed()
                .setTitle(`Successfuly setting for register command`)
                .addField(`Channel:`, `<#${channel.id}>`, true)
                .addField(`Role:`, `<@&${role.id}>`, true)
                .addField(`Tag:`, `${tag}`, true)
                .setColor("#2F3136")
                .setFooter({ text: `${client.config.footer}`})
                await message.reply({ embeds: [embed2] })
               }
        });
    },
};
