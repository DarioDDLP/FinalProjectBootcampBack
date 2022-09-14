const { executeQuery, executeQueryOne } = require('../helpers/utils');

const create = ({ user_id, category_id, date, route, name }) => {
    return executeQuery('insert into documentation (user_id, category_id, date, route, name) values (?, ?, ?, ?, ?)', [user_id, category_id, date, route, name]);
};

const getAll = () => {
    return executeQuery(`SELECT d.id, CONCAT(u.name, ' ', u.surname ) username, d.name as "filename", d.route as "route", d.date as "date", d.status as "status", dc.category as "category" FROM documentation as d JOIN users as u on u.id = d.user_id Join doc_category as dc on dc.id = d.category_id`, [])
}

const getNotApproved = () => {
    return executeQuery(`SELECT d.id, CONCAT(u.name, ' ', u.surname ) username, d.name as "filename", d.route as "route", d.date as "date", d.status as "status", dc.category as "category" FROM documentation as d JOIN users as u on u.id = d.user_id Join doc_category as dc on dc.id = d.category_id WHERE d.status = false`, []);
}

const getApproved = () => {
    return executeQuery(`SELECT d.id, CONCAT(u.name, ' ', u.surname ) username, d.name as "filename", d.route as "route", d.date as "date", d.status as "status", dc.category as "category" FROM documentation as d JOIN users as u on u.id = d.user_id Join doc_category as dc on dc.id = d.category_id WHERE d.status = true`, []);
}

const changeStatus = (id, status) => {
    return executeQuery('update documentation set status = ? where id = ?', [status, id])
}

module.exports = { create, getAll, getApproved, getNotApproved, changeStatus };