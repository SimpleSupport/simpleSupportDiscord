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
const Statcord = require('statcord.js')
const colors = require("colors");


//Initiate Stacord VIA STATCORD API
const statcord = new Statcord.Client({
    client,
    key: config.statcordKey,
    postCpuStatistics: true,
    /* Whether to post cpu statistics or not, defaults to true */
    postMemStatistics: true,
    /* Whether to post memory statistics or not, defaults to true */
    postNetworkStatistics: true,
    /* Whether to post network statistics or not, defaults to true */
});

const eventFiles = fs //EVENT HANDLER
    .readdirSync("./events")
    .filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client))
    } else {
        client.on(event.name, (...args) => event.execute(...args, client))
    }
};

client.login(config.discordToken).catch(console.error());