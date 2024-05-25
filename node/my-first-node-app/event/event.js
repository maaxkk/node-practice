const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

function eventLearning() {
    eventEmitter.on('start', (start, end) => {
        console.log(`started ${start} to ${end}`);
    });
    eventEmitter.emit('start', 1, 100);
}

module.exports = eventLearning;