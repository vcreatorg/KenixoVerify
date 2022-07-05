const { Message, Client, MessageEmbed } = require("discord.js");
const db = require('../../model/warns');

module.exports = {
    name: "warn",
    aliases: [''],
    cooldown: 3,
    botPermissions: ["KICK_MEMBERS"],
    userPermissions: ["KICK_MEMBERS"],
    description: "To see warned member from the server",
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

        if(!target) return usembed(message, 'warn <user> <reason>', 'warn @user Badwords');

        if(target.roles.highest.position >= message.member.roles.highest.position) return errembed(message, `You can't warn the target because the target's role is higher!`);

        db.findOne({ Guild: message.guild.id, User: target.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    Guild: message.guild.id,
                    User: target.user.id,
                    Content: [
                        {
                            moderator: message.author.id,
                            reason: reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason: reason
                }
                data.Content.push(obj)
            }
            const embedDM = new MessageEmbed()
            .setTitle(`You has been warned from ${message.guild.name}`)
            .addField(`Moderator:`, `${message.author.id} (\`\`${message.author.tag}\`\`)`)
            .addField(`Date:`, `<t:${Math.round(Date.now() / 1000)}:D> (<t:${Math.round(Date.now() / 1000)}:R>)`)
            .addField(`Reason:`, `${reason}`)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
            await target.send({ embeds: [embedDM]} );
    
            const embed = new MessageEmbed()
            .setTitle(`${target.user.username}'s has been warned by ${message.author.username}'s`)
            .setDescription(`${reason}`)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
            message.reply({ embeds: [embed] })
            data.save()
        })
    },
};
