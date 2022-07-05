const { Message, Client, MessageEmbed } = require("discord.js");
const welcome = require('../../model/welcome.js');

module.exports = {
    name: "delwelcome",
    aliases: ['dw','remwelcome'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: ["ADMINISTRATOR"],
    description: "To see delete setting for welcome image",
    category: "Config",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const prefix = await client.prefix(message);

        const dataW = await welcome.findOne({ Guild: message.guild.id });

        if(!dataW) return errembed(message, `This feature is not set yet! type \`\`${prefix}delwelcome\`\``)
        
        welcome.findOne({ Guild: message.guild.id }, async (err, data) => {
          if(data) data.delete();
          const embed = new MessageEmbed()
          .setTitle(`Successfuly deleting setting for welcome image`)
          .addField(`Channel:`, `<#${data.Channel}>`, true)
          .addField(`Text:`, `${data.Text}`, true)
          .setColor("#2F3136")
          .setFooter({ text: `${client.config.footer}`})

          await message.reply({ embeds: [embed] })
        });
    },
};
