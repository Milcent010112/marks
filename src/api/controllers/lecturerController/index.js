const resWrap = require('../../../helpers/Response-wrapper');

const LecturerController = require('./lecturerController');

module.exports = new LecturerController(resWrap);