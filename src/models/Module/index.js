const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');
const parseRegex = require('regex-parser');

const Module = require('./Module');

module.exports = new Module(mongoose, QueryBuilder, parseRegex);