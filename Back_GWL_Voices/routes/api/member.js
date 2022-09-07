const express = require('express');
const { createToken } = require('../../helpers/utils');
const router = express.Router();

const Users = require('../../models/users.model')

/* GET login listing. */
router.get('/', async (req, res) => {
    try {
        const users = await Users.getAll();
        res.send(users)
    } catch (error) {
        res.send({ error: err.message })
    }

});

router.get('/', async (req, res) => {
    try {
        console.log(req)
        const users = await Users.getAll();
        console.log(users)
        res.send(users)
    } catch (error) {
        res.send({ error: err.message })
    }

});

module.exports = router;



