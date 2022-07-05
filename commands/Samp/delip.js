const { Message, Client, MessageEmbed } = require("discord.js");
const samp = require('../../model/samp.js');

module.exports = {
    name: "delip",
    aliases: ['remip','remaddress','deladdress'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: ["ADMINISTRATOR"],
    description: "To see delete address SA:MP server",
    category: "SA:MP",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const dataW = await samp.findOne({ Guild: message.guild.id });

        const prefix = await client.prefix(message);
        if(!dataW) return errembed(message, `The server address has not been added yet! type \`\`${prefix}setip\`\``)
        
        samp.findOne({ Guild: message.guild.id }, async (err, data) => {
            const embed = new MessageEmbed()
            .setTitle(`Successfuly delete address SA:MP server`)
            .setDescription(`Server address setup: ${data.Ip}:${data.Port}`)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
            await message.reply({ embeds: [embed] })
          if(data) data.delete();
        });
    },
};
