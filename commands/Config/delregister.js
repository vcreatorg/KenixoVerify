const { Message, Client, MessageEmbed } = require("discord.js");
const register = require("../../model/register.js");

module.exports = {
    name: "delregister",
    aliases: ['delete register','remregister'],
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
        const dataG = await register.findOne({ Guild: message.guild.id });
      
        const prefix = await client.prefix(message);
        if(!dataG) return errembed(message, `This feature has not been added on the server! type \`\`${prefix}setregister\`\``)
        
        register.findOne({ Guild: message.guild.id }, async (err, data) => {
          if(data) data.delete();
          if(dataG.Tag === ``) {
            const embed = new MessageEmbed()
            .setTitle(`Succesfuly delete data for register command`)
            .addField(`Channel:`, `<#${dataG.Channel}>`, true)
            .addField(`Role:`, `<@&${dataG.Role}>`, true)

            message.reply({ embeds: [embed] })
          } else {
            const embed1 = new MessageEmbed()
            .setTitle(`Succesfuly delete data for register command`)
            .addField(`Channel:`, `<#${dataG.Channel}>`, true)
            .addField(`Role:`, `<@&${dataG.Role}>`, true)
            .addField(`Tag:`, `${dataG.Tag}`, true)

            message.reply({ embeds: [embed1] })  
          }
        });
    },
};
