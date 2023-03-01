const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');
const parseRegex = require('regex-parser');

const Funder = require('./Funder');

module.exports = new Funder(mongoose, QueryBuilder, parseRegex);