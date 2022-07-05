const { Message, Client, MessageEmbed } = require("discord.js");
const ship = require("../../model/ship.js");
const samp = require("../../model/samp.js");

module.exports = {
    name: "hideip",
    aliases: [''],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: ["ADMINISTRATOR"],
    description: "To see hide ip, ip not showed on command ip",
    category: "SA:MP",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      if(!args[0]) return usembed(message, 'hideip <on/off>', 'hideip on');

      const data = await samp.findOne({ Guild: message.guild.id });
    
      const prefix = await client.prefix(message);
      if(!data) return errembed(message, `The server address has not been added yet! type \`\`${prefix}setip\`\``);
      
      if(args[0] === 'on') {
        ship.findOne({ GuildID: message.guild.id }, async (err, data) => {
          if(data) data.delete();
          new ship({
            GuildID: message.guild.id,
            Toggle: true,
          }).save();
          const embed = new MessageEmbed()
          .setTitle(`Successfuly setting for show / hide ip SA:MP server`)
          .setDescription(`Status: \`\`Hide\`\``)
          .setColor("#2F3136")
          .setFooter({ text: `${client.config.footer}`})
          await message.reply({ embeds: [embed] })
        });
      }

      if(args[0] === 'off') {
        ship.findOne({ GuildID: message.guild.id }, async (err, data) => {
          if(data) data.delete();
          new ship({
            GuildID: message.guild.id,
            Toggle: false,
          }).save();
          const embed = new MessageEmbed()
          .setTitle(`Successfuly setting for show / hide ip SA:MP server`)
          .setDescription(`Status: \`\`Show\`\``)
          .setColor("#2F3136")
          .setFooter({ text: `${client.config.footer}`})
          await message.reply({ embeds: [embed] })
        }); 
      }
    },
};
