const { Message, Client, MessageEmbed } = require("discord.js");
const usesamp = require("../../model/usesamp.js");

module.exports = {
    name: "usesamp",
    aliases: ['samptoggle'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: ["ADMINISTRATOR"],
    description: "To see setting acces use command samp",
    category: "SA:MP",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!args[0]) return usembed(message, 'usesamp <on/off>', 'usesamp off');
    
      
        if(args[0] === 'off') {
          usesamp.findOne({ GuildID: message.guild.id }, async (err, data) => {
            if(data) data.delete();
            new usesamp({
              GuildID: message.guild.id,
              Toggle: true,
            }).save();
              const embed = new MessageEmbed()
              .setTitle(`Successfuly setting access use command samp`)
              .setDescription(`Status: \`\`Off\`\``)
              .setColor("#2F3136")
              .setFooter({ text: `${client.config.footer}`})
              await message.reply({ embeds: [embed] })
          });
        }
  
        if(args[0] === 'on') {
          usesamp.findOne({ GuildID: message.guild.id }, async (err, data) => {
            if(data) data.delete();
            new usesamp({
              GuildID: message.guild.id,
              Toggle: false,
            }).save();
            const embed = new MessageEmbed()
            .setTitle(`Successfuly setting access use command samp`)
            .setDescription(`Status: \`\`On\`\``)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
            await message.reply({ embeds: [embed] })
          }); 
        }
    },
};
