const Discord = require('discord.js');
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const config = require('../config.js')
const db = require('../database/database')
const fs = require('fs')
const {
    Client,
    Intents,
    Collection
} = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        let commands = [];
        client.commands = new Collection()

        const commandFolders = fs.readdirSync('./commands');

        for await (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                commands.push(command.data.toJSON());
                client.commands.set(command.data.name, command);
            }
        }

        console.log('Bot Status'.cyan.bold)
        console.log('----------------------'.gray.bold)
        console.log('Bot Status: '.green.bold + 'Started'.green)
        console.log('Bot Identity: '.blue.bold + `${client.user.tag}`.blue) //I know this is for sure not the way to do this but I forgor
        console.log('----------------------'.gray.bold)

        const rest = new REST({
            version: "9"
        }).setToken(config.discordToken);

        (async () => {
            try {
                await rest.put(Routes.applicationGuildCommands(client.user.id, config.serverId), {
                    body: commands
                });
                console.log('----------------------'.gray.bold);
                console.log('Commands: '.green.bold + 'Successfully Registered'.green)
                console.log('----------------------'.gray.bold);
            } catch (err) {
                if (err) console.error(err);
            }
        })();

        db.authenticate()
            .then(() => {
                console.log('----------------------'.gray.bold);
                console.log('Database: '.green.bold + 'Successfully authenticated!'.green)
                console.log('----------------------'.gray.bold);
                //ticketModel.init(db);
                //ticketModel.sync();
            }).catch(err => console.log(err));

    }
}