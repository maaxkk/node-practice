const {createServer} = require('node:http')
// const {reqGET, reqPOST} = require('./requests/request')
const writeFiles = require('./writingFiles/writeFiles');
const readFiles = require('./readingFiles/readFile')
const sendEmail = require('./sendEmail/server')
const {getPath} = require('./path/path')
const getURL = require('./path/path')
const eventLearning = require('./event/event')
const url = require('url')
const fs = require('node:fs');
require('./file-system/file-system')

const server = require('./uploadFiles/server')
const hostname = '127.0.0.1';
const port = process.env.PORT;

// writeFiles();
// readFiles();
// getURL();
// getPath();
// eventLearning()
// sendEmail();


// const server = createServer((req, res) => {
//     fs.readFile(__dirname + '/readingFiles/demofile.html', 'utf8', function (err, data) {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/html');
//         // let q = url.parse(req.url, true).query;
//         // let txt = q.year + ' ' + q.month;
//         res.write(data);
//         return res.end();
//     })
// });

// const server = createServer((req, res) => {
//     let q = url.parse( req.url, true);
//     let filename = '/readingFiles' + q.pathname + '.html';
//     console.log(filename)
//     fs.readFile(__dirname + filename, function (err, data) {
//         if (err) {
//             res.statusCode = 404;
//             res.setHeader('Content-Type', 'text/html');
//             return res.end('404 Not found')
//         }
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/html');
//         res.write(data);
//         return res.end();
//     });
// })

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});

