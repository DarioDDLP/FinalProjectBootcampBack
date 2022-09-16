const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery(`select CONCAT(u.name ,' ', u.surname) as username, t.* from threads as t JOIN users as u on u.id = t.user_id where t.status = true `, [])


}

const newThread = (title, user_id, created_at) => {
    return executeQuery('insert into threads (title, user_id, created_at) values (?, ?, ?)', [title, user_id, created_at])
}



module.exports = { getAll, newThread };