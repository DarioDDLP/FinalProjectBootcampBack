const express = require('express');
const router = express.Router();
const Users = require('../../models/users.model')

/* GET login listing. */
router.get('/', async (req, res) => {
    res.send('get api/chat funciona')
});

router.post('/', async (req, res) => {
    res.send('post api/chat funciona')
});

module.exports = router;