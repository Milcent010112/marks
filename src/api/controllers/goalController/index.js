const resWrap = require('../../../helpers/Response-wrapper');

const GoalController = require('./goalController');

module.exports = new GoalController(resWrap);