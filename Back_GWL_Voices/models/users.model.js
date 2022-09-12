const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getByEmail = (email) => {

    return executeQueryOne('select * from users where email = ?', [email]);
};

const create = ({ name, surname, email, password }) => {
    return executeQuery('insert into users (name, surname, email, password) values (?, ?, ?, ?)', [name, surname, email, password]);
};

const getAll = () => {
    return executeQuery('select * from users')
};

const getById = (id) => {
    return executeQueryOne('select * from users where id = ?', [id])
};

const update = (id, { image, name, surname, email, phone, working_group, postal_address, live_in, }) => {
    return executeQuery('update users set image = ?, name = ?, surname = ?, email = ?, phone = ?, working_group = ?, postal_address = ?, live_in = ? where id = ?', [image, name, surname, email, phone, working_group, postal_address, live_in, id]);
};


const addResetToken = (id, resetToken) => {
    return executeQuery('update users set resetToken = ? where id = ?', [resetToken, id]);
};

const getByResetToken = (resetToken) => {
    return executeQueryOne('select * from users where resetToken = ?', [resetToken]);
};

const updateUserPassword = (id, newPassword) => {
    return executeQuery('update users set password = ? where id = ?', [newPassword, id]);
};

module.exports = { getByEmail, getAll, getById, create, update, addResetToken, getByResetToken, updateUserPassword };
