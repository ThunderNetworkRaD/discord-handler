module.exports = {
    name: 'eventsHandler',
    bots: 'all',
    run: async (variables) => {
        const fs = require('fs');
        var client = variables.client;
        client.config = variables.config;
        client.variables = variables;
        fs.readdir('./Events', (err, files) => {
            if (err) {
                throw err
            }
            files.forEach(file => {
                if (file.endsWith('.js')) {
                    var events = require('../Events/'+file)
                    if (events.bots == 'all' || events.bots.includes(client.config.name) || events.bots.includes(client.config.id)) {
                        if (events.once) {
                            client.once(events.name, (...args) => events.run(client, ...args))
                        } else {
                            client.on(events.name, (...args) => events.run(client, ...args))
                        }
                        console.log('[EventsHandler] | Loaded ' + events.name)
                    }
                }
            })
        })
    }
}