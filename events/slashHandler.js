const Discord = require('discord.js');

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
            console.error(err);
            const embed = new Discord.MessageEmbed()
                .setDescription(`**Error**\nThere was an error executing that command!\n Don't worry we've notified our developers.`)
                .setColor('RED')
    
            interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
    }
    
}
};