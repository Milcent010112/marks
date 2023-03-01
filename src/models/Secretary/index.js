const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');
const parseRegex = require('regex-parser');

const Secretary = require('./Secretary');

module.exports = new Secretary(mongoose, QueryBuilder, parseRegex);