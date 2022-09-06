const express = require('express');
const { createToken } = require('../../helpers/utils');
const router = express.Router();

const Users = require('../../models/users.model')

/* GET login listing. */
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.getByEmail(email);
        if (!user) return res.status(404).json({ error: "invaild email or passord" });
        const equals = password === user.password ? true : false;
        if (!equals) return res.status(404).json({ error: "invaild email or passord" });
        res.status(200).json({
            user,
            success: 'Login correcto',
            token: createToken(user),
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
