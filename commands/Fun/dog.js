const { Message, Client, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "dog",
    aliases: [''],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see send random dog image",
    category: "Fun",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        fetch('https://nekos.life/api/v2/img/woof')
        .then(response => response.json())
        .then(async (r) => {
            const embed = new MessageEmbed()
            .setImage(`${r.url}`)
            .setTitle(`Random Dog Image`)
            .setURL(`${r.url}`)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})

            const row = new MessageActionRow()
            .addComponents([
            new MessageButton().setLabel("Next").setStyle("SECONDARY").setCustomId(`nextd`)
            ])

            const msg = await message.reply({ embeds: [embed], components: [row]})

            const filter = (i) => {
                if (i.user.id === message.author.id) return true;
                 return i.reply({
                      content: "Only the owner of these buttons can use them",
                      ephemeral: true,
                });
            }

            const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 });

            collector.on('collect', async i => {

                if (i.customId == 'nextd') {
                    await fetch('https://nekos.life/api/v2/img/woof')
                    .then(response => response.json())
                    .then((p) => {
                        const embed = new MessageEmbed()
                        .setImage(`${p.url}`)
                        .setTitle(`Random Dog Image`)
                        .setURL(`${p.url}`)
                        .setColor("#2F3136")
                        .setFooter({ text: `${client.config.footer}`})
                        i.update({ embeds: [embed]})
                    })
                }
    
            })

            collector.on("end", (_, reason) => {
                if (reason !== "messageDelete") {
                    const disablerow = new MessageActionRow()
                    .addComponents([
                    new MessageButton().setLabel("Next").setStyle("SECONDARY").setCustomId(`nextd`).setDisabled(true)
                    ])

                    const embed = new MessageEmbed()
                    .setImage(`${r.url}`)
                    .setTitle(`Random Dog Image`)
                    .setURL(`${r.url}`)
                    .setColor("#2F3136")
                    .setFooter({ text: `${client.config.footer}`})
                    msg.edit({ embeds: [embed], components: [disablerow] })
                }
            });
        })
    },
};
