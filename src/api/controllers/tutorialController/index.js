const resWrap = require('../../../helpers/Response-wrapper');

const tutorialController = require('./tutorialController');

module.exports = new tutorialController(resWrap);