const fs = require('node:fs');
const fsPromises = require('node:fs/promises')

const asyncContent = 'Some content!';
const syncContent = 'Some sync content';
const promiseContent = 'Some promise content';

async function writeFiles() {
    //async way
    fs.writeFile(`${process.env.HOME_DIR}/sync.txt`, asyncContent, err => {
        if (err) {
            console.error(err);
        } else {
            console.log('File written successfully!')
        }
    });

    //sync way
    try {
        fs.writeFileSync(`${process.env.HOME_DIR}/async.txt`, syncContent)
        console.log('File sync written successfully')
    } catch (e) {
        console.error(e)
    }
    //promises way
    try {
        await fsPromises.writeFile(`${process.env.HOME_DIR}/promise.txt`,
            promiseContent, {flag: 'a+'}) // flag 'a+' appends content to the end
    } catch (e) {
        console.error(e)
    }

    // apend files
    const appendContent = 'It was appended!'
    fs.appendFile(`${process.env.HOME_DIR}/sync.txt`, appendContent, err => {
        if (err) {
            console.error(err)
        } else {
            console.log('Appended successfully!')
        }
    })

    try {
        const appendedContentWPromise = 'It was appended with promise';
        await fsPromises.appendFile(`${process.env.HOME_DIR}/async.txt`, appendedContentWPromise);
    } catch (e) {
        console.error(e);
    }
}

module.exports = writeFiles;