var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/', function (req, res) {
    res.status(200).json({ "prueba": "test" });
});

module.exports = router;
