## /!\ Not fully tested

# discord-handler
A commands, slash commands, events, bot  handler

## How to setup?

### 1° bot
Go in the config and edit MR.Test, 
- enabled: <true/false> /This bot need to be enabeled? - default false
- name: '' /what is the bot name? you can use this in the commands
- id: '' /what is the bot id? you can use this in the command
- token: '' /for login with the bot, pick it at  https://discord.dev
- intents:  /can be an array like with mr.test, or can be a number, find discord intent calculator to get the number

### other bots
copy and edit the mr.test config in the same array, -remember to change process.env.token_1 in the token for the bot

### multibot support
This handler support more than one bot, you can chose what commands the bot need to load, the other commands will be excluded, in all the handler, in all the events, in all the commands/slashcommands need to be bots: with an array of the name or the id of the bot that have to load that. if you want to enable for all, simply write 'all'
examples: 
- bots: ['MR.Test']
- bots: ['<mr.test id>']
- bots: 'all'

### shards
This bot works with discord-hybrid-shardings shard, you can't disable this easily, this require a bit of ram, but if you disable it editing the code, we will not support you.
