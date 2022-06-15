const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const Discord = require('discord.js');
const { MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');
const errorDatabase = require('../../models/errorLog');

module.exports = {
    category: "developers",
    data: new SlashCommandBuilder()
        .setName('developer-config')
        .setDescription(`Developer Config`),
    async execute(interaction, client) {
        if(!interaction.member.id === "351189462891626496") {
            const embed = new Discord.MessageEmbed()
            .setDescription('**Insufficient Permissions**\nThis command is restricted to developers for privacy reasons.')
            .setColor('RED')
            interaction.reply({embeds: [embed], emphemeral: true});
            return;
        }

        const modal = new Modal()
            .setCustomId(`developerConfiguration-${interaction.user.id}`)
            .setLabel('⚙️ BOT CONFIG')
            .addComponents(
                new TextInputComponent() // We create a Text Input Component
                .setCustomId('errorlog-channel')
                .setLabel(`Error Logging Channel ID`)
                .setStyle('LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
                .setMaxLength(1000)
                .setPlaceholder(`1234567890`)
                .setRequired(false), // If it's required or not
                new TextInputComponent() // We create a Text Input Component
                .setCustomId('botactivity-array')
                .setLabel(`Bot Playing - Array`)
                .setStyle('LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
                .setMaxLength(1000)
                .setPlaceholder(`test, test1, test2`)
                .setRequired(false), // If it's required or not
            )

        await interaction.showModal(modal);
    }
}