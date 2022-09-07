const app = require('../app');
const loginRouter = require('./api/login');
const membersRouter = require('./api/member');

const router = require('express').Router();

router.use('/login', loginRouter);
router.use('/member', membersRouter);



module.exports = router;