const { config } = require('dotenv');
config()

const { GatewayIntentBits } = require('discord.js');

module.exports = [
    {
        enabled: true,
        name: 'MR.Testing',
        id: '1058075302452015104',
        token: process.env.TOKEN_1,
        intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.MessageContent, 
            GatewayIntentBits.GuildMessages
        ]
    }
]