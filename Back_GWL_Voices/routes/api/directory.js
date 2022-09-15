const express = require('express');
const router = express.Router();

const Directory = require('../../models/directory.model')


router.get('/', async (req, res) => {

    try {
        const response = await Directory.getAll()
        res.status(200).send(response)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params


    try {
        const response = await Directory.getById(id)
        res.status(200).json(response)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});


router.post('/register', async (req, res) => {
    console.log(req.body)
    const contact = req.body


    try {
        const response = await Directory.createContact(contact)
        res.status(200).json(response)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }


});

router.post('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await Directory.changeStatus(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

});



module.exports = router;
