const { Message, Client, MessageEmbed } = require("discord.js");
const antiscam = require("../../model/antiscam.js");

module.exports = {
    name: "antiscamlink",
    aliases: ['antiscam','as'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: ["ADMINISTRATOR"],
    description: "To see setting anti scam link and users can't send scam link ( Beta )",
    category: "Config",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!args[0]) return usembed(message, 'antiscam <on/off>', 'antiscam on')

        if(args[0] === 'on') {
            antiscam.findOne({ Guild: message.guild.id }, async (err, data) => {
                if(data) data.delete();
                new antiscam({
                  GuildID: message.guild.id,
                  Toggle: true,
                }).save();
                const embed = new MessageEmbed()
                .setTitle(`Successfuly setting for anti send scam link`)
                .setDescription(`Status: \`\`On\`\``)
                .setColor("#2F3136")
                .setFooter({ text: `${client.config.footer}`})
                await message.reply({ embeds: [embed] })
              });
        }

        if(args[0] === 'off') {
            antiscam.findOne({ Guild: message.guild.id }, async (err, data) => {
                if(data) data.delete();
                new antiscam({
                  GuildID: message.guild.id,
                  Toggle: false,
                }).save();
                const embed = new MessageEmbed()
                .setTitle(`Successfuly setting for anti send scam link`)
                .setDescription(`Status: \`\`Off\`\``)
                .setColor("#2F3136")
                .setFooter({ text: `${client.config.footer}`})
                await message.reply({ embeds: [embed] })
              });
        }
    },
};
