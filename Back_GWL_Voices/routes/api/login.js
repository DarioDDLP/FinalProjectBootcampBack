const express = require('express');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../helpers/utils');
const router = express.Router();

const Users = require('../../models/users.model')

/* GET login listing. */
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.getByEmail(email);
        if (!user) return res.status(404).json({ error: "Invalid email or password" });
        const equals = bcrypt.compareSync(password, user.password);
        if (!equals) return res.status(404).json({ error: "Invalid email or password" });
        if (!user.status) return res.status(200).json({ error: 'User disabled' });
        res.status(200).json({
            user,
            success: 'Login successful',
            token: createToken(user),
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
