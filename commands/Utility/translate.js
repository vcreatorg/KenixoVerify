const { Message, Client, MessageEmbed } = require("discord.js");
const translate = require("@iamtraction/google-translate");

module.exports = {
    name: "translate",
    aliases: ['trans','ts'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see translate",
    category: "Utility",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const query = args.slice(1).join(" ")
        if(!args[0]) return usembed(message, 'translate <language> <text>', 'translate en Halo kamu siapa')
        if(!query) return usembed(message, 'translate <language> <text>', 'translate en Halo kamu siapa')

        try {
            const translated = await translate(query, {to: args[0] });
            const embedT = new MessageEmbed()
            .setTitle('Google Translate')
            .setDescription(`${translated.text}`)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
    
            message.reply({ embeds: [embedT] })
        } catch {
            return errembed(message, `The language \`\`${args[0]}\`\` is not supported`)
        }
    },
};
