const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');
const parseRegex = require('regex-parser');

const Test = require('./Test');

module.exports = new Test(mongoose, QueryBuilder, parseRegex);