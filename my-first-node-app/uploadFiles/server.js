const {createServer} = require('node:http');
const formidable = require("formidable");
const fs = require('fs')

const serverUpload = createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            let oldpath = files.filetoupload[0].filepath;
            let newpath = '/home/maaxkk/Documents/' + files.filetoupload[0].originalFilename;
            fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File copied and moved!');
                res.end();
            });
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
})

module.exports = serverUpload;