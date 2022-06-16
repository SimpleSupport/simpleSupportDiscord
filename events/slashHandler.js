const Discord = require('discord.js');
const errorDatabase = require('../models/errorLog');

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) {
    if (!interaction.isCommand) return;
    const command = client.commands.get(interaction.commandName)
    if (!command) return;
    
    try {
        await command.execute(interaction, client);
    } catch (err) {
        if (err) {
            //console.error(err);

            let errorSave = await errorDatabase.create({
                authorId: interaction.member.id,
                error: err.toString(),
                command: interaction.commandName,
            });
            
            console.log(`New error: ${errorSave.id}`)
            console.error(err)
            const embed = new Discord.MessageEmbed()
                .setDescription(`**Error**, we found a problem when running your command.\nWe'll notify our developers to fix this ASAP!\n`)
                .setFooter({text: `Debug ID: ${errorSave.id}`})
                .setColor('RED')
    
            interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
    }
    
}
};