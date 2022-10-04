const router = require('express').Router();
const fs = require('fs');
const { transporter } = require('../../config/mailer');
const User = require('../../models/users.model');
const Menrchandising = require('../../models/merchandising.model');

const multer = require('multer');
const upload = multer({ dest: 'public/products' });

router.post('/enquire/:id', async (req, res) => {
    const user = req.user;
    const { text, subject, eventInfo, deliveryAddress, date, quantity } = req.body
    const { id } = req.params
    try {
        const product = await Menrchandising.getById(id)
        const admins = await User.getAdmins();
        const adminsMail = admins.map((value) => value.email);
        adminsMail.push(user.email);
        await transporter.sendMail({
            from: `${user.name} ${user.surname}`, // sender address
            to: `${adminsMail}`, // list of receivers
            subject: subject, // Subject line
            // text: "Hello world?", // plain text body
            html: `<h1>${user.name} ${user.surname} is requesting information\n"${product.category}: ${product.title}"</h1><h2>Event info: ${eventInfo}</h2><h2>Date event: ${date}</h2><h2>Delivery Address: ${deliveryAddress}</h2><h2>Quantity: ${quantity}</h2><br><p>${text}</p>`, // html body
        });
        res.status(200).json({ success: 'ok' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const response = await Menrchandising.getAll();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/get-filtered', async (req, res) => {
    const { category } = req.body;
    try {
        const response = await Menrchandising.getByCategory(category);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/id/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await Menrchandising.getById(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
        const response = await Menrchandising.logicDrop(id);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', upload.single('photo'), async (req, res, next) => {
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
        req.body.photo = newName;
    } else req.body.photo = req.user.photo;
    try {
        const response = await Menrchandising.create(req.body);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/get-category', async (req, res) => {
    try {
        const response = await Menrchandising.getCategory();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;