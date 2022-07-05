const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "fakemessage",
    aliases: [''],
    cooldown: 3,
    botPermissions: ["MANAGE_WEBHOOKS"],
    userPermissions: [""],
    description: "To see webhook message",
    category: "Fun",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.delete();
        const user = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])
        || message.member;
        const text = args.slice(1).join(" ")

        if(!user) return usembed(message, 'fakemessage <user> <message>', 'fakemessage @User Hello')
        if(!text) return usembed(message, 'fakemessage <user> <message>', 'fakemessage @User Hello')
        const webhook = await message.channel.createWebhook(user.displayName, {
            avatar: user.user.displayAvatarURL(),
            channel: message.channel.id
        });

        await webhook.send(text).then(() => {
            webhook.delete();
        });
    },
};
