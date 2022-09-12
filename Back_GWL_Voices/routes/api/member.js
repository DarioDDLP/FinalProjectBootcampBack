const express = require('express');
const bcrypt = require('bcryptjs');

const { createToken } = require('../../helpers/utils');


const router = express.Router();

const Users = require('../../models/users.model')

/* GET login listing. */
router.get('/', async (req, res) => {
    try {
        const users = await Users.getAll();
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send({ error: err.message })
    }

});

router.get('/user', async (req, res) => {

    const user = req.user
    try {
        const response = await Users.getById(user.id)
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }


});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Users.getById(id);
        if (!response) return res.status(404).json({ error: "Id does not exist" });
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    if (req.body.password) {
        console.log('si hay password para modificar')
        req.body.password = bcrypt.hashSync(req.body.password, 12);
    }

    try {
        const response = await Users.update(id, req.body);
        res.json(response);
    } catch (err) {
        res.json({ error: err.message });
    }
});


// router.post('/new-password',
//         body('newPassword')
//             .exists()
//             .withMessage('Password is required')
//             .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
//             .withMessage(`The password must be between 8 and 16 characters long, with at least one digit, at least one lowercase letter, and at least one uppercase letter.
//     It can NOT have other symbols.`),
//     async (req, res) => {
//         const { newPassword } = req.body;
//         const { id } = req.body.user;

//         if (!newPassword) return res.status(400).json({ message: 'password required' });
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) return res.json(errors.mapped());
//         const passwordUpdated = bcrypt.hashSync(newPassword, 12);
//         try {
//             const user = await Users.getById(id);
//             user.password = newPassword;
//             await Users.updateUserPassword(user.id, passwordUpdated);
//             res.status(200).json({ message: 'Password has been updated' });
//         } catch (err) {
//             return res.status(400).json({ message: 'Sometimes goes wrong!' });
//         }
//     })

router.post('/new-password', async (req, res) => {
    const newPassword = req.body.newpassword;
    const { id } = req.user;
    console.log(newPassword, id);
    if (!newPassword) return res.status(400).json({ message: 'password required' });
    const passwordUpdated = bcrypt.hashSync(newPassword, 12);
    try {
        const user = req.user
        await Users.updateUserPassword(user.id, passwordUpdated);
        res.status(200).json({ message: 'Password has been updated' });
    } catch (err) {
        return res.status(400).json({ message: 'Sometimes goes wrong!' });
    }

})

module.exports = router;



