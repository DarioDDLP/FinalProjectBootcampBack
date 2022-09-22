const router = require('express').Router();
const Messenger = require('../../models/messenger.model');

router.get('/', async (req, res) => {
    try {
        const response = await Messenger.getAll();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.post('/', async (req, res) => {
    const { user_id, title, created_at } = req.body
    try {
        const response = await Messenger.newThread(title, user_id, created_at)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Messenger.logicDropThread(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message });
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
    const { id } = req.params;
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
    const obj = {
        postId: parseInt(postId),
        text: text,
        created_at: new Date(),
        userId: req.user.id
    }
    try {
        const response = await Messenger.newThreadMessage(obj);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;