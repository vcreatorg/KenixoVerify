const { Message, Client, MessageEmbed } = require("discord.js");
const db = require('../../model/warns');

module.exports = {
    name: "remwarn",
    aliases: ['rm'],
    cooldown: 3,
    botPermissions: ["KICK_MEMBERS"],
    userPermissions: ["KICK_MEMBERS"],
    description: "To see remove warn member from the server",
    category: "Administrator",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const reasonW = args.slice(2).join(" ") || 'No reason';
        if(!args[0] && !args[1]) return useEmbed(message, 'remove warn <user> <amount> <reason>', 'remove warn @user 1 sorry');

        if(target.roles.highest.position >= message.member.roles.highest.position) return errembed(message, `You can't remove warn the target because the target's role is higher!`);

        db.findOne({ Guild: message.guild.id, User: target.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1;
                data.Content.splice(number, 1);
                data.save();
                const embedDMR = new MessageEmbed()
                .setTitle(`You has been removed warn from ${message.guild.name}`)
                .addField(`Moderator:`, `${message.author.id} (\`\`${message.author.tag}\`\`)`)
                .addField(`Date:`, `<t:${Math.round(Date.now() / 1000)}:D> (<t:${Math.round(Date.now() / 1000)}:R>)`)
                .addField(`Removed:`, `${args[1]}`)
                .addField(`Reason:`, `${reason}`)
                .setColor("#2F3136")
                .setFooter({ text: `${client.config.footer}`})
                target.send({ embeds: [embedDMR]} );
        
                const embed = new MessageEmbed()
                .setTitle(`${target.user.username}'s has been removed ${args[0]} warn by ${message.author.username}'s`)
                .setDescription(`${reason}`)
                .setColor("#2F3136")
                .setFooter({ text: `${client.config.footer}`})
                message.reply({ embeds: [embed] })
            } else {
                return errembed(message, 'This user does not have any warns in this server');
            }
        })
    },
};
