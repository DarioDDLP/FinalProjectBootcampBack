const app = require('../app');
const loginRouter = require('./api/login');
const router = require('express').Router();

router.use('/login', loginRouter);

module.exports = router;