const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    aliases: ['kicked'],
    cooldown: 3,
    botPermissions: ["KICK_MEMBERS"],
    userPermissions: ["KICK_MEMBERS"],
    description: "To see kick member from the server",
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

        if(!target) return usembed(message, 'kick <user> <reason>', 'kick @user Badwords');

        if(target.roles.highest.position >= message.member.roles.highest.position) return errembed(message, `You can't kick the target because the target's role is higher!`);

        const embedDM = new MessageEmbed()
        .setTitle(`You has been kicked from ${message.guild.name}`)
        .addField(`Moderator:`, `${message.author.id} (\`\`${message.author.tag}\`\`)`)
        .addField(`Date:`, `<t:${Math.round(Date.now() / 1000)}:D> (<t:${Math.round(Date.now() / 1000)}:R>)`)
        .addField(`Reason:`, `${reason}`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})
        await target.send({ embeds: [embedDM]} );
        target.kick(reason);

        const embed = new MessageEmbed()
        .setTitle(`${target.user.username}'s has been kicked by ${message.author.username}'s`)
        .setDescription(`${reason}`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})
        message.reply({ embeds: [embed] })
    },
};
