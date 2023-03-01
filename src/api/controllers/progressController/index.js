const resWrap = require('../../../helpers/Response-wrapper');

const ProgressController = require('./progressController');

module.exports = new ProgressController(resWrap);