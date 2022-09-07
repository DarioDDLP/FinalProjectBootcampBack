const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getByEmail = (email) => {

    return executeQueryOne('select * from users where email = ?', [email]);
};

<<<<<<< HEAD
const create = ({ name, surname, email, password }) => {
    return executeQuery('insert into users (name, surname, email, password) values (?, ?, ?, ?)', [name, surname, email, password]);
}

module.exports = { getByEmail, create };
=======
const getAll = () => {
    return executeQuery('select * from users')
}

const getById = (id) => {
    return executeQueryOne('select * fromm users where id = ?', [id])
}

module.exports = { getByEmail, getAll, getById };
>>>>>>> b8c45bfc35b944803991b7327acee15d9ea08d80
