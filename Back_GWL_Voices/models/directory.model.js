const { executeQuery, executeQueryOne } = require('../helpers/utils');





const getAll = () => {
    return executeQuery(`select * from directory where status = true`, [])
}

const getById = (id) => {
    return executeQueryOne(`select * from directory where id = ?`, [id])
}


const changeStatus = (id) => {
    return executeQuery('update directory set status = false where id = ?', [id])
}

const createContact = ({ name, surname, phone, email, role }) => {
    return executeQuery('insert into directory (name, surname, phone, email, role) values (?, ?, ?, ?, ?)', [name, surname, phone, email, role])
}

module.exports = { getById, getAll, changeStatus, createContact };


