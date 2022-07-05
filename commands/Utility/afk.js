const { Message, Client, MessageEmbed } = require("discord.js");
const afk = require('../../model/afk.js');

module.exports = {
    name: "afk",
    aliases: ['alt'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see afk",
    category: "Utility",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const reason = args.join(" ") || 'No Reason Provided';
    
        afk.findOne({Guild: message.guild.id, User: message.author.id}, async(err, data) => {
            if(data) {
                console.log(err);
            } else {
                new afk({
                    Guild: message.guild.id,
                    User: message.author.id,
                    Reason: reason,
                    Date: Date.now()
                }).save();
                
                const embed = new MessageEmbed()
                .setTitle('Successfuly setting to AFK')
                .setDescription(`You are now AFK for: __${reason}__`)
                .setColor("#2F3136")
                .setFooter({ text: `${client.config.footer}`})

                await message.reply({ embeds: [embed] })
            }
        })
    },
};
