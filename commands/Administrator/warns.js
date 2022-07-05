const { Message, Client, MessageEmbed } = require("discord.js");
const db = require('../../model/warns');

module.exports = {
    name: "warns",
    aliases: [''],
    cooldown: 3,
    botPermissions: ["KICK_MEMBERS"],
    userPermissions: ["KICK_MEMBERS"],
    description: "To see total warned member from the server",
    category: "Administrator",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!target) return useEmbed(message, 'wanrs <user>', 'warns @user');

        if(target.roles.highest.position >= message.member.roles.highest.position) return errEmbed(message, `You can't view warns the target because the target's role is higher!`);

        db.findOne({ Guild: message.guild.id, User: target.user.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                const str =  data.Content.map((w, i) => `\`\`${i + 1}\`\` | **Moderator:** \`\`${message.guild.members.cache.get(w.moderator).user.tag}\`\`\n**Reason:** \`\`${w.reason}\`\``).join('\n');
                const embedWarn = new MessageEmbed()
                .setTitle(`${target.user.username}'s warns`)
                .setDescription(`${str}`)
                .setColor("#2F3136")
                .setFooter({ text: `${client.config.footer}`})
                message.reply({ embeds: [embedWarn] });
            } else {
                return errembed(message, 'This user has no warnings');
            }
        });
    },
};
