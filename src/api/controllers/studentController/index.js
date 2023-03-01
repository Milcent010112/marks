const resWrap = require('../../../helpers/Response-wrapper');

const StudentController = require('./studentController');

module.exports = new StudentController(resWrap);