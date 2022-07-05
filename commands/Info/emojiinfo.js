const { Message, Client, MessageEmbed } = require("discord.js");
const { time } = require('@discordjs/builders');

module.exports = {
    name: "emojiinfo",
    aliases: ['ei','infoemoji','emoji'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see emoji information",
    category: "Information",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const regex = args[0].replace(/^<a?:\w+:(\d+)>$/, "$1")
        const emoji = message.guild.emojis.cache.find((emoji) => emoji.name === args.join(" ") || emoji.id === regex)
        const yesno = {
            true: "Yes",
            false: "No"
        }

        if (!emoji) return usembed(message, 'emojiinfo <emoji>', 'emojiinfo <:check:951756996934238278>')

        try {
            const createdate = emoji.createdAt;
            const agocreatef = time(createdate, 'f');
            const agocreateR = time(createdate, 'R');

            const embed = new MessageEmbed()
            .setTitle(`Emoji Information`)
            .addField(`Name:`, `${emoji.name}`, true)
            .addField(`ID:`, `${emoji.id}`, true)
            .addField(`Animated:`, `${yesno[emoji.animated]}`)
            .addField(`Added By:`, `${(await emoji.fetchAuthor()).id} (\`\`${(await emoji.fetchAuthor()).tag}\`\`)`)
            .addField(`Added At:`, `${agocreatef} (${agocreateR})`)
            .setThumbnail(emoji.url)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})

            message.reply({ embeds: [embed] })
        } catch {
            errembed(message, 'Emoji not found!')
        }
    },
};
