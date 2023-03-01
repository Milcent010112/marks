const resWrap = require('../../../helpers/Response-wrapper');

const testController = require('./testController');

module.exports = new testController(resWrap);