const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');
const parseRegex = require('regex-parser');

const Lecturer = require('./Lecturer');

module.exports = new Lecturer(mongoose, QueryBuilder, parseRegex);