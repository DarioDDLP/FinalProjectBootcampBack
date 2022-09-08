const nodemailer = require("nodemailer");


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'thegordosmen@gmail.com',
        pass: 'imkxzbcwymsiouhd'
    }
});

module.exports = { transporter };