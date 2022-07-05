const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "nuke",
    aliases: ['nk'],
    cooldown: 3,
    botPermissions: ["MANAGE_CHANNELS"],
    userPermissions: ["MANAGE_CHANNELS","MANAGE_SERVER"],
    description: "To see nuke channel for create & delete channel with same name",
    category: "Administrator",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let nukeButton = new MessageActionRow().addComponents(
            new MessageButton().setCustomId("YES").setStyle("SUCCESS").setLabel("Yes"),
      
            new MessageButton().setCustomId("NO").setStyle("DANGER").setLabel("No")
          );

        const embedN = new MessageEmbed()
        .setTitle('Confirmation')
        .setDescription(`> **Are you sure nuke this channel?** sure click this buttons!`)
        .setColor("#2F3136")
        .setFooter({ text: `${client.config.footer}`})

        message.reply({ embeds: [embedN], components: [nukeButton]});

        const filter = (interaction) => {
            if (interaction.user.id === message.author.id) return true;
            return interaction.reply({
              content: "Only the owner of these buttons can use them",
              ephemeral: true,
            });
        };

        const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 1,
        });

        collector.on("collect", (buttonInteraction) => {
            const id = buttonInteraction.customId;
      
            if (id === "YES") {
              message.channel.clone().then((ch) => {

                ch.setParent(message.channel.parent);
                ch.setPosition(message.channel.position);
                message.channel.delete().then(() => {
                    ch.send(`Channel has been nuked by <@${message.author.id}>\nhttps://i.pinimg.com/originals/47/12/89/471289cde2490c80f60d5e85bcdfb6da.gif`);
                });
              });
            }
            if (id === "NO") {
              return message.channel.bulkDelete("1", true).then(message.react("<:close:952896320341934140>"));
            }
        });
    },
};
