const router = require('express').Router();
const Calendar = require('../../models/calendar.model');

router.get('/', async (req, res) => {
    try {
        const response = await Calendar.getAll()
        console.log(response);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.post('/', async (req, res) => {
    const newEvent = req.body;
    try {
        const response = await Calendar.createEvent(newEvent);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await Calendar.removeEvent(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;