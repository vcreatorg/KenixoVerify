const { Message, Client, MessageEmbed } = require("discord.js");
const { time } = require('@discordjs/builders');
const axios = require("axios")

module.exports = {
    name: "userinfo",
    aliases: ['ui','iu','infouser','whois'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see user information",
    category: "Information",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const user = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])
        || message.member;

        let nickname = user ? user.displayName : `None`;

        if (nickname === user.user.username) {
            nickname = `None`
        }

        const createdate = user.user.createdAt;
        const joindate = user.joinedAt;
        const agocreatef = time(createdate, 'f');
        const agocreateR = time(createdate, 'R');
        const agojoinf = time(joindate, 'f');
        const agojoinR = time(joindate, 'R');

        axios.get(`https://discord.com/api/users/${user.user.id}`, {
                headers: {
                Authorization: `Bot ${client.config.token}`
            },
        })
        .then((res) => {
            const { banner, accent_color } = res.data;
            if(banner) {
                const extension = banner.startsWith("a_") ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/banners/${user.user.id}/${banner}${extension}?size=2048`;
                const embed = new MessageEmbed()
                .setTitle(`User Information`)
                .addField(`Name:`, `${user.user.username} (\`\`#${user.user.discriminator}\`\`)`, true)
                .addField(`ID:`, `${user.user.id}`, true)
                .addField(`Nickname:`, `${nickname}`)
                .addField(`Created At:`, `${agocreatef} (${agocreateR})`)
                .addField(`Joined At:`, `${agojoinf} (${agojoinR})`)
                .setImage(url)
                .setThumbnail(user.user.displayAvatarURL({ dynamic: true} ))
                .setColor("#2F3136")
                .setFooter({ text: `${client.config.footer}`})

                message.reply({ embeds: [embed] })
            } else {
                if(accent_color) {
                    const embed = new MessageEmbed()
                    .setTitle(`User Information`)
                    .addField(`Name:`, `${user.user.username} (\`\`#${user.user.discriminator}\`\`)`, true)
                    .addField(`ID:`, `${user.user.id}`, true)
                    .addField(`Nickname:`, `${nickname}`)
                    .addField(`Created At:`, `${agocreatef} (${agocreateR})`)
                    .addField(`Joined At:`, `${agojoinf} (${agojoinR})`)
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true} ))
                    .setColor("#2F3136")
                    .setFooter({ text: `${client.config.footer}`})
    
                    message.reply({ embeds: [embed] })
                } else {
                    const embed = new MessageEmbed()
                    .setTitle(`User Information`)
                    .addField(`Name:`, `${user.user.username} (\`\`#${user.user.discriminator}\`\`)`, true)
                    .addField(`ID:`, `${user.user.id}`, true)
                    .addField(`Nickname:`, `${nickname}`)
                    .addField(`Created At:`, `${agocreatef} (${agocreateR})`)
                    .addField(`Joined At:`, `${agojoinf} (${agojoinR})`)
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true} ))
                    .setColor("#2F3136")
                    .setFooter({ text: `${client.config.footer}`})
    
                    message.reply({ embeds: [embed] })
                }
            }
        })
    },
};
