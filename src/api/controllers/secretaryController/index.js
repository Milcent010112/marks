const resWrap = require('../../../helpers/Response-wrapper');

const SecretaryController = require('./secretaryController');

module.exports = new SecretaryController(resWrap);