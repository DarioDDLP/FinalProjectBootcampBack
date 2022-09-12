const router = require('express').Router();

router.post('/:id', async (req, res) => {
    const { id } = req.params
    console.log(id);
    res.json({ 'hola': 'hola' });
})

module.exports = router;