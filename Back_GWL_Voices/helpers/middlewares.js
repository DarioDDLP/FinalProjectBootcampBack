
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const dayjs = require('dayjs');

// Checks if the token is valid.

const checkToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(401).json({ error: 'Token not found' })
    }
    const token = req.headers['authorization'];
    let payload;
    try {
        payload = jwt.verify(token, process.env.TOKEN_DECODE);
        if (payload.exp_date < dayjs().unix()) return res.status(401).json({ error: 'Expired Token' });
        const user = await User.getById(payload.user_id);
        req.user = user
        next();
    } catch (err) {
        res.status(401).json({ error: 'Wrong token' });
    }
}

// Checks if user is admin.

const checkRole = async (req, res, next) => {
    const admin = req.user.admin
    if (admin)
        next();
    else {
        return res.status(401).json({ error: 'Unauthorized user' })
    }
}

module.exports = { checkToken, checkRole }