const fs = require('node:fs');
const fsPromise = require('node:fs/promises');

async function readFiles() {
    fs.readFile(`${process.env.HOME_DIR}/promise.txt`, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        } else {
            console.log(data);
        }
    })

    // sync
    try {
        const data = fs.readFileSync(`${process.env.HOME_DIR}/sync.txt`, 'utf8');
        console.log(data);
    } catch (e) {
        console.error(e);
    }

    // promises
    try {
        const data = await fsPromise.readFile(`${process.env.HOME_DIR}/async.txt`, {encoding: 'utf8'})
        console.log(data)
    } catch (e) {
        console.error(e)
    }
}

module.exports = readFiles;
