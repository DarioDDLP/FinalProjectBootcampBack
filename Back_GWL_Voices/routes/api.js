const app = require('../app');
const loginRouter = require('./api/login');
<<<<<<< HEAD
const registerRouter = require('./api/register');
const router = require('express').Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);
=======
const membersRouter = require('./api/member');

const router = require('express').Router();

router.use('/login', loginRouter);
router.use('/member', membersRouter);


>>>>>>> b8c45bfc35b944803991b7327acee15d9ea08d80

module.exports = router;