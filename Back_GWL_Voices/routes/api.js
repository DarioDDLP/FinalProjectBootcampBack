const app = require('../app');
const loginRouter = require('./api/login');
const registerRouter = require('./api/register');
const memberRouter = require('./api/member');
const { checkToken, checkRole } = require('../helpers/middlewares');
const forgotPasswordRouter = require('./api/forgotPassword');
const newPasswordRouter = require('./api/new-password');
const documentationRouter = require('./api/documentation');
const chatRouter = require('./api/chat');
const sendMailRouter = require('./api/sendmail');
const directoryRouter = require('./api/directory');
const messengerRouter = require('./api/messenger');
const calendarRoute = require('./api/calendar');
const merchandisingRoute = require('./api/merchandising')


const router = require('express').Router();

router.use('/login', loginRouter);
router.use('/register', checkToken, registerRouter);
router.use('/member', checkToken, memberRouter);
router.use('/forgot-password', forgotPasswordRouter);
router.use('/new-password', newPasswordRouter);
router.use('/documentation', checkToken, documentationRouter);
router.use('/chat', checkToken, chatRouter);
router.use('/send-email', checkToken, sendMailRouter);
router.use('/directory', checkToken, directoryRouter);
router.use('/messenger', checkToken, messengerRouter);
router.use('/calendar', checkToken, calendarRoute);
router.use('/merchandising', checkToken, merchandisingRoute);

module.exports = router;