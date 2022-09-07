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

// router.get('/', async (req, res) => {
//     try {
//         ocnst { id } = er.
//         const users = await Users.getAll();
//         console.log(users)
//         res.send(users)
//     } catch (error) {
//         res.send({ error: err.message })
//     }

// });

module.exports = router;



