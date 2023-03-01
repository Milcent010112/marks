const { mongoose } = require('../../config/database');
const QueryBuilder = require('../../helpers/Query-builder');
const parseRegex = require('regex-parser');

const Student = require('./Student');

module.exports = new Student(mongoose, QueryBuilder, parseRegex);