module.exports = {
    name: 'HandlersHandler',
    bots: 'all',
    start: (variables) => {
        const fs = require('fs')
        const dir = './handlers/'
        fs.readdir(dir, (err, files) => {
          if (err) {
            throw err
          }
          files.forEach(file => {
            if (file.endsWith('.js')) {
              var handler = require('./'+file)
              if (handler.name != 'HandlersHandler') {
                if (handler.bots == 'all' || handler.bots.includes(variables.config.id) || handler.bots.includes(variables.config.name)) {
                  console.log('[HandlersHandler] | Loaded ' + handler.name)
                  handler.run(variables)
                }
              }
            }
          })
        })        
        /*
        require('@thundernetworkrad/files')
        .map('*.js')
        .then((handlers) => {
            handlers.forEach((handler) => {
                console.log(handler.name)
                if (handler.name != 'HandlersHandler') {

                }
            })
        })*/
    }
}