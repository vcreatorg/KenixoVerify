const { Message, Client, MessageEmbed } = require("discord.js");
const register = require("../../model/autorole.js");

module.exports = {
    name: "delautorole",
    aliases: ['dar','remautorole'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: ["ADMINISTRATOR"],
    description: "To see delete setting for auto give roles when users joined server",
    category: "Config",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const dataG = await register.findOne({ GuildID: message.guild.id });
      
        const prefix = await client.prefix(message);
        if(!dataG) return errembed(message, `This feature has not been added on the server! type \`\`${prefix}setautorole\`\``)
        
        register.findOne({ GuildID: message.guild.id }, async (err, data) => {
          if(data) data.delete();
            const embed = new MessageEmbed()
            .setTitle(`Successfuly deleting setting for auto roles when users joined server`)
            .addField(`Role:`, `<@&${data.RoleID}>`, true)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
            await message.reply({ embeds: [embed] })
        });
    },
};
