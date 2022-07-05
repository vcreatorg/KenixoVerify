const client = require("../index");
const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { time } = require('@discordjs/builders');

client.on("guildCreate", async (guild, message) => {
    const Owner = await guild.fetchOwner();
    const createdAt = guild.createdAt;
    const agocreatef = time(createdAt, 'f');
    const agocreateR = time(createdAt, 'R');

    const embedJ = new MessageEmbed()
    .setTitle(`${guild.name}`)
    .addField(`Owner:`, `${Owner.user.tag}`, true)
    .addField(`Members:`, `${guild.memberCount.toLocaleString()}`, true)
    .addField(`Created At:`, `${agocreatef} (${agocreateR})`, true)
    .setColor("#2F3136")
    .setThumbnail(guild.iconURL({ dynamic: true}))
    client.channels.cache.get("934103733648887849").send({ embeds: [embedJ] });
});
