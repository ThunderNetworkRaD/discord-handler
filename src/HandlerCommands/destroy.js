module.exports = {
    name: 'test',
    run () {
        return new Promise((resolve, reject) => {
            resolve({status: 1, response: 'Not finished'})
        })
    }
}