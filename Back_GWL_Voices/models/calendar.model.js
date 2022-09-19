const { executeQuery, executeQueryOne } = require('../helpers/utils');





const getAll = () => {
    return executeQuery(`select * from calendar where status = true`, [])
}

const createEvent = ({ start, end, title, description }) => {
    return executeQuery('insert into calendar (start, end, title, description) values (?, ?, ?, ?)', [start, end, title, description]);
}

const removeEvent = (id) => {
    return executeQuery('update calendar set status = false where id = ?', [id])
}


module.exports = { getAll, createEvent, removeEvent };


