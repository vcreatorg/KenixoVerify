const { Message, Client, MessageEmbed } = require("discord.js");
const prefixModel = require("../../model/prefix") //path of prefix model

module.exports = {
    name: "resetprefix",
    aliases: ['rp','prefixreset'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: ["ADMINISTRATOR"],
    description: "To see reset prefix this bot on server",
    category: "Administrator",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const data = await prefixModel.findOne({
            GuildID: message.guild.id
        });

        if (data) {
            await prefixModel.findOneAndRemove({
                GuildID: message.guild.id
            })
        }

        const embed1 = new MessageEmbed()
        .setTitle(`Successfuly reset bot prefix`)
        .setDescription(`The bot prefix is now \`\`?\`\``)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})

        message.reply({ embeds: [embed1] })
    },
};
