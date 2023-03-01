const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');
const parseRegex = require('regex-parser');

const Goal = require('./Goal');

module.exports = new Goal(mongoose, QueryBuilder, parseRegex);