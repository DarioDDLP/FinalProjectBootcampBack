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
        req.body.password = bcrypt.hashSync(req.body.password, 12);
    }

    try {
        const response = await Users.update(id, req.body);
        res.json(response);
    } catch (err) {
        res.json({ error: err.message });
    }
});


router.post('/new-password', async (req, res) => {
    const newPassword = req.body.newpassword;
    const { id } = req.user;
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

router.post('/oldpassword', async (req, res) => {
    try {
        const id = req.body.id;
        const { inputPass } = req.body;
        const user = await Users.getById(id);
        const equals = bcrypt.compareSync(inputPass, user.password);
        if (!equals) {
            return res.status(404).json({ error: "Wrong password" });
        }

        res.status(200).send(user)

    } catch (error) {
        res.status(404).send({ error: 'Wrong current password' })

    }


});
module.exports = router;





