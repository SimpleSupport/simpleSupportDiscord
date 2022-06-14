const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const Discord = require('discord.js')

module.exports = {
    category: "public",
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription(`Replies with an embed including bot's latency data.`),
    async execute(interaction, client) {
        await interaction.reply({content: '🏓 Pong!', emphemeral: true})
        const msg = await interaction.fetchReply();
        const embed = new Discord.MessageEmbed()
            .setDescription(`🏓 Bot \`${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)}\`\n🖥️ Api \`${client.ws.ping}\``)
            .setColor('BLURPLE')

        msg.edit({
            embeds: [embed],
            emphemeral: true
        })
    }
}