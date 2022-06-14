const {
    SlashCommandBuilder
} = require("@discordjs/builders");
const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const errorDatabase = require('../../models/errorLog');

module.exports = {
    category: "developers",
    data: new SlashCommandBuilder()
        .setName('show-error')
        .setDescription(`Replies with an embed including bot's latency data.`)
        .addStringOption(option => option.setName('error-id').setDescription('The UUID of the error to view.')),
    async execute(interaction, client) {
        if(!interaction.member.id === "351189462891626496") {
            const embed = new Discord.MessageEmbed()
            .setDescription('**Insufficient Permissions**\nThis command is restricted to developers for privacy reasons.')
            .setColor('RED')
            interaction.reply({embeds: [embed], emphemeral: true});
            return;
        }

        let errorToQuery = await interaction.options.getString('error-id');
        let errorFound = await errorDatabase.findOne({where: {id: errorToQuery}})
        if(errorFound === null) {
            let embed = new Discord.MessageEmbed()
            .setDescription("**Error**, there is no error found under the ID given.")
            .setColor('RED')
            interaction.reply({embeds: [embed], emphemeral: true});
            return;
        } else {
            let embed = new Discord.MessageEmbed()
            .setTitle("**Error Details**")
            .addField("Author", `<@${errorFound.authorId}> / ${errorFound.authorId}`, true)
            .addField("Command", " "+errorFound.command, true)
            .addField("Error", `\`\`${errorFound.error}\`\``, false)
            .setColor("AQUA")

            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('resolve-error')
					.setLabel('📨 Resolve')
					.setStyle('SECONDARY'),
			);

            let msg = interaction.reply({embeds: [embed], components: [row]});

            const filter = i => i.customId === 'resolve-error' && i.user.id === interaction.member.id;

            const collector = interaction.channel.createMessageComponentCollector({
                filter,
                time: 900000
            });

            collector.on('collect', async i => {
                if (i.customId === 'resolve-error') {
                    await embed.setColor('GREEN')
                    await embed.setTitle('**Error Resolved!**')
                    await interaction.editReply({embeds: [embed], components: []})
                    await errorFound.destroy();
                }
            });

            //collector.on('end', collected => console.log(`Collected ${collected.size} items`));
        }
    }
}