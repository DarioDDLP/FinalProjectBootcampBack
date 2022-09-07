const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getByEmail = (email) => {

    return executeQueryOne('select * from users where email = ?', [email]);
};

const getAll = () => {
    return executeQuery('select * from users')
}

const getById = (id) => {
    return executeQueryOne('select * fromm users where id = ?', [id])
}

module.exports = { getByEmail, getAll, getById };