const app = require('../app');
const loginRouter = require('./api/login');
const registerRouter = require('./api/register');
const memberRouter = require('./api/member');
const { checkToken } = require('../helpers/middlewares');
const forgotPasswordRouter = require('./api/forgotPassword');
const documentationRouter = require('./api/documentation');
const chatRouter = require('./api/chat');
const router = require('express').Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/member', checkToken, memberRouter);
router.use('/forgot-password', forgotPasswordRouter);
router.use('/documentation', checkToken, documentationRouter);
router.use('/chat', checkToken, chatRouter);

module.exports = router;