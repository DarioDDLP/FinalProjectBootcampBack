const app = require('../app');
const loginRouter = require('./api/login');
const registerRouter = require('./api/register');
const memberRouter = require('./api/member');
const router = require('express').Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/member', memberRouter);

module.exports = router;