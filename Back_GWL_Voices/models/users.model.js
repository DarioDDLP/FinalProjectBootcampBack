const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getByEmail = (email) => {

    return executeQueryOne('select * from users where email = ?', [email]);
};

const create = ({ name, surname, email, password }) => {
    return executeQuery('insert into users (name, surname, email, password) values (?, ?, ?, ?)', [name, surname, email, password]);
}

module.exports = { getByEmail, create };
const getAll = () => {
    return executeQuery('select * from users')
}

const getById = (id) => {
    return executeQueryOne('select * fromm users where id = ?', [id])
}

module.exports = { getByEmail, getAll, getById };
