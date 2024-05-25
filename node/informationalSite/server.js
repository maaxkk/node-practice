const {createServer} = require('node:http');
const fs = require('node:fs');

const port = process.env.PORT;
const hostname = '127.0.0.1'

const pages = ['/about', '/contact-me']

const server = createServer((req, res) => {
    const url = req.url;
    let filename;
    if (url === '/') {
        filename = '/pages/index.html'
    }
    else if (pages.includes(url)) {
        filename = '/pages' + url + '.html';
    } else {
        filename = '/pages/404.html';
    }
    fs.readFile(__dirname + filename, 'utf8', (err, data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(data)
        return res.end();
    })
})

server.listen(port, hostname, () => {
    console.log(`Server started at http://localhost:${port}/`)
})