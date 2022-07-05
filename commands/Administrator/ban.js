const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    aliases: ['banned'],
    cooldown: 3,
    botPermissions: ["BAN_MEMBERS"],
    userPermissions: ["BAN_MEMBERS"],
    description: "To see ban member from the server",
    category: "Administrator",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(" ") || 'No reason';

        if(!target) return usembed(message, 'ban <user> <reason>', 'ban @user Badwords');

        if(target.roles.highest.position >= message.member.roles.highest.position) return errembed(message, `You can't ban the target because the target's role is higher!`);

        const embedDM = new MessageEmbed()
        .setTitle(`You has been banned from ${message.guild.name}`)
        .addField(`Moderator:`, `${message.author.id} (\`\`${message.author.tag}\`\`)`)
        .addField(`Date:`, `<t:${Math.round(Date.now() / 1000)}:D> (<t:${Math.round(Date.now() / 1000)}:R>)`)
        .addField(`Reason:`, `${reason}`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})
        await target.send({ embeds: [embedDM]} );
        target.ban(reason);

        const embed = new MessageEmbed()
        .setTitle(`${target.user.username}'s has been banned by ${message.author.username}'s`)
        .setDescription(`${reason}`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})
        message.reply({ embeds: [embed] })
    },
};
