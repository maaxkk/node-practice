let nodemailer = require('nodemailer');

function sendEmail() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpass'
        }
    });

    const mailOptions = {
        from: 'youremail@gmail.com',
        to: 'yourfriendemail@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

module.exports = sendEmail;