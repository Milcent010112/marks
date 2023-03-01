const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');

const RefreshToken = require('./RefreshToken');

module.exports = new RefreshToken(mongoose, QueryBuilder);