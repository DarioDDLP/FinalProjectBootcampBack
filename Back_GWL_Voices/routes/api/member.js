const express = require('express');
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

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Users.getById(id);
        if (!response) return res.status(404).json({ error: "Id no exist" });
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;



