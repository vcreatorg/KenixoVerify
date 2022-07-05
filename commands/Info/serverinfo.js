const { Message, Client, MessageEmbed } = require("discord.js");
const moment = require('moment');
const { time } = require('@discordjs/builders');
const { stripIndent } = require('common-tags');

module.exports = {
    name: "serverinfo",
    aliases: ['si','is','infoserver'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see server information",
    category: "Information",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const Server = message.guild;
        const Owner = await message.guild.fetchOwner();
    
        const Tmember = Server.members.cache.size;
        const User = Server.members.cache.filter(member => !member.user.bot).size;
        const Bots = Server.members.cache.filter(member => member.user.bot).size;
        
        const Text = Server.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size;
        const Voice = Server.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size;
        const Category = Server.channels.cache.filter(channel => channel.type === 'GUILD_CATEGORY').size;
        const Stage = Server.channels.cache.filter(channel => channel.type === 'GUILD_STAGE_VOICE').size;
        const Tchannel = Text + Voice + Category + Stage
    
        const Emoji = Server.emojis.cache.size;
        const Roles = Server.roles.cache.size;
        
        const createdate = Server.createdAt;
        const agocreatef = time(createdate, 'f');
        const agocreateR = time(createdate, 'R');

        const memberS = stripIndent`
        All     : ${Tmember.toLocaleString()}
        Humans  : ${User.toLocaleString()}
        Bots    : ${Bots.toLocaleString()}
        `;

        const channelS = stripIndent`
        All     : ${Tchannel.toLocaleString()}
        Text    : ${Text}
        Voice   : ${Voice}
        `;

        if(message.guild.description === null) {
            const embed = new MessageEmbed()
            .setTitle(`${Server.name} Server Information`)
            .addField(`ID:`, `${Server.id}`, true)
            .addField(`Owner:`, `<@${Owner.id}>(\`\`${Owner.user.tag}\`\`)`, true)
            .addField(`Members:`, `\`\`\`css\n${memberS}\n\`\`\``)
            .addField(`Channels:`, `\`\`\`css\n${channelS}\n\`\`\``)
            .addField(`Total Emojis:`, `${Emoji.toLocaleString()}`, true)
            .addField(`Total Roles:`, `${Roles.toLocaleString()}`, true)
            .addField(`Created At:`, `${agocreatef} (${agocreateR})`)
            .setThumbnail(Server.iconURL())
            .setImage(message.guild.bannerURL({ size: 1024 }))
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
    
            message.reply({ embeds: [embed]})
        } else {
            const embed = new MessageEmbed()
            .setTitle(`${Server.name} Server Information`)
            .setDescription(message.guild.description)
            .addField(`ID:`, `${Server.id}`, true)
            .addField(`Owner:`, `<@${Owner.id}>(\`\`${Owner.user.tag}\`\`)`, true)
            .addField(`Members:`, `- All: ${Tmember.toLocaleString()}\n- Human: ${User.toLocaleString()}\n- Bots: ${Bots.toLocaleString()}`)
            .addField(`Channels:`, `- All: ${Tchannel.toLocaleString()}\n- Text: ${Text}\n- Voice: ${Voice}`)
            .addField(`Total Emojis:`, `${Emoji.toLocaleString()}`, true)
            .addField(`Total Roles:`, `${Roles.toLocaleString()}`, true)
            .addField(`Created At:`, `${agocreatef} (${agocreateR})`)
            .setThumbnail(Server.iconURL())
            .setImage(message.guild.bannerURL({ size: 1024 }))
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
    
            message.reply({ embeds: [embed]})
        }
    },
};
