const express = require('express');
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: 'public/documents' });
const router = express.Router();

const Users = require('../../models/users.model');
const Documentation = require('../../models/documentation.model');
const dayjs = require('dayjs');
dayjs().format()



router.post('/', upload.single('document'), async (req, res) => {
    const extension = '.' + req.file.mimetype.split('/')[1];
    const newName = req.file.filename + extension;
    const newPath = req.file.path + extension;
    fs.renameSync(req.file.path, newPath);
    const obj = {
        user_id: req.user.id,
        category_id: parseInt(req.body.category_id),
        date: new Date(),
        route: newName,
        name: req.file.originalname,
        subcategory: req.body.subcategory
    }
    console.log(obj)
    try {
        const response = await Documentation.create(obj);
        res.status(200).json(response);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const response = await Documentation.getAll();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/not-approved', async (req, res) => {
    try {
        const response = await Documentation.getNotApproved();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/approved', async (req, res) => {
    try {
        const response = await Documentation.getApproved();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/change-authorization/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await Documentation.authorization(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await Documentation.getById(id);
        res.status(200).json(response);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await Documentation.logicDelete(id);
        console.log(response);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

// /* GET login listing. */
// router.get('/', async (req, res) => {

//     res.send('get api/documentation funciona')
// });

// router.get('/:id', async (req, res) => {

//     res.send('get api/documentation/:id funciona')
// });



// router.put('/:id', async (req, res) => {

//     res.send('put api/documentation/:id funciona')
// });





module.exports = router;