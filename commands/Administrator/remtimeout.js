const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "remtimeout",
    aliases: ['rt','unmute'],
    cooldown: 3,
    botPermissions: ["KICK_MEMBERS"],
    userPermissions: ["KICK_MEMBERS"],
    description: "To see removed timout member from the server",
    category: "Administrator",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!target) return usembed(message, 'remtimeout <user> <reason>', 'remtimeout @user Badwords');;

        try {
            const reason = args.slice(1).join(" ") || 'No reason';
            if(target.roles.highest.position >= message.member.roles.highest.position) return errembed(message, `You can't kick the target because the target's role is higher!`);
            const embedDMR = new MessageEmbed()
            .setTitle(`You has been removed timeout from ${message.guild.name}`)
            .addField(`Moderator:`, `${message.author.id} (\`\`${message.author.tag}\`\`)`)
            .addField(`Date:`, `<t:${Math.round(Date.now() / 1000)}:D> (<t:${Math.round(Date.now() / 1000)}:R>)`)
            .addField(`Reason:`, `${reason}`)
            .setFooter({ text: `${client.config.footer}`})
            await target.send({ embeds: [embedDMR]} );
            target.timeout(null, reason);
    
            const embed = new MessageEmbed()
            .setTitle(`${target.user.username}'s has been removed timeout by ${message.author.username}'s`)
            .setDescription(`${reason}`)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
            return message.reply({ embeds: [embed] })
        } catch {
            return errembed(message, 'Users is not timeouted')
        }
    },
};
