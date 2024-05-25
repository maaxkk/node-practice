const EventEmitter = require('events');
const uuid = require('uuid');

class Logger extends EventEmitter {
    log(msg) {
        // Call event
        this.emit('message', {id: uuid.v4(), msg: msg});
    }
}

const logger = new Logger();

logger.on('message', (data) => console.log(`Called listener: ${data.msg}`))

logger.log('Hello world')

// module.exports = Logger;