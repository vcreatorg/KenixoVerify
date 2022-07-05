const { Message, Client, MessageEmbed } = require("discord.js");
const query = require('samp-query')
const usesamp = require("../../model/usesamp.js");
const { getBorderCharacters, table } = require('table');

module.exports = {
    name: "samp",
    aliases: ['samp-server', 'samp-list'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see information SA:MP server",
    category: "SA:MP",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
            const split = args.join(" ").split(":");
            const prefix = await client.prefix(message);
            if(!split[0]) return usembed(message, 'samp <address>', 'samp 127.0.0.1:7777')
            if(!split[1]) return usembed(message, 'samp <address>', 'samp 127.0.0.1:7777')

            var options = {
                host: split[0],
                port: split[1]
            }

            usesamp.findOne({ GuildID: message.guild.id }, async (err, data) => {
                if(data) {
                    if(data.Toggle === true) {
                        return errembed(message, `Command \`\`${prefix}samp\`\` on this server is not allowed`);
                    } else {
                        query(options, function (error, response) {
                            if(error) {
                                console.log(error)
                                return errembed(message, `Unable to connect to  (\`\`${split[0]}:${split[1]}\`\`). Please check again the server ip and port`)
                            } else {

                                const yesno = {
                                    true: "Yes",
                                    false: "No"
                                }
                
                                const config = {
                                    border: getBorderCharacters(`void`),
                                    columnDefault: {
                                        paddingLeft: 0,
                                        paddingRight: 2
                                    },
                                    drawHorizontalLine: () => {
                                        return false
                                    }
                                }

                                const pOnline = response["players"];
                                let players = [];
                                    pOnline.forEach((player) => {
                                    players.push([player.id, player.name, player.score, player.ping]);
                                });
        
                                let output, output2;
                                const inGame = players.slice(0, 10)
                                if (inGame.length === 0) {
                                    output = ``
                                }
                                else output = table(inGame, config);
                                if (output.length > 1024) output2 = pOnline.map((player) => player.name).join(', ');
        
                                if(inGame.length < 10) {
                                    if(response.rules.weburl.includes('https://')) {
                                        const embed = new MessageEmbed()
                                        .setTitle(response.hostname)
                                        .setThumbnail('https://i.imgur.com/QYeGxrV.png')
                                        .addField(`Gamemode:`, `${response.gamemode || `-`}`, true)
                                        .addField(`Online:`, `${response.online} / ${response.maxplayers}`, true)
                                        .addField(`Passworded:`, `${yesno[response.passworded]}`, true)
                                        .addField(`Map Name:`, `${response.rules.mapname || `-`}`, true)
                                        .addField(`Version:`, `${response.rules.version || `-`}`, true)
                                        .addField(`World Time:`, `${response.rules.worldtime}`, true)
                                        .addField(`Weather:`, `${response.rules.weather}`, true)
                                        .addField(`Lagcomp:`, `${yesno[response.rules.lagcomp || `-`]}`, true)
                                        .addField(`Website:`, `${response.rules.weburl || `-`}`, true)
                                        .setColor("#2F3136")
                                        .setFooter({ text: `${client.config.footer}`})
                                        message.reply({ embeds: [embed] })
                                    } else {
                                        const web = `[${response.rules.weburl}](https://${response.rules.weburl})`; 
                                        const embed = new MessageEmbed()
                                        .setTitle(response.hostname)
                                        .setThumbnail('https://i.imgur.com/QYeGxrV.png')
                                        .addField(`Gamemode:`, `${response.gamemode || `-`}`, true)
                                        .addField(`Online:`, `${response.online} / ${response.maxplayers}`, true)
                                        .addField(`Passworded:`, `${yesno[response.passworded]}`, true)
                                        .addField(`Map Name:`, `${response.rules.mapname || `-`}`, true)
                                        .addField(`Version:`, `${response.rules.version || `-`}`, true)
                                        .addField(`World Time:`, `${response.rules.worldtime}`, true)
                                        .addField(`Weather:`, `${response.rules.weather}`, true)
                                        .addField(`Lagcomp:`, `${yesno[response.rules.lagcomp || `-`]}`, true)
                                        .addField(`Website:`, `${web || `-`}`, true)
                                        .setColor("#2F3136")
                                        .setFooter({ text: `${client.config.footer}`})
                                        message.reply({ embeds: [embed] })
                                    }
                                } else {
                                    if(response.rules.weburl.includes('https://')) {
                                        const embed = new MessageEmbed()
                                        .setTitle(response.hostname)
                                        .setThumbnail('https://i.imgur.com/QYeGxrV.png')
                                        .addField(`Gamemode:`, `${response.gamemode || `-`}`, true)
                                        .addField(`Online:`, `${response.online} / ${response.maxplayers}`, true)
                                        .addField(`Passworded:`, `${yesno[response.passworded]}`, true)
                                        .addField(`Map Name:`, `${response.rules.mapname || `-`}`, true)
                                        .addField(`Version:`, `${response.rules.version || `-`}`, true)
                                        .addField(`World Time:`, `${response.rules.worldtime}`, true)
                                        .addField(`Weather:`, `${response.rules.weather}`, true)
                                        .addField(`Lagcomp:`, `${yesno[response.rules.lagcomp || `-`]}`, true)
                                        .addField(`Website:`, `${response.rules.weburl || `-`}`, true)
                                        .addField(`Only show 10 players:`, `\`\`\`\n${output}\n\`\`\``)
                                        .setColor("#2F3136")
                                        .setFooter({ text: `${client.config.footer}`})
                                        message.reply({ embeds: [embed] })
                                    } else {
                                        const web = `[${response.rules.weburl}](https://${response.rules.weburl})`; 
                                        const embed = new MessageEmbed()
                                        .setTitle(response.hostname)
                                        .setThumbnail('https://i.imgur.com/QYeGxrV.png')
                                        .addField(`Gamemode:`, `${response.gamemode || `-`}`, true)
                                        .addField(`Online:`, `${response.online} / ${response.maxplayers}`, true)
                                        .addField(`Passworded:`, `${yesno[response.passworded]}`, true)
                                        .addField(`Map Name:`, `${response.rules.mapname || `-`}`, true)
                                        .addField(`Version:`, `${response.rules.version || `-`}`, true)
                                        .addField(`World Time:`, `${response.rules.worldtime}`, true)
                                        .addField(`Weather:`, `${response.rules.weather}`, true)
                                        .addField(`Lagcomp:`, `${yesno[response.rules.lagcomp || `-`]}`, true)
                                        .addField(`Website:`, `${web || `-`}`, true)
                                        .addField(`Only show 10 players:`, `\`\`\`\n${output}\n\`\`\``)
                                        .setColor("#2F3136")
                                        .setFooter({ text: `${client.config.footer}`})
                                        message.reply({ embeds: [embed] })
                                    }
                                }
                            }
                        });
                    }
                } else {
                    const yesno = {
                        true: "Yes",
                        false: "No"
                    }
        
                    const config = {
                        border: getBorderCharacters(`void`),
                        columnDefault: {
                            paddingLeft: 0,
                            paddingRight: 2
                        },
                        drawHorizontalLine: () => {
                            return false
                        }
                    }
        
                    query(options, function (error, response) {
                        if(error) {
                            console.log(error)
                            return errembed(message, `Unable to connect to  (\`\`${split[0]}:${split[1]}\`\`). Please check again the server ip and port`)
                        } else {
                            const pOnline = response["players"];
                            let players = [];
                                pOnline.forEach((player) => {
                                players.push([player.id, player.name, player.score, player.ping]);
                            });
        
                            let output, output2;
                            const inGame = players.slice(0, 10)
                            if (inGame.length === 0) {
                                output = `Unable to retrieve player data greater than 100`
                            }
                            else output = table(inGame, config);
                            if (output.length > 1024) output2 = pOnline.map((player) => player.name).join(', ');
        
                            if(inGame.length < 10) {
                                if(response.rules.weburl.includes('https://')) {
                                    const embed = new MessageEmbed()
                                    .setTitle(response.hostname)
                                    .setThumbnail('https://i.imgur.com/QYeGxrV.png')
                                    .addField(`Gamemode:`, `${response.gamemode || `-`}`, true)
                                    .addField(`Online:`, `${response.online} / ${response.maxplayers}`, true)
                                    .addField(`Passworded:`, `${yesno[response.passworded]}`, true)
                                    .addField(`Map Name:`, `${response.rules.mapname || `-`}`, true)
                                    .addField(`Version:`, `${response.rules.version || `-`}`, true)
                                    .addField(`World Time:`, `${response.rules.worldtime}`, true)
                                    .addField(`Weather:`, `${response.rules.weather}`, true)
                                    .addField(`Lagcomp:`, `${yesno[response.rules.lagcomp || `-`]}`, true)
                                    .addField(`Website:`, `${response.rules.weburl || `-`}`, true)
                                    .setColor("#2F3136")
                                    .setFooter({ text: `${client.config.footer}`})
                                    message.reply({ embeds: [embed] })
                                } else {
                                    const web = `[${response.rules.weburl}](https://${response.rules.weburl})`; 
                                    const embed = new MessageEmbed()
                                    .setTitle(response.hostname)
                                    .setThumbnail('https://i.imgur.com/QYeGxrV.png')
                                    .addField(`Gamemode:`, `${response.gamemode || `-`}`, true)
                                    .addField(`Online:`, `${response.online} / ${response.maxplayers}`, true)
                                    .addField(`Passworded:`, `${yesno[response.passworded]}`, true)
                                    .addField(`Map Name:`, `${response.rules.mapname || `-`}`, true)
                                    .addField(`Version:`, `${response.rules.version || `-`}`, true)
                                    .addField(`World Time:`, `${response.rules.worldtime}`, true)
                                    .addField(`Weather:`, `${response.rules.weather}`, true)
                                    .addField(`Lagcomp:`, `${yesno[response.rules.lagcomp || `-`]}`, true)
                                    .addField(`Website:`, `${web || `-`}`, true)
                                    .setColor("#2F3136")
                                    .setFooter({ text: `${client.config.footer}`})
                                    message.reply({ embeds: [embed] })
                                }
                            } else if(inGame.length > 9) {
                                if(response.rules.weburl.includes('https://')) {
                                    const embed = new MessageEmbed()
                                    .setTitle(response.hostname)
                                    .setThumbnail('https://i.imgur.com/QYeGxrV.png')
                                    .addField(`Gamemode:`, `${response.gamemode || `-`}`, true)
                                    .addField(`Online:`, `${response.online} / ${response.maxplayers}`, true)
                                    .addField(`Passworded:`, `${yesno[response.passworded]}`, true)
                                    .addField(`Map Name:`, `${response.rules.mapname || `-`}`, true)
                                    .addField(`Version:`, `${response.rules.version || `-`}`, true)
                                    .addField(`World Time:`, `${response.rules.worldtime}`, true)
                                    .addField(`Weather:`, `${response.rules.weather}`, true)
                                    .addField(`Lagcomp:`, `${yesno[response.rules.lagcomp || `-`]}`, true)
                                    .addField(`Website:`, `${response.rules.weburl || `-`}`, true)
                                    .addField(`Only show 10 players:`, `\`\`\`\n[ID]  [NAME]  [SCORE]  [PING]\n\n${output}\n\`\`\``)
                                    .setColor("#2F3136")
                                    .setFooter({ text: `${client.config.footer}`})
                                    message.reply({ embeds: [embed] })
                                } else {
                                    const web = `[${response.rules.weburl}](https://${response.rules.weburl})`; 
                                    const embed = new MessageEmbed()
                                    .setTitle(response.hostname)
                                    .setThumbnail('https://i.imgur.com/QYeGxrV.png')
                                    .addField(`Gamemode:`, `${response.gamemode || `-`}`, true)
                                    .addField(`Online:`, `${response.online} / ${response.maxplayers}`, true)
                                    .addField(`Passworded:`, `${yesno[response.passworded]}`, true)
                                    .addField(`Map Name:`, `${response.rules.mapname || `-`}`, true)
                                    .addField(`Version:`, `${response.rules.version || `-`}`, true)
                                    .addField(`World Time:`, `${response.rules.worldtime}`, true)
                                    .addField(`Weather:`, `${response.rules.weather}`, true)
                                    .addField(`Lagcomp:`, `${yesno[response.rules.lagcomp || `-`]}`, true)
                                    .addField(`Website:`, `${web || `-`}`, true)
                                    .addField(`Only show 10 players:`, `\`\`\`\n[ID]  [NAME]  [SCORE]  [PING]\n\n${output}\n\`\`\``)
                                    .setColor("#2F3136")
                                    .setFooter({ text: `${client.config.footer}`})
                                    message.reply({ embeds: [embed] })
                                }
                            }
                        }
                    });
                }
            })
        } catch (error) {
            console.log(error)
        }
    },
};
