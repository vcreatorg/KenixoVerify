const client = require("../index");
const { MessageEmbed, Collection, MessageActionRow, MessageButton } = require("discord.js");
const cooldowns = new Map();
const prefix = require('../model/prefix.js');
const antiscam = require('../model/antiscam.js');
const antiinvite = require('../model/antiinvite.js');

client.prefix = async function(message) {

    let custom;

    const data = await prefix.findOne({
        GuildID: message.guildId
    });

    if(data) {
        custom = data.Prefix;
    } else {
        custom = "?";
    }
    return custom;
}

client.on("messageCreate", async (message) => {
    const prefix = await client.prefix(message);
    const array = require(`../scam.json`)

    antiscam.findOne({ GuildID: message.guild.id }, async (err, data) => {
        if(!data) return;
        
        if(data.Toggle === true) {
            if (array.some(word => message.content.toLowerCase().includes(word))) {
                message.delete()
            }
        }
    })

    const links = ["discord.gg/", "discord.com/invite/","discord.io"];
    antiinvite.findOne({ GuildID: message.guild.id }, async (err, data) => {
        if(!data) return;
        
        if(data.Toggle === true) {
            for(const link of links) {
                if(!message.content.includes(link)) return;
                const code = message.content.split(link)[1].split(" ")[0];
                const isGuildInvite = message.guild.invites.cache.has(code);

                if(!isGuildInvite) {
                    try {
                        const vanity = await message.guild.fetchVanityData();
                        if(code !== vanity?.code) return message.delete();
                    } catch(err) {
                        message.delete();
                    }
                }
            }
        }
    })

    if (message.content.includes("@here")  || message.content.includes("@everyone") || message.type == "REPLY") return false;

    if (message.mentions.has(client.user.id)) {
        message.channel.send(`> Hello ${message.author.username}'s, my prefix on this server is \`\`${prefix}\`\`, view command \`\`${prefix}help\`\``);
    }

    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!message.member.permissions.has(command.userPermissions || [])) {
        const userPermissions = new MessageEmbed()
        .setTitle('<:close:952896320341934140> | Failed to execute command:')
        .setDescription(`You don't have \`\` ${command.userPermissions.join(", ").replace(/\_/g, " ")} \`\` permission`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})

        return message.reply({ embeds: [userPermissions] })
    }
    
    if (!message.guild.me.permissions.has(command.botPermissions || [])) {
        const botPermissions = new MessageEmbed()
        .setTitle('<:close:952896320341934140> | Failed to execute command:')
        .setDescription(`I don't have \`\` ${command.botPermissions.join(", ").replace(/\_/g, " ")} \`\` permission`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})

        return message.reply({ embeds: [botPermissions] })   
    }

    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    if(time_stamps.has(message.author.id)){
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if(current_time < expiration_time){
            const time_left = (expiration_time - current_time) / 1000;

            const commandCooldown = new MessageEmbed()
            .setTitle('<:close:952896320341934140> | Failed to execute command:')
            .setDescription(`Please wait **__${time_left.toFixed(1)}__** more seconds before using \`\`${prefix}${command.name}\`\``)
            .setColor("RED")
            .setTimestamp()
            .setFooter({ text: `${client.config.footer}`})
            return message.reply({ embeds: [commandCooldown]})
        }
    }

    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    if (!command) return;
    await command.run(client, message, args);

    const embedCL = new MessageEmbed()
    .setTitle(`Command Logs`)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField(`Command name:`, `${message.content}`)
    .addField(`Used by:`, `${message.author.id}(\`\`${message.author.tag}\`\`)`)
    .addField(`From server:`, `${message.guild.name}`)
    .setColor("#2F3136")
    .setFooter({ text: `${client.config.footer}`})
    client.channels.cache.get("949983727948267560").send({ embeds: [embedCL] });
});
