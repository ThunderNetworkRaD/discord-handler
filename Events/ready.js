const { version: discordjsVersion, ActivityType } = require('discord.js');
var package = require('../package.json');

module.exports = {
	name: 'ready',
	once: true,
	bots: 'all',
	run: async (client) => {
		console.log('[Events - Ready] | ' + client.config.name + ' Started');
		client.user.setPresence({ activities: [{ type: ActivityType.Watching, name: `/help | ${client.guilds.cache.size} ${client.guilds.cache.size > 1 ? 'servers' : 'server'}` }] });
		/*client.webhook.send({embeds: [{
			title: client.config.name + ' è stato avviato con successo',
			color: 0x00ff00,
			description: 'Informazioni',
			fields: [
				{
					name: 'Node Version:',
					value: '**' + process.version + '**'
				},
				{
					name: 'OS / Host:',
					value: '`' + process.platform + process.arch + '`'
				},
				{
					name: 'Version',
					value: package.version
				},
				{ 
					name: 'Discord.js Version',
					value: '__' + discordjsVersion + '__'
				}
			]
		}]})*/
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