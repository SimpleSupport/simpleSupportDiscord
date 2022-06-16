const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const { Modal, TextInputComponent, SelectMenuComponent, showModal } = require('discord-modals'); // Import all
const errorDatabase = require('../../models/developerConfig');
const { uuid } = require('uuidv4');

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
        const errorChannelFind = await errorDatabase.findOrCreate({
            where: { id: 'errorChannelID' },
            defaults: {
              argument1: '0'
            }
          });

        const errorChannel_ID = "0"

        if(!errorChannelFind === null) {
            errorChannel_ID = await errorChannelFind.argument1;
        }

        const configurationModal = new Modal()
        .setCustomId(`errorConfigurationModal`)
        .setTitle('⚙️ Bot Configuration')
        //.setDescription('**Warning** This is not the server configuration! This is the entire bot domain!!!')
        .addComponents(
            new TextInputComponent() // We create a Text Input Component
            .setCustomId('errorLog_channel')
            .setLabel('Error Logging Channel ID')
            .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
            .setPlaceholder(errorChannel_ID)
            .setRequired(false), // If it's required or not
          
            new SelectMenuComponent() // We create a Select Menu Component
            .setCustomId('errorLog_enabled')
            .setPlaceholder('Toggle Error Logging')
            .addOptions(
              {
                label: "Disabled",
                description: "Logs will not send, set this option if the field above is empty.",
                value: "disabled",
                emoji: "⚫"
              },
              {
                label: "Enabled",
                description: "Will send error logs, please ensure the field above is set!",
                value: "enabled",
                emoji: "⚪"
              }
            )
        )


        const filter = (i) => i.customId === `errorConfigurationModal` && i.author.id === interaction.author.id;
        interaction.awaitModalSubmit({
                filter,
                time: 900000
            })
            .then(interaction => console.log(`${interaction.customId} was submitted!`))
            .catch(console.error);


        interaction.showModal(configurationModal);
    }
}