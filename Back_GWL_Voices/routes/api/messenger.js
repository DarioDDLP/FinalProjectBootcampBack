
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

router.post('/', async (req, res) => {
    const { user_id, title, created_at } = req.body
    console.log(title, user_id, created_at, 'sssssssssssssssssssssssssssss')
    try {
        const response = await Messenger.newThread(title, user_id, created_at)
        console.log(response, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.get('/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const response = await Messenger.getByPostId(postId);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:postId/:id', async (req, res) => {
    const { postId, id } = req.params;
    try {
        const response = await Messenger.logicDropThreadMessage(id)
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/new/:postId', async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body
    console.log(req.user);

    const obj = {
        postId: parseInt(postId),
        text: text,
        created_at: new Date(),
        userId: req.user.id
    }

    console.log(obj)
    try {
        const response = await Messenger.newThreadMessage(obj);
        res.status(200).json(response);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;