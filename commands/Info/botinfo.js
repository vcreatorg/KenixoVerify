const { Message, Client, MessageEmbed } = require("discord.js");
const { time } = require('@discordjs/builders');
const { mem, cpu, os } = require('node-os-utils');
const Discord = require("discord.js");
const { stripIndent } = require('common-tags');

module.exports = {
    name: "botinfo",
    aliases: ['bi','stats','infobot','ib'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see bot information",
    category: "Information",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const { totalMemMb, usedMemMb } = await mem.info();
        const createdate = client.user.createdAt;
        const agocreatef = time(createdate, 'f');
        const agocreateR = time(createdate, 'R');


        const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   
        function formatBytes(x){
        
          let l = 0, n = parseInt(x, 10) || 0;
        
          while(n >= 1024 && ++l){
              n = n/1024;
          }
          
          return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
        }

        /*
        const clientS = stripIndent`
        Servers    : ${client.guilds.cache.size.toLocaleString()}
        Channels   : ${client.channels.cache.size.toLocaleString()}
        Users      : ${client.users.cache.size.toLocaleString()}
        Commands   : ${message.client.commands.size.toLocaleString()}
        `;*/

        const  serverS = stripIndent`
        OS         : ${await os.oos()}
        Cores      : ${cpu.count()}
        CPU Usage  : ${await cpu.usage()}%
        RAM        : ${totalMemMb} MB
        RAM Usage  : ${usedMemMb} MB
        `;

        const embed = new MessageEmbed()
        .setTitle(`Bot Information`)
        .addField(`Name:`, `${client.user.username}`, true)
        .addField(`ID:`, `${client.user.id}`, true)
        .addField(`Server:`, `\`\`\`css\n${serverS}\n\`\`\``)
        .addField(`Created At:`, `${agocreatef} (${agocreateR})`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})

        message.reply({ embeds: [embed] })
    },
};
