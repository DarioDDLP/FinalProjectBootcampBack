const { executeQuery, executeQueryOne } = require('../helpers/utils');

const create = ({ user_id, category_id, date, route, name, subcategory }) => {
    return executeQuery('insert into documentation (user_id, category_id, date, route, name, subcategory) values (?, ?, ?, ?, ?, ?)', [user_id, category_id, date, route, name, subcategory]);
};

const getById = (id) => {
    return executeQuery(`SELECT d.id, CONCAT(u.name, ' ', u.surname ) username, d.name as "filename", d.route as "route", d.date as "date", d.subcategory as "subcategory", d.status as "status", dc.category as "category" FROM documentation as d JOIN users as u on u.id = d.user_id Join doc_category as dc on dc.id = d.category_id WHERE d.status = true and u.id = ? ORDER by d.date DESC`, [id])
}

const getNotApproved = () => {
    return executeQuery(`SELECT d.id, CONCAT(u.name, ' ', u.surname ) username, d.name as "filename", d.route as "route", d.date as "date", d.subcategory as "subcategory", d.status as "status", dc.category as "category" FROM documentation as d JOIN users as u on u.id = d.user_id Join doc_category as dc on dc.id = d.category_id WHERE d.authorization = false and d.status = true ORDER by d.date DESC`, []);
}

const getApproved = () => {
    return executeQuery(`SELECT u.id as 'user_id', d.id, CONCAT(u.name, ' ', u.surname ) username, d.name as "filename", d.route as "route", d.date as "date", d.subcategory as "subcategory", d.status as "status", dc.category as "category" FROM documentation as d JOIN users as u on u.id = d.user_id Join doc_category as dc on dc.id = d.category_id WHERE d.authorization = true and d.status = true and category_id = 1 ORDER by d.date DESC`, []);
}

const authorization = (id) => {
    return executeQuery('update documentation set authorization = true where id = ?', [id])
}

const logicDelete = (id) => {
    return executeQuery('update documentation set status = false where id = ?', [id])
}

module.exports = { create, getApproved, getNotApproved, authorization, logicDelete, getById };