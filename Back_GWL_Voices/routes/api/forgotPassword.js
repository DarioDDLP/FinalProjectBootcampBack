const { createResetToken } = require('../../helpers/utils');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../../models/users.model');
const { transporter } = require('../../config/mailer');


// FORGOT PASSWORD

let user;

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
        const response = await Users.addResetToken(user.id, token);
        verificationLink = `${process.env.RECOVERY_PASSWORD_URL}${token}`;
        // send mail with defined transport object
        await transporter.sendMail({
            from: 'Forgot Password GWL Voices', // sender address
            to: "thegordosmen@gmail.com", // list of receivers
            subject: "Forgot Password GWL Voices ", // Subject line
            text: "Hello world?", // plain text body
            html: `<h1>GWL Voices</h1><p>Please refer to the following link to change your password and enable your user again.</p><p>${verificationLink}</p><p>Remember that you only have one hour. After that time, the Link will expire and you will have to repeat the process.</p>`, // html body
        });
        res.status(200).json({ message, info: emailStatus, verificationLink });
    } catch (err) {
        return res.json({ message: 'User dont exist' });
    };
});


router.post('/new-password',
    body('newPassword')
        .exists()
        .withMessage('Password is required')
        .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
        .withMessage(`The password must be between 8 and 16 characters long, with at least one digit, at least one lowercase letter, and at least one uppercase letter.
It can NOT have other symbols.`),
    async (req, res) => {
        const { newPassword } = req.body;
        const resetToken = req.headers['resettoken'];
        if (!newPassword || !resetToken) return res.status(400).json({ message: 'token and new password are required' });
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.json(errors.mapped());
        const passwordUpdated = bcrypt.hashSync(newPassword, 12);
        try {
            const user = await Users.getByResetToken(resetToken);
            user.password = newPassword;
            await Users.updateUserPassword(user.id, passwordUpdated);
            res.status(200).json({ message: 'Password has been updated' });
        } catch (err) {
            return res.status(400).json({ message: 'Sometimes goes wrong!' });
        }
    })
module.exports = router;