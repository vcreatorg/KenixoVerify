const { Message, Client, MessageEmbed } = require("discord.js");
const sourcebin = require("sourcebin_js");

module.exports = {
    name: "hastabin",
    aliases: ['sourcebin'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see create hastabinS",
    category: "Utility",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const content = args.join(" ");

        if(!content) return usembed(message, 'hastabin <code>', 'hastabin console.log("hello");')

        sourcebin
      .create([
        {
          title: "JavaScript code",
          description: 'This code was created in "' + message.createdAt + '"',
          name: "Made By " + message.author.username,
          content: content,
          languageId: "JavaScript"
        }
      ])
      .then(src => {
        const embed = new MessageEmbed()
        .setTitle('Hastabin')
        .addField(`Code:`, `\`\`\`javascript\n${content}\n\`\`\``, true)
        .addField(`Sourcebin:`, `[Click Here](${src.url})`, true)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})
        message.reply({ embeds: [embed] })
      })
      .catch(e => {
        errembed(message, 'Error, try again later')
      });
    },
};
