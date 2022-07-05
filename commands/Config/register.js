const { Message, Client, MessageEmbed } = require("discord.js");
const register = require("../../model/register.js");

module.exports = {
    name: "register",
    aliases: ['rg'],
    cooldown: 3,
    botPermissions: ["MANAGE_ROLES","MANAGE_NICKNAMES"],
    userPermissions: [""],
    description: "To see register role",
    category: "Config",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const data = await register.findOne({ Guild: message.guild.id });
        const nickname = args.join(" ");
        
        const prefix = await client.prefix(message);
        if(!data) return errembed(message, `This feature has not been added on the server! type \`\`${prefix}setregister\`\``);
        
        if(message.channel.id != `${data.Channel}`) return errembed(message, `You can only use this command in <#${data.Channel}>`)
      
        if (message.member.permissions.has("MANAGE_MESSAGES")) return errembed(message, 'You cannot use this command, because you are part of the administrator')
        
        if(!nickname) return usembed(message, 'register <nickname>', 'register Kenrich_Travis')
        
        const nick = `${data.Tag} ` + nickname;
        if(nick.length > 32) return errembed(message, 'Nickname is too long, please provide a shorter one')
  
        const rrole = message.guild.roles.cache.get(data.Role)
        const bRole =  message.guild.me;
        if(rrole.position >= bRole.roles.highest.position) return errembed(message, `The role you want to add must be above the bot's role`);
        
        try {
            if(data.Msg === '') {
              message.member.roles.add(data.Role);
              message.member.setNickname(nick);
              const embed1 = new MessageEmbed()
              .setDescription(`Successfuly registered on ${message.guild.name}`)
              .setColor("#2F3136")
              .setFooter({ text: `${client.config.footer}`})
              message.reply({ embeds: [embed1] })
            } else {
              message.member.roles.add(data.Role);
              message.member.setNickname(nick);
              const embed2 = new MessageEmbed()
              .setDescription(data.Msg)
              .setColor("#2F3136")
              .setFooter({ text: `${client.config.footer}`})
              message.reply({ embeds: [embed2] })
            }
        } catch (err) {
          console.log(err)
        }
    },
};
