const app = require('../app');
const loginRouter = require('./api/login');
const registerRouter = require('./api/register');
const router = require('express').Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);

module.exports = router;