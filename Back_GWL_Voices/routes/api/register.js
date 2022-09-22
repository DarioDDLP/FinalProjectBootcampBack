const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Users = require('../../models/users.model');
const { transporter } = require('../../config/mailer');

router.post(
    '/',
    body('name')
        .exists()
        .withMessage('name is required')
        .isLength({ min: 3 }).withMessage('the name field must have a minimum length of 3 characters'),
    body('surname')
        .exists()
        .withMessage('surname is required'),
    body('email')
        .exists()
        .withMessage('Email is required')
        .matches(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .withMessage('The email is no valid'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
        .withMessage(`The password must be between 8 and 16 characters long, with at least one digit, at least one lowercase letter, and at least one uppercase letter.
        It can NOT have other symbols.`),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.json(errors.mapped());
        console.log()
        const pwd = req.body.password;
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 12);
            req.body.image = 'withoutphoto.jpeg';
            const response = await Users.create(req.body);
            await transporter.sendMail({
                from: `info@gwlvoices.es`, // sender address
                to: `${req.body.email}`, // list of receivers
                subject: 'You have been invited to be part of GWL Voices private area.', // Subject line
                // text: "Hello world?", // plain text body
                html: `<h1>Welcome to GWL Voices!</h1><h3>Please, go to this link ${process.env.URL_LOGIN}</h3><h4>Credentials</h4><h5>Username: ${req.body.email}</h5><h5>Password: ${pwd}</h5><h6>Please, after logging in, go to your profile to set a new password of your choise</h6>`, // html body
            });
            res.json(response);
        } catch (err) {
            res.json({ error: err.message });
        }
    });

module.exports = router;