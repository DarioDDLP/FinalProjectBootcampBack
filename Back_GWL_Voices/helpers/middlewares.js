
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

const checkToken = async (req, res, next) => {

    if (!req.headers['authorization']) {
        return res.status(401).json({ error: 'Token not found' })
    }

    const token = req.headers['authorization'];

    let payload;
    try {
        payload = jwt.verify(token, process.env.TOKEN_DECODE);
        const user = await User.getById(payload.user_id);
        req.user = user
        next();

    } catch (err) {
        res.status(401).json({ error: 'Wrong token' });
    }


}

module.exports = { checkToken }