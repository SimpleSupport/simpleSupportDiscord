//DISCORD REQUIREMENTS
const fs = require('fs');
const {
    Discord,
    Client,
    Intents,
    Collection
} = require("discord.js");
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const config = require("./config.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
//EXTRAS
const colors = require("colors");

//Initiate Stacord VIA STATCORD API
const statcord = new Statcord.Client({
    client,
    key: config.statcordKey,
    postCpuStatistics: true,
    /* Whether to post memory statistics or not, defaults to true */
    postMemStatistics: true,
    /* Whether to post memory statistics or not, defaults to true */
    postNetworkStatistics: true,
    /* Whether to post memory statistics or not, defaults to true */
});

client.commands = new Collection();

let commands = [];
client.commands = new Collection()

const commandFolders = fs.readdirSync('./commands');

for await (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    }
}

client.login(config.discordToken).catch(console.error());