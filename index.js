const { Client, Collection, MessageEmbed } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");


errembed = (message, argument) => {
    const erembed = new MessageEmbed()
    .setTitle('<:close:952896320341934140> | Failed to execute command:')
    .setDescription(`${argument}`)
    .setColor("#2F3136")
    .setFooter({ text: `Kenixo © 2022 • ${client.config.version}`})

    return message.reply({ embeds: [erembed]})
}

usembed = async (message, args1, args2) => {
    const prefix = await client.prefix(message);
    const embed = new MessageEmbed()
    .setTitle('How to use commands:')
    .addField(`Usage:`,`${prefix}${args1}`)
    .addField(`Example:`, `${prefix}${args2}`, true)
    .setColor("#2F3136")
    .setFooter({ text: `Kenixo © 2022 • ${client.config.version}`})

    return message.reply({ embeds: [embed]})
}

esend = async (message, args) => {
    const embed = new MessageEmbed()
    .setDescription(args)
    .setColor("#2F3136")
    .setFooter({ text: `Kenixo © 2022 • ${client.config.version}`})

    return message.reply({ embeds: [embed] })
}

// Initializing the project
require("./handler")(client);

client.login(client.config.token);
