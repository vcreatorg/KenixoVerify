const { Message, Client, MessageEmbed } = require("discord.js");
const samp = require("../../model/samp.js");

module.exports = {
    name: "setip",
    aliases: ['setaddress','setport','setserver'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: ["ADMINISTRATOR"],
    description: "To see setup address SA:MP server",
    category: "SA:MP",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const split = args.join(" ").split(":");
      
        if(!split[0]) return usembed(message, 'setip <address:port>', 'setip 127.0.0.1:7777')
        if(!split[1]) return usembed(message, 'setip <address:port>', 'setip 127.0.0.1:7777')
        
        
        samp.findOne({ Guild: message.guild.id }, async (err, data) => {
          if(data) data.delete();
          new samp({
            Guild: message.guild.id,
            Ip: split[0],
            Port: split[1]
          }).save();
            const embed = new MessageEmbed()
            .setTitle( `Successfuly setting address SA:MP server`)
            .setDescription(`Address: ${split[0]}:${split[1]}`)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
            await message.reply({ embeds: [embed] })
        });
    },
};
