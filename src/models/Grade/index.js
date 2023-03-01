const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');
const parseRegex = require('regex-parser');

const Grade = require('./Grade');

module.exports = new Grade(mongoose, QueryBuilder, parseRegex);