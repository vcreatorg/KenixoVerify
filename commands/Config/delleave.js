const { Message, Client, MessageEmbed } = require("discord.js");
const leave = require('../../model/leave.js');

module.exports = {
    name: "delleave",
    aliases: ['dl','remleave'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: ["ADMINISTRATOR"],
    description: "To see delete setting for leave image",
    category: "Config",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const prefix = await client.prefix(message);

        const dataW = await leave.findOne({ Guild: message.guild.id });

        if(!dataW) return errembed(message, `This feature is not set yet! type \`\`${prefix}setleave\`\``)
        
        leave.findOne({ Guild: message.guild.id }, async (err, data) => {
          if(data) data.delete();
          const embed = new MessageEmbed()
          .setTitle(`Successfuly deleting setting for leave image`)
          .addField(`Channel:`, `<#${data.Channel}>`, true)
          .addField(`Text:`, `${data.Text}`, true)
          .setColor("#2F3136")
          .setFooter({ text: `${client.config.footer}`})

          await message.reply({ embeds: [embed] })
        });
    },
};
