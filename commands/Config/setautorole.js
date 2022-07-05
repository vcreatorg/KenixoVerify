const { Message, Client, MessageEmbed } = require("discord.js");
const autorole = require("../../model/autorole.js");

module.exports = {
    name: "setautorole",
    aliases: ['sar','setup autorole'],
    cooldown: 3,
    botPermissions: ["MANAGE_ROLES"],
    userPermissions: ["ADMINISTRATOR"],
    description: "To see setting for auto give roles when users joined server",
    category: "Config",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
      
        if(!role) return usembed(message, 'setautorole <role>', 'setautorole @member')
        
        const rrole = message.guild.roles.cache.get(role.id)
        const bRole =  message.guild.me;
        if(rrole.position >= bRole.roles.highest.position) return errembed(message, `The role you want to add must be above the bot's role!`);
        
        autorole.findOne({ GuildID: message.guild.id }, async (err, data) => {
          if(data) data.delete();
          new autorole({
            GuildID: message.guild.id,
            RoleID: role.id
          }).save();
            const embed = new MessageEmbed()
            .setTitle(`Successfuly setting for auto give roles when user joined server`)
            .addField(`Role:`, `<@&${role.id}>`, true)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
            await message.reply({ embeds: [embed] })
        });
    },
};
