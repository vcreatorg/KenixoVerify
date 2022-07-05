const { Message, Client, MessageEmbed } = require("discord.js");
const parseTime = require('parse-duration').default;
const ms = require('ms');

module.exports = {
    name: "timeout",
    aliases: ['timeout'],
    cooldown: 3,
    botPermissions: ["KICK_MEMBERS"],
    userPermissions: ["KICK_MEMBERS"],
    description: "To see timout member from the server",
    category: "Administrator",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const length = args[1];
        const reason = args.slice(2).join(" ") || 'No reason';
        let parsedTime = parseTime(length);

        if(!target) return usembed(message, 'timeout <user> <time> <reason>', 'timeout @user 5m Badwords');
        if(!length) return usembed(message, 'timeout <user> <time> <reason>', 'timeout @user 5m Badwords');
        const timeInMs = ms(length);

        if(!timeInMs) return errembed(message, 'Please specify a valid time');

        if(parsedTime < ms('1m') || parsedTime > ms('28d')) return errembed(message, 'The input time is off limit');

        if(target.roles.highest.position >= message.member.roles.highest.position) return errembed(message, `You can't timeout the target because the target's role is higher!`);

        const embedDM = new MessageEmbed()
        .setTitle(`You has been timeouted from ${message.guild.name}`)
        .addField(`Moderator:`, `${message.author.id} (\`\`${message.author.tag}\`\`)`)
        .addField(`Date:`, `<t:${Math.round(Date.now() / 1000)}:D> (<t:${Math.round(Date.now() / 1000)}:R>)`)
        .addField(`Length:`, `${length}`)
        .addField(`Reason:`, `${reason}`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})
        await target.send({ embeds: [embedDM]} );
        target.timeout(parsedTime, reason);

        const embed = new MessageEmbed()
        .setTitle(`${target.user.username}'s has been timeouted by ${message.author.username}'s for ${length}`)
        .setDescription(`${reason}`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})
        message.reply({ embeds: [embed] })
    },
};
