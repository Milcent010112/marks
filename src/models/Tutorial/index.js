const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');
const parseRegex = require('regex-parser');

const Tutorial = require('./Tutorial');

module.exports = new Tutorial(mongoose, QueryBuilder, parseRegex);