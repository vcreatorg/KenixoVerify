const client = require("../index");
const mongoose = require("mongoose");
const chalk = require("chalk");

client.on("ready", () => {
    try {
        console.clear()
        console.log(chalk.green("===============[SUCCESSFULY]==============="))
        console.log(chalk.yellow(`Client   : ${client.user.tag}`))
        // mongoose
        const { mongooseConnectionString } = require('../config.json')
        if (!mongooseConnectionString) return;
    
        mongoose.connect(mongooseConnectionString).then(() => console.log(chalk.yellow(`Database : Connetced mongoose`)))
        .then(() => console.log(chalk.yellow(`Servers  : ${client.guilds.cache.size.toLocaleString()}`)))
        .then(() => console.log(chalk.yellow(`Users    : ${client.users.cache.size.toLocaleString()}`)))
        .then(() => console.log(chalk.green("===========================================")))
        setInterval(() => {
            client.user.setActivity(`?help | www.kenixobot.ml`, { type: "WATCHING"});
        }, 1000)
    } catch {
        console.log(chalk.red("===============[FAILED]==============="))
    }
});
