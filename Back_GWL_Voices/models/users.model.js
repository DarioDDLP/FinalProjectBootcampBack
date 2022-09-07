const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getByEmail = (email) => {

    return executeQueryOne('select * from users where email = ?', [email]);
};

const create = ({ name, surname, email, password }) => {
    return executeQuery('insert into users (name, surname, email, password) values (?, ?, ?, ?)', [name, surname, email, password]);
}

const getAll = () => {
    return executeQuery('select * from users')
}

const getById = (id) => {
    return executeQueryOne('select * from users where id = ?', [id])
}

module.exports = { getByEmail, getAll, getById, create };
