
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../../models/users.model');


router.post('/',
    body('newPassword')
        .exists()
        .withMessage('Password is required')
        .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
        .withMessage(`The password must be between 8 and 16 characters long, with at least one digit, at least one lowercase letter, and at least one uppercase letter.
It can NOT have other symbols.`),
    async (req, res) => {
        const { newPassword } = req.body;
        const { resettoken } = req.headers
        if (!newPassword) return res.status(400).json({ message: 'Invalid password.' });
        if (!resettoken) return res.status(400).json({ message: 'The link has expired. Please resend and try again.' });
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.json(errors.mapped());
        const passwordUpdated = bcrypt.hashSync(newPassword, 12);
        try {
            const user = await Users.getByResetToken(resettoken);
            user.password = newPassword;
            await Users.updateUserPassword(user.id, passwordUpdated);
            res.status(200).json({ message: 'Password updated.' });
        } catch (err) {
            return res.status(400).json({ message: 'Something went wrong.' });
        }
    })

module.exports = router;




