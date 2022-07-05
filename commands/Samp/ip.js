const { Message, Client, MessageEmbed } = require("discord.js");
const samp = require("../../model/samp.js");
const ship = require("../../model/ship.js");

module.exports = {
    name: "ip",
    aliases: ['address','port','connect'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see address SA:MP server",
    category: "SA:MP",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const dIP = await ship.findOne({ GuildID: message.guild.id });
      
        const data = await samp.findOne({ Guild: message.guild.id });
        const prefix = await client.prefix(message);
        if(!data) return errembed(message, `The server address has not been added yet! type \`\`${prefix}setip\`\``);
  
        try {
          if(dIP.Toggle === true) {
            return errembed(message, 'The server ip has been set to invisible');
          } else {
            const ipEmbed = new MessageEmbed()
            .setTitle(`Connect to ${message.guild.name}`)
            .setDescription(`${data.Ip}:${data.Port}`)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
            
            return message.reply({ embeds: [ipEmbed] })
          }
        } catch {
          const ipEmbed = new MessageEmbed()
          .setTitle(`Connect to ${message.guild.name}`)
          .setDescription(`${data.Ip}:${data.Port}`)
          .setColor("#2F3136")
          .setFooter({ text: `${client.config.footer}`})
          
          return message.reply({ embeds: [ipEmbed] })
        }
    },
};
