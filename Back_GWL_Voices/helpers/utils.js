const jwt = require('jsonwebtoken');
const dayjs = require("dayjs");

/**
 * @description Executes an sql statement and returns an array/object with the result
 * @param {*} sql 
 * @param {*} arr 
 * @returns return a array of query
 */

const executeQuery = (sql, arr = []) => {
    return new Promise((resolve, reject) => {
        db.query(sql, arr, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

/**
 * @description Executes an SQL statement and returns a single element or null if it does not exist
 * @param {*} sql 
 * @param {*} arr
 * @returns return a first value or null of query.
 */

const executeQueryOne = (sql, arr = []) => {
    return new Promise((resolve, reject) => {
        db.query(sql, arr, (err, result) => {
            if (err) reject(err);
            resolve(result.length === 0 ? null : result[0]);
        });
    });
}

/**
 * @description Create token for user.
 * @param {*} user 
 * @return return token
 */

const createToken = (user) => {
    const obj = {
        user_id: user.id,
        exp_date: dayjs().add(8, "hours").unix(),
    }
    return jwt.sign(obj, process.env.TOKEN_DECODE,);
}

/**
 * @description Create reset token for user.
 * @param {*} user 
 * @return return reset token.
 */

const createResetToken = (user) => {
    const obj = {
        user_id: user.id,
        exp_date: dayjs().add(1, "hours").unix(),
    }
    return jwt.sign(obj, process.env.TOKEN_DECODE,);
}
module.exports = { executeQuery, executeQueryOne, createToken, createResetToken };