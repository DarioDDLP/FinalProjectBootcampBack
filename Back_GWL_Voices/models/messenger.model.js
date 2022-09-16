const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery(`select * from threads where status = true`, [])
}

const newThread = (title, user_id, created_at) => {
    return executeQuery('insert into threads (title, user_id, created_at) values (?, ?, ?)', [title, user_id, created_at])
}



module.exports = { getAll, newThread };