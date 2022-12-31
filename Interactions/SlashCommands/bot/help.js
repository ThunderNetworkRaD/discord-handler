const { ButtonStyle, ApplicationCommandType } = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Do you need of help?',
	bots: 'all',
    type: ApplicationCommandType.ChatInput,
    dest: 1,
	defaultMemberPermissions: [],
	dmPermission: false,
	run: async (client, interaction) => {

        interaction.reply({
            embeds: [
                {
                    color: 0xff8800,
                    title: 'Hi',
                    description: 'this is a test',
                    timestamp: new Date(),
                }
            ], 
            components: [
                {
                    type: 1,
                    components: [
                        {
                            label: 'invite me!',
                            style: ButtonStyle.Link,
                            url: `https://discord.com/api/oauth2/authorize?client_id=${client.config.id}&permissions=1249772039527&scope=bot%20applications.commands`,
                            emoji: '➕',
                            type: 2
                        }
                    ]
                }
            ] 
        })
    },
};