const path = require('path');

function getURL() {
    const myURL = new URL('https://example.org:5173/foo/bar?baz=faz');
    console.log(myURL.origin); //https://example.org:5173
    console.log(myURL.pathname); // foo/bar;
    console.log(myURL.port); // 5173
    console.log(myURL.search); // ?baz=faz;
    console.log(myURL.searchParams.get('baz')); // faz;
}

function getPath() {
    // console.log('Склеить участки пути', path.join(__dirname, '..', '..')); // go 1 folder back
    // console.log('Получить абсолютный путь', path.resolve('first', 'second', 'third.js')); // this folder + /first/second/third.js
    const fullpath = path.resolve('first', 'second', 'third.js');
    // console.log('Path parsing', path.parse(fullpath)); // returns objects with root dir name and extension of file
    // console.log('Path separator', path.sep); // path separator: /
    // console.log('Path is absolute', path.isAbsolute('first/second')); // false
    // console.log('Name of file', path.basename(fullpath)); // third.js
    // console.log('Extension of file', path.extname(fullpath)); // .js

    const siteURL = 'http://localhost:3000/users?id=5123';
    const url = new URL(siteURL);

    console.log(url); // object with all needed parameters for url
}

module.exports = {getPath, getURL};

