const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../helpers/utils');
const multer = require('multer');
const upload = multer({ dest: 'public/images' });


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

router.get('/user', async (req, res) => {

    const user = req.user
    try {
        const response = await Users.getById(user.id)
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }


});

router.post('/status-filtered', async (req, res) => {
    let { status } = req.body
    if (status === "1") status = true
    else if (status === "0") status = false
    try {
        const response = await Users.getByStatus(status);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

router.post('/status', async (req, res) => {
    const { id } = req.body;
    try {
        const user = await Users.getById(id);
        if (!user.status) user.status = true
        else if (user.status) user.status = false
        const response = await Users.updateStatus(user.status, id)
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
    }

})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Users.getById(id);
        if (!response) return res.status(404).json({ error: "Id does not exist" });
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', upload.single('image'), async (req, res, next) => {
    const { id } = req.params;
    if (req.file) {
        // Antes de guardar el producto en la base de datos, modificamos la imagen para situarla donde nos interesa
        const extension = '.' + req.file.mimetype.split('/')[1];
        // Obtengo el nombre de la nueva imagen
        const newName = req.file.filename + extension;
        // Obtengo la ruta donde estará, adjuntándole la extensión
        const newPath = req.file.path + extension;
        // Muevo la imagen para que resiba la extensión
        fs.renameSync(req.file.path, newPath);
        // Modifico el BODY para poder incluir el nombre de la imagen en la BD
        req.body.image = newName;
    } else req.body.image = req.user.image;

    try {
        const response = await Users.update(id, req.body);

        res.json(response);
    } catch (err) {
        res.json({ error: err.message });
    }
});



router.post('/new-password', async (req, res) => {
    const newPassword = req.body.newpassword;
    const { id } = req.user;
    if (!newPassword) return res.status(400).json({ message: 'password required' });
    const passwordUpdated = bcrypt.hashSync(newPassword, 12);
    try {
        const user = req.user
        await Users.updateUserPassword(user.id, passwordUpdated);
        res.status(200).json({ message: 'Password has been updated' });
    } catch (err) {
        return res.status(400).json({ message: 'Sometimes goes wrong!' });
    }

})

router.post('/oldpassword', async (req, res) => {
    try {
        const id = req.user.id;
        const { inputPass } = req.body;

        const user = await Users.getById(id);

        const equals = bcrypt.compareSync(inputPass, user.password);
        console.log(equals)
        if (!equals) {
            return res.status(404).json({ error: "Wrong current password" });
        }

        res.status(200).send(user)

    } catch (error) {
        res.status(404).send({ error: 'Wrong current password!!!!' })

    }


});
module.exports = router;





