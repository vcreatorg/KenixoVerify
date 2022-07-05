const { Message, Client, MessageEmbed } = require("discord.js");
const welcome = require('../../model/welcome.js');

module.exports = {
    name: "setwelcome",
    aliases: ['sw','setup welcome'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: ["ADMINISTRATOR"],
    description: "To see setting for welcome image",
    category: "Config",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const prefix = await client.prefix(message);
        const text = args.slice(1).join(" ");
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        
        const embedH = new MessageEmbed()
        .setTitle(`How to use!`)
        .addField(`Variable:`, `vServer\nvUser\nvCount`)
        .addField(`Usage:`, `${prefix}setwelcome <channel> <message>`)
        .addField(`Example:`, `${prefix}setwelcome #welcome Welcome to vServer`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})
        if(!channel) return message.reply({ embeds: [embedH] });
        
        var str = `${text}`;
        var mapObj = {
          vServer: `${message.guild.name}`,
          vUser: `<@${message.author.id}>`,
          vCount: `${message.guild.memberCount}`
        };
  
        str = str.replace(/\b(vServer|vUser|vCount)\b/gi, function(matched){
          return mapObj[matched];
        });
  
        welcome.findOne({ Guild: message.guild.id }, async (err, data) => {
          if(data) data.delete();
          new welcome({
            Guild: message.guild.id,
            Channel: channel.id,
            Text: text
          }).save();
          
          const embed = new MessageEmbed()
          .setTitle(`Successfuly setting for welcome image`)
          .addField(`Channel:`, `<#${channel.id}>`, true)
          .addField(`Text:`, `${text}`, true)
          .setColor("#2F3136")
          .setFooter({ text: `${client.config.footer}`})

          message.reply({ embeds: [embed] })
        });
    },
};
