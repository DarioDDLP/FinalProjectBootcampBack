const router = require('express').Router();
const Menrchandising = require('../../models/merchandising.model');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'public/products' });

router.get('/', async (req, res) => {
    try {
        const response = await Menrchandising.getAll();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


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
    console.log(req.file)
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
        res.json(response);
    } catch (err) {
        res.json({ error: err.message });
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

router.put('/:id', async (req, res) => {
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
        const response = Menrchandising.update(id, req.body);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
module.exports = router;