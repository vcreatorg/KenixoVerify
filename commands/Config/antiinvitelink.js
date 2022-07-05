const { Message, Client, MessageEmbed } = require("discord.js");
const antiinvite = require("../../model/antiinvite.js");

module.exports = {
    name: "antiinvitelink",
    aliases: ['ainl','antiinvite'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: ["ADMINISTRATOR"],
    description: "To see setting anti invite link and users can't send invite link",
    category: "Config",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!args[0]) return usembed(message, 'antiinvite <on/off>', 'antiinvite on')

        if(args[0] === 'on') {
            antiinvite.findOne({ Guild: message.guild.id }, async (err, data) => {
                if(data) data.delete();
                new antiinvite({
                  GuildID: message.guild.id,
                  Toggle: true,
                }).save();
                    const embed = new MessageEmbed()
                    .setTitle(`Successfuly setting for anti send invite link`)
                    .setDescription(`Status: \`\`On\`\``)
                    .setColor("#2F3136")
                    .setFooter({ text: `${client.config.footer}`})
                    await message.reply({ embeds: [embed] })
              });
        }

        if(args[0] === 'off') {
            antiinvite.findOne({ Guild: message.guild.id }, async (err, data) => {
                if(data) data.delete();
                new antiinvite({
                  GuildID: message.guild.id,
                  Toggle: false,
                }).save();
                    const embed = new MessageEmbed()
                    .setTitle(`Successfuly setting for anti send invite link`)
                    .setDescription(`Status: \`\`Off\`\``)
                    .setColor("#2F3136")
                    .setFooter({ text: `${client.config.footer}`})
                    await message.reply({ embeds: [embed] })
              });
        }
    },
};
