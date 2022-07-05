const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "unban",
    aliases: ['unbanned'],
    cooldown: 3,
    botPermissions: ["BAN_MEMBERS"],
    userPermissions: ["BAN_MEMBERS"],
    description: "To see unban member from the server",
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

        if(!target) return usembed(message, 'unban <user> <reason>', 'unban @user Sorry');

        const bannedUsers = await message.guild.bans.fetch();
        const user = bannedUsers.get(target);
        if(!user) return errembed(message, 'Unable to find user, please check the provied userid valid')

        const embedDM = new MessageEmbed()
        .setTitle(`You has been unbanned from ${message.guild.name}`)
        .addField(`Moderator:`, `${message.author.id} (\`\`${message.author.tag}\`\`)`)
        .addField(`Date:`, `<t:${Math.round(Date.now() / 1000)}:D> (<t:${Math.round(Date.now() / 1000)}:R>)`)
        .addField(`Reason:`, `${reason}`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})
        await target.send({ embeds: [embedDM]} );

        message.guild.members.unban(target);

        const embed = new MessageEmbed()
        .setTitle(`${target.user.username}'s has been unbanned by ${message.author.username}'s`)
        .setDescription(`${reason}`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})
        message.reply({ embeds: [embed] })
    },
};
