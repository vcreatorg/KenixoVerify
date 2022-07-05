const { Message, Client, MessageEmbed } = require("discord.js");
const prefixModel = require("../../model/prefix") //path of prefix model

module.exports = {
    name: "setprefix",
    aliases: ['sp','prefix'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: ["ADMINISTRATOR"],
    description: "To see change prefix this bot on server",
    category: "Administrator",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const prefix = await client.prefix(message);

        const data = await prefixModel.findOne({
            GuildID: message.guild.id
        });

        if(!args[0]) return usembed(message, 'setprefix <symbol>', 'setprefix !')
        if((args[0]) === "?") return errmbed(message, `Why don't you reset your prefix?, use \`\`${prefix}resetprefix\`\``)
        if (args[0].length > 5) return errembed(message, `Your new prefix must be under \`5\` characters!`);
      
        if (data) {
            await prefixModel.findOneAndRemove({
                GuildID: message.guild.id
            })
            
            const embed1 = new MessageEmbed()
            .setTitle(`Successfuly change bot prefix`)
            .setDescription(`The new prefix is now \`\`${args[0]}\`\``)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
    
            message.reply({ embeds: [embed1] })

            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        } else if (!data) {
            const embed2 = new MessageEmbed()
            .setTitle(`Successfuly change bot prefix`)
            .setDescription(`The new prefix is now \`\`${args[0]}\`\``)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
    
            message.reply({ embeds: [embed2] })

            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        }
    },
};
