const { createResetToken } = require('../../helpers/utils');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../../models/users.model');
const { transporter } = require('../../config/mailer');

router.post('/recovery', async (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: 'Username is required' });
    const message = 'Check your email for a link to reset your password';
    let verificationLink;
    let emailStatus = 'ok';
    try {
        const user = await Users.getByEmail(username);
        const token = createResetToken(user);
        user.resetToken = token;
        await Users.addResetToken(user.id, token);
        verificationLink = `${process.env.RECOVERY_PASSWORD_URL}${token}`;
        // send mail with defined transport object
        await transporter.sendMail({
            from: 'Forgot Password GWL Voices', // sender address
            to: `${user.email}`, // list of receivers
            subject: "Forgot Password GWL Voices ", // Subject line
            text: "Hello world?", // plain text body
            html: `<h1>GWL Voices</h1><p>Please refer to the following link to change your password and enable your user again.</p><p>${verificationLink}</p><p>Remember that you only have one hour. After that time, the Link will expire and you will have to repeat the process.</p>`, // html body
        });
        res.status(200).json({ message, info: emailStatus, verificationLink });
    } catch (err) {
        return res.json({ message: 'User dont exist' });
    };
});

module.exports = router;