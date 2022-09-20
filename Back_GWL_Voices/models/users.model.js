const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getByEmail = (email) => {

    return executeQueryOne('select * from users where email = ?', [email]);
};

const create = ({ name, surname, email, password, image }) => {
    return executeQuery('insert into users (name, surname, email, password, image) values (?, ?, ?, ?, ?)', [name, surname, email, password, image]);
};

const getAll = () => {
    return executeQuery('SELECT id, image, name, surname, email, phone, working_group, postal_address, live_in, admin, status, resetToken from users ORDER BY name ASC ')
};

const getById = (id) => {
    return executeQueryOne('SELECT id, image, name, surname, email, phone, working_group, postal_address, live_in, admin, status, password, resetToken from users where id = ?', [id])
};

const getByStatus = (status) => {
    return executeQuery('Select * from users where status = ?', [status])
}

const update = (id, { image, name, surname, email, phone, working_group, postal_address, live_in, }) => {
    return executeQuery('update users set image = ?, name = ?, surname = ?, email = ?, phone = ?, working_group = ?, postal_address = ?, live_in = ? where id = ?', [image, name, surname, email, phone, working_group, postal_address, live_in, id]);
};

const updateStatus = (status, id) => {
    return executeQuery('update users set status = ? where id = ?', [status, id]);
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

const getAdmins = () => {
    return executeQuery('SELECT id, image, name, surname, email, phone, working_group, postal_address, live_in, admin, status, resetToken from users where admin = true ORDER BY name ASC ')
};

module.exports = { getByEmail, getAll, getById, create, update, addResetToken, getByResetToken, updateUserPassword, updateStatus, getByStatus, getAdmins };
