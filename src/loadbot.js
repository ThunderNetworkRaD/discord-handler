module.exports = () => {
    const MapDB = require('@thundernetworkrad/map.db');
    const cache = new MapDB('cache.json');
    
    const config = require('../config.js');
    console.log('[BotLoader] | Checking enabled bots');
    var enabledBots = '';
    var disabledBots = '';
    config.forEach((bot) => {
        if (bot.enabled) {
            enabledBots += bot.name + ',';
        } else disabledBots += bot.name + ',';

        enabledBots = enabledBots.substring(0, enabledBots.length - 1);
        disabledBots = disabledBots.substring(0, disabledBots.length - 1);

        console.log('[BotLoader] | Enabled bots: [' + enabledBots + ']');
        console.log('[BotLoader] | Disabled bots: [' + disabledBots + ']');
    })
    config.forEach((bot) => {
        if (bot.enabled) {
            cache.set('starting.current', bot.id)
            const { ClusterManager } = require('discord-hybrid-sharding');

            const manager = new ClusterManager('./src/startbot.js', {
                totalShards: 'auto',
                shardsPerClusters: 2,
                mode: 'process',
                token: bot.token,
            });
            console.log('[BotLoader] | Sharding ' + bot.name)
            manager.on('clusterCreate', cluster => console.log('[BotLoader] | Launched Cluster ' + cluster.id + ' for ' + bot.name));
            manager.spawn({ timeout: -1 });
        };
    })
}