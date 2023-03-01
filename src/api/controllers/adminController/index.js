const resWrap = require('../../../helpers/Response-wrapper');

const AdminController = require('./adminController');

module.exports = new AdminController(resWrap);