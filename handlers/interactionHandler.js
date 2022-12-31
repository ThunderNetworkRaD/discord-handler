const { Collection, ApplicationCommandType } = require('discord.js');

module.exports = {
    name: 'interactionHandler',
    bots: 'all',
    run: async (variables) => {
        var arrayOfSlashCommands = [];
        const fs = require('fs');
        var client = variables.client;
        client.config = variables.config;
        client.variables = variables;
        client.SlashCommands = new Collection;
        client.Buttons = new Collection;
        client.SelectMenus = new Collection;
        client.Modals = new Collection;
        fs.readdir('./Interactions/', (err, interactionTypes) => {
            if (err) {
                throw err
            }
            interactionTypes.forEach(interactionType => {
                fs.readdir('./Interactions/' + interactionType, (err, categories) => {
                    if (err) {
                        throw err
                    }
                    categories.forEach(category => {
                        fs.readdir('./Interactions/' + interactionType + '/' + category, (err, files) => {
                            if (err) {
                                throw err
                            }
                            files.forEach(file => {
                                if (file.endsWith('.js')) {
                                    var command = require('../Interactions/' + interactionType + '/' + category + '/' + file)
                                    command.fileLink = process.cwd() + '/Interactions/' + interactionType + '/' + category + '/' + file
                                    if (command.type == ApplicationCommandType.ChatInput || command.dest == 1) {
                                        arrayOfSlashCommands.push(command)
                                        client.SlashCommands.set(command.name, command)
                                    } else if (command.dest == 2 || command.dest == 'button') {
                                        client.Buttons.set(command.name, command)
                                    } else if (command.dest == 3 || command.dest == 'selectMenu') {
                                        client.Buttons.set(command.name, command)
                                    } else if (command.dest == 4 || command.dest == 'modalSubmit') {
                                        client.Buttons.set(command.name, command)
                                    }
                                }
                            })
                        })
                    })
                })
            })
        })
        client.once('ready', () => {
            console.log('[SlashCommandsHandler] | Setting SlashCommands');
            client.application.commands.set(arrayOfSlashCommands);
            console.log('[SlashCommandsHandler] | SlashCommands Setted');
        });
    }
}