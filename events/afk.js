const client = require("../index");
const afk = require('../model/afk.js');
const { MessageEmbed } = require('discord.js');

client.on("messageCreate", async (message) => {
    if(message.author.bot) return;

    const checkafk = await afk.findOne({Guild: message.guild.id, User: message.author.id})
    if(checkafk) {
        checkafk.delete();
        const embed = new MessageEmbed()
        .setTitle('AFK Checking')
        .setDescription(`\`\`${message.author.tag}\`\` You are no longer AFK!`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})
        return message.reply({ embeds: [embed]})
    }

    const mentionedUser = message.mentions.users.first();
    if(mentionedUser) {
        const params = {
            Guild: message.guild.id,
            User: mentionedUser.id
        }
        const data = await afk.findOne(params)

        if(data) {
            const embed = new MessageEmbed()
            .setTitle(`${mentionedUser.tag} is currently AFK!`)
            .addField(`Since:`, `<t:${Math.round(data.Date / 1000)}:R>`, true)
            .addField(`Reason:`, `${data.Reason}`, true)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`}) 
            message.reply({embeds: [embed]})
        }
    }
});