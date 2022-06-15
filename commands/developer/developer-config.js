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
            .setTitle('⚙️ Bot Configuration');
            const errorLogChannel = new TextInputComponent()
			.setCustomId('errorLogChannel')
			.setLabel("Error Logging Channel")
            .setPlaceholder('1234567890')
			.setStyle('SHORT');
            const actionrow1 = new MessageActionRow().addComponents(errorLogChannel);
            modal.addComponents(actionrow1);



        await interaction.showModal(modal);
    }
}