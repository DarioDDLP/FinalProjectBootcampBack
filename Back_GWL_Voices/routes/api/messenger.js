
const { body, validationResult } = require('express-validator');

const router = require('express').Router();
const Messenger = require('../../models/messenger.model');


router.get('/', async (req, res) => {

    try {
        const response = await Messenger.getAll();
        console.log(response);
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});


module.exports = router;