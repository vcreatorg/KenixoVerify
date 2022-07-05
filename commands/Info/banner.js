const { Message, Client, MessageEmbed } = require("discord.js");
const axios = require("axios")

module.exports = {
    name: "banner",
    aliases: ['bnn','bann','bannerinfo'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see banner user",
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
                message.reply(`**${user.user.username}'s Banner**\n${url}`)
            } else {
                errembed(message, `User don't have banner image / gif`)
            }
        })
    },
};
