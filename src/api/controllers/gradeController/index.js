const resWrap = require('../../../helpers/Response-wrapper');

const GradeController = require('./gradeController');

module.exports = new GradeController(resWrap);