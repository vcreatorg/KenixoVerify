const { Message, Client, MessageEmbed } = require("discord.js");
const { owner } = require("../../config.json");

module.exports = {
    name: "msg",
    aliases: ['send','message','dm'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see dm users",
    category: "General",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const text = args.slice(1).join(" ");
        const data = message.attachments.first() ? message.attachments.first().proxyURL : null;
        const user = message.mentions.members.first()
        || message.guild.members.cache.get(args[0])
        || message.member
        || client.users.fetch(user);

        if(!user) return usembed(message, 'msg <userid/mention> <text>', 'msg 887525755267973121 Hello')
        if(!text) return usembed(message, 'msg <userid/mention> <text>', 'msg 887525755267973121 Hello')

        if(message.author.id === `${owner}`) {
            try {
                if(data) {
                    user.send(text)
                    user.send(data)
                } else {
                    user.send(text)
                }
            } catch {
                return errembed(message, `Can't send message to this user!`)
            }
        } else {
            return errembed(message, 'Only owner this bot to use this command!')
        }
    },
};
