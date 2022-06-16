const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const errorDatabase = require('../../models/errorLog');

module.exports = {
    category: "developers",
    data: new SlashCommandBuilder()
        .setName('force-error')
        .setDescription(`Forces an error for testing.`),
    async execute(interaction, client) {
        if(!interaction.member.id === "351189462891626496") {
            const embed = new Discord.MessageEmbed()
            .setDescription('**Insufficient Permissions**\nThis command is restricted to developers for privacy reasons.')
            .setColor('RED')
            interaction.reply({embeds: [embed], emphemeral: true});
            return;
        }

        console.log(testingError);
        


    }
}