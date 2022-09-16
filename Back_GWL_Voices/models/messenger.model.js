const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery(`select * from threads where status = true`, [])
}



module.exports = { getAll };