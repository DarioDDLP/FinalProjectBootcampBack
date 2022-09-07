const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getByEmail = (email) => {

    return executeQueryOne('select * from users where email = ?', [email]);
};

const getAll = () => {
    return executeQuery('select * from users')
}

module.exports = { getByEmail, getAll };