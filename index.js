var loadBot = require('./src/loadbot.js');
function home() {
    require('@thundernetworkrad/files')
    .map('./src/HandlerCommands/*.js')
    .then((commands) => {
        var status = 1;
        require('@thundernetworkrad/std')
        .cin('MR.Handy -> ')
        .then((cmd) => {
            commands.forEach((command) => {
                var command = require(command)
                if (command.name == cmd) {
                    command.run()
                    .then(({status, response}) => {
                        if (status == 1) console.log(response)
                        home()
                    })
                    status = 0;
                }
            })
            if (status != 0) {
                console.log('Command Not Found')
                home()
            }
        })
    })
}

async function start (startWithCli) {
    if (startWithCli) {
        home()
    } else {
        loadBot()
    }
}

start(startWithCli = false)