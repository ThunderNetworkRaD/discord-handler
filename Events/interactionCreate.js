const { InteractionType } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	once: false,
	bots: 'all',
	run: async (client, interaction) => {
		if (interaction.type === InteractionType.ApplicationCommand) {
			if (interaction.isChatInputCommand()){	
				const command = client.SlashCommands.get(interaction.commandName);
				if (!command) return interaction.reply({ content: '404 - Not Found' });
	   
				const args = [];
	   
				for (let option of interaction.options.data) {
					if (option.type === 'SUB_COMMAND') {
						if (option.name) args.push(option.name);
						option.options?.forEach((x) => {
							if (x.value) args.push(x.value);
						});
					} else if (option.value) {args.push(option.value);}
				}
	
				interaction.member = interaction.guild.members.cache.get(
					interaction.user.id,
				);
	
	   
				require(command.fileLink).run(client, interaction, args);
			} else if (interaction.isContextMenuCommand()) {
				const command = client.SlashCommands.get(interaction.commandName);
				require(command.fileLink).run(client, interaction);
			}
		} else if (interaction.type === InteractionType.MessageComponent) {
			if (interaction.isButton()){
				const MessageComponent = client.Buttons.get(String(interaction.customId).split('_')[0]);
				if (MessageComponent){
					await require(MessageComponent.fileLink).run(client, interaction)
				}
			} else if (interaction.isSelectMenu()) {
				const MessageComponent = client.SelectMenus.get(String(interaction.customId).split('_')[0]);
				if (MessageComponent){
					await require(MessageComponent.fileLink).run(client, interaction)
				}
			}
		} else if (interaction.type === InteractionType.ModalSubmit) {
			const ModalSubmit = client.Modals.get(String(interaction.customId).split('_')[0]);
			if (ModalSubmit){
				await require(ModalSubmit.fileLink).run(client, interaction)
			}
		}
	},
};
/*
()
[]
{}
#
@
$
'
"
`
*/