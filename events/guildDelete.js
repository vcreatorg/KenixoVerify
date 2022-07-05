const client = require("../index");
const { MessageEmbed } = require('discord.js');
const prefixModel = require("../model/prefix"); //path of prefix model
const samp = require("../model/samp")
const welcome = require("../model/welcome")
const leave = require("../model/leave")
const register = require("../model/register")
const autorole = require("../model/autorole")
const antiinvite = require("../model/antiinvite")
const antiscam = require("../model/antiscam")
const ship = require("../model/ship")
const warns = require("../model/warns")
const afk = require("../model/afk")
const usesamp = require("../model/usesamp")
const { time } = require('@discordjs/builders');

client.on("guildDelete", async (guild) => {

    const Owner = await guild.fetchOwner();
    const createdAt = guild.createdAt;
    const agocreatef = time(createdAt, 'f');
    const agocreateR = time(createdAt, 'R');
    const embedL = new MessageEmbed()
    .setTitle(`${guild.name}`)
    .addField(`Owner:`, `${Owner.user.tag}`, true)
    .addField(`Members:`, `${guild.memberCount.toLocaleString()}`, true)
    .addField(`Created At:`, `${agocreatef} (${agocreateR})`, true)
    .setColor("#2F3136")
    .setThumbnail(guild.iconURL({ dynamic: true}))
    client.channels.cache.get("934103856999182486").send({ embeds: [embedL]})

    const dataPrefix = await prefixModel.findOne({
        GuildID: guild.id
    });
    if (dataPrefix) {
        await prefixModel.findOneAndRemove({
            GuildID: guild.id
        })
    }

    const dataSamp = await samp.findOne({
        Guild: guild.id
    });
    if (dataSamp) {
        await samp.findOneAndRemove({
            Guild: guild.id
        })
    }

    const dataWel = await welcome.findOne({
        Guild: guild.id
    });
    if (dataWel) {
        await welcome.findOneAndRemove({
            Guild: guild.id
        })
    }

    const dataLea = await leave.findOne({
        Guild: guild.id
    });
    if (dataLea) {
        await leave.findOneAndRemove({
            Guild: guild.id
        })
    }

    const dataReg = await register.findOne({
        Guild: guild.id
    });
    if (dataReg) {
        await register.findOneAndRemove({
            Guild: guild.id
        })
    }

    const dataARo = await autorole.findOne({
        GuildID: guild.id
    });
    if (dataARo) {
        await autorole.findOneAndRemove({
            GuildID: guild.id
        })
    }

    const dataAi = await antiinvite.findOne({
        GuildID: guild.id
    });
    if (dataAi) {
        await antiinvite.findOneAndRemove({
            GuildID: guild.id
        })
    }

    const dataAs = await antiscam.findOne({
        GuildID: guild.id
    });
    if (dataAs) {
        await antiscam.findOneAndRemove({
            GuildID: guild.id
        })
    }

    const dataShi = await ship.findOne({
        GuildID: guild.id
    });
    if (dataShi) {
        await ship.findOneAndRemove({
            GuildID: guild.id
        })
    }

    const dataWarn = await warns.findOne({
        Guild: guild.id
    });
    if (dataWarn) {
        await warns.findOneAndRemove({
            Guild: guild.id
        })
    }

    const dataAf = await afk.findOne({
        Guild: guild.id
    });
    if (dataAf) {
        await afk.findOneAndRemove({
            Guild: guild.id
        })
    }

    const dataUsa = await usesamp.findOne({
        GuildID: guild.id
    });
    if (dataUsa) {
        await usesamp.findOneAndRemove({
            GuildID: guild.id
        })
    }
});
