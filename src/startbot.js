const MapDB = require('@thundernetworkrad/map.db');
const cache = new MapDB('cache.json');
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');


var config;
require('../config.js')
.forEach((bot) => {
    if (bot.id == cache.get('starting.current')) {
        config = bot;
    }
})
var variables = {
    discordjs: require('discord.js'),
    config
}
console.log('[BotStarter] | Starting ' + config.name)

const client = new variables.discordjs.Client({ 
    intents: config.intents ,
    shards: getInfo().SHARD_LIST,
    shardCount: getInfo().TOTAL_SHARDS, 
});
client.cluster = new ClusterClient(client);

client.login(config.token);

variables.client = client;

require('../handlers/HandlersHandler.js').start(variables)

console.log('[BotStarter] | Started ' + config.name)