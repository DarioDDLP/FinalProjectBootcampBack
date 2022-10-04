const { executeQuery, executeQueryOne } = require('../helpers/utils');

//Creates queries to messenger table on database.

const getAll = () => {
    return executeQuery(`select CONCAT(u.name ,' ', u.surname) as username, t.* from threads as t JOIN users as u on u.id = t.user_id where t.status = true `, [])
}

const newThread = (title, user_id, created_at) => {
    return executeQuery('insert into threads (title, user_id, created_at) values (?, ?, ?)', [title, user_id, created_at])
}

const getByPostId = (postId) => {
    return executeQuery(`SELECT tm.id, tm.created_at as 'created_at', t.title as 'titlePost', tm.users_id, tm.data as 'text', CONCAT(u.name, ' ', u.surname) as 'username' FROM thread_messages as tm JOIN threads as t on t.id = tm.thread_id  join users as u on tm.users_id = u.id where tm.thread_id = ? and tm.status = 1`, [postId]);
}

const newThreadMessage = ({ postId, text, created_at, userId }) => {
    return executeQuery('insert into thread_messages (thread_id, data, created_at, users_id) values (?, ?, ?, ?)', [postId, text, created_at, userId])
}

const logicDropThreadMessage = (id) => {
    return executeQuery('update thread_messages set status = false where id = ?', [id]);
};

const logicDropThread = (id) => {
    return executeQuery('update threads set status = false where id = ?', [id]);
}

module.exports = { getAll, newThread, getByPostId, newThreadMessage, logicDropThreadMessage, logicDropThread };