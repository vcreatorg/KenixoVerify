const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const samp = require("../../model/samp.js");
const query = require('samp-query');
const { getBorderCharacters, table } = require('table');
const paginationEmbed = require('../../pagination.js');

module.exports = {
    name: "players",
    aliases: ['online','ingame','player'],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see players in game SA:MP server with setup address",
    category: "SA:MP",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const data = await samp.findOne({ Guild: message.guild.id });
      
        const prefix = await client.prefix(message);
        if(!data) return errembed(message, `The server address has not been added yet! type \`\`${prefix}setip\`\``);
        
        var options = {
          host: data.Ip,
          port: data.Port
        }
              
        query(options, function (error, response) {
            if(error) {
              console.log(error)
              return errembed(message, `Unable to connect to server / server offline. Please check again the server ip and port`)
            } else {
              if(response.online === 0) return errembed(message, 'No players in the game')
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
  
              let embed = {}
              let embedslist = []
  
              var i, j, temporary, chunk = 10;
              for (i = 0, j = response.online; i < j; i += chunk) {
                let output, output2;
                const inGame = players.slice(i, i + chunk)
                if (inGame.length === 0) {
                  output = `Unable to retrieve player data greater than 100`
                }
                else output = table(inGame, config);
                if (output.length > 1024) output2 = pOnline.map((player) => player.name).join(', ');
  
                embed[`${i / 10}`] = new MessageEmbed()
                .setTitle(`${response.hostname}`)
                .setThumbnail('https://i.imgur.com/QYeGxrV.png')
                .setDescription(`**Online:** ${response.online}/${response.maxplayers}\n\`\`\`\n[ID]  [NICKNAME]  [SCORE]  [PING]  \n\n${output}\n\`\`\``)
                .setColor("#2F3136")
              }
              for (let i = 0; i < (Object.keys(embed).length); i++) {
                embedslist.push(embed[i])
              }
  
              const button1 = new MessageButton()
              .setCustomId('previousbtn')
              .setEmoji('⏪')
              .setStyle('SECONDARY');
      
              const button2 = new MessageButton()
              .setCustomId('nextbtn')
              .setEmoji('⏩')
              .setStyle('SECONDARY');
  
              buttonList = [ button1, button2 ]
              paginationEmbed(message, embedslist, buttonList, 30000);
            }
        })
    },
};
