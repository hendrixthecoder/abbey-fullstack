const info = (message) => {
    return console.log(message);
}

const error = (message) => {
    return console.error(message);
}

const logger = { info, error }

module.exports = logger