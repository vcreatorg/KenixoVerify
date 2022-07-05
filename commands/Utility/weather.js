const { Message, Client, MessageEmbed } = require("discord.js");
const weather = require("weather-js")

module.exports = {
    name: "weather",
    aliases: [''],
    cooldown: 3,
    botPermissions: [""],
    userPermissions: [""],
    description: "To see show information weather any city",
    category: "Utility",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let city = args.join(" ");
        if(!city) return usembed(message, 'weather <city>', 'weather Jakarta')

        weather.find({ search: city, degreeType: "C" }, function (err, result) {
            if (err) return errembed(messsage, `${err}`)
            if(!args[0]) return errembed(message, `Please specify a location!`)

            if(result === undefined || result.length === 0) return errembed(message, 'Invalid location!')

            var current = result[0].current;
            var location = result[0].location;

            const embed = new MessageEmbed()
            .setTitle(`Weather forecast for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setDescription(current.skytext)
            .addField('Timezone:', `UTC ${location.timezone}`, true)
            .addField('Degree Type:', 'Celsius', true)
            .addField('Temperature:', `${current.temperature}˚`, true)
            .addField('Wind:', `${current.winddisplay}`, true)
            .addField('Feels Like:', `${current.feelslike}˚`, true)
            .addField('Humidity:', `${current.humidity}%`, true)
            .setColor("#2F3136")
            .setFooter({ text: `${client.config.footer}`})
            message.reply({ embeds: [embed] })
        })
    },
};
