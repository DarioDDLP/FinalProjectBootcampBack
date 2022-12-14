const { executeQuery, executeQueryOne } = require('../helpers/utils');

//Creates queries to products table on database.

const getAll = () => {
    return executeQuery(`select * from products where status = true`, [])
}

const getById = (id) => {
    return executeQueryOne(`select * from products where status = true and id = ?`, [id])
}

const logicDrop = (id) => {
    return executeQuery('update products set status = false where id = ?', [id]);
}

const create = ({ category, title, photo, description }) => {
    return executeQuery('insert into products (category, title, photo, description) values (?, ?, ?, ?)', [category, title, photo, description]);
};

const getCategory = () => {
    return executeQuery('SELECT distinct category FROM products where status = true', []);
};

const update = (id, { category, title, photo, description }) => {
    return executeQuery('update products set category = ?, title = ?, photo = ?, description = ? where id = ?', [category, title, photo, description, id]);
};

const getByCategory = (category) => {
    return executeQuery(`select * from products where status = true and category = ?`, [category])
}
module.exports = { getAll, getById, logicDrop, create, getCategory, update, getByCategory };