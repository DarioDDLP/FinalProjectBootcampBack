const express = require('express');
const router = express.Router();

const Users = require('../../models/users.model')

/* GET login listing. */
router.get('/', async (req, res) => {

    res.send('get api/documentation funciona')
});

router.get('/:id', async (req, res) => {

    res.send('get api/documentation/:id funciona')
});

router.post('/', async (req, res) => {

    res.send('post api/documentation funciona')
});

router.put('/:id', async (req, res) => {

    res.send('put api/documentation/:id funciona')
});





module.exports = router;