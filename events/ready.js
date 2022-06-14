const Discord = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('../config.js')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client, commands) {
        client.on("ready", async () => {
            console.log('Bot Status'.cyan.bold)
            console.log('----------------------'.gray.bold)
            console.log('Bot Status: '.green.bold + 'Started'.green)
            console.log('Bot Identity: '.blue.bold + `${client.user.tag}`.blue) //I know this is for sure not the way to do this but I forgor
            console.log('----------------------'.gray.bold)
            });

    const rest = new REST({
        version: "9"
    }).setToken(config.discordToken)
    
    (async () => {
        await rest.put(Routes.applicationCommands(client.id), {
            body: commands
        }).catch(console.error());
        console.log('----------------------'.gray.bold);
        console.log('Commands: '.green.bold + 'Successfully Registered'.green)
        console.log('----------------------'.gray.bold);
    })

    }
}