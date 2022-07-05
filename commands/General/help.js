const { Message, Client, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "help",
    aliases: [''],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see command list",
    category: "General",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try {
            const directories = [
                ...new Set(client.commands.map((cmd) => cmd.directory)),
            ];

            const formatString = (str) => {
                `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
            }
            
            const categories = directories.map((dir) => {
                const getCommands = client.commands.filter((cmd) => cmd.directory === dir
                ).map((cmd) => {
                    return {
                        name: cmd.name || `There is no name`,
                        description: cmd.description || `There is no description`
                    }
                });
    
                return {
                    directory: dir,
                    commands: getCommands,
                }
            })
    
            const embed = new MessageEmbed()
            .setTitle(`Help panel for command list`)
            .setDescription(`Please choose a category in the dropdown menu`)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
    
            const components = (state) => [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                    .setCustomId("help-menu")
                    .setPlaceholder("Please select a category")
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory,
                                description: `Commands for ${cmd.directory} category`,
                            }
                        })
                    )
                ),
            ];
    
            const initialMessage = await message.reply({
                embeds: [embed],
                components: components(false),
            });
    
            const filter = (i) => {
                if (i.user.id === message.author.id) return true;
                 return i.reply({
                      content: "Only the owner of these buttons can use them",
                      ephemeral: true,
                });
            }
            
            const collector = message.channel.createMessageComponentCollector({
                 filter, 
                 componentType: "SELECT_MENU",
                 time: 30000,
                });
    
            collector.on('collect', (interaction) => {
                const [ directory ] = interaction.values;
                const category = categories.find((x) => x.directory === directory)
    
                const cmds = category.commands.map((cmd) => `> \`\`${cmd.name}\`\` - ${cmd.description}`).join("\n")
                const cembed = new MessageEmbed()
                .setTitle(`${directory} commands`)
                .setDescription(`Here a list of commands\n\n${cmds}`)
                .setColor("#2F3136")
                .setFooter({ text: `${client.config.footer}`})
                interaction.update({ embeds: [cembed]})
            })
    
            collector.on("end", () => {
                initialMessage.edit({ components: components(true) })
            })
        } catch (error) {
            console.log(error)
        }
    },
};
