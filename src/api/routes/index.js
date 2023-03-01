const adminRoutes = require('./adminRoutes');
const moduleRoutes = require('./moduleRoutes');
const baseRoutes = require('./baseRoutes');
const studentRoutes = require('./studentRoutes');
const lecturerRoutes = require('./lecturerRoutes');
// const secretaryRoutes = require('./secretaryRoutes');
const testRoutes = require('./testRoutes');
const gradeRoutes = require('./gradeRoutes');
const goalRoutes = require('./goalRoutes');
const progressRoutes = require('./progressRoutes');
const funderRoutes = require('./funderRoutes');
const tutorialRoutes = require('./tutorialRoutes');

module.exports = (router) => {
    adminRoutes(router);
    moduleRoutes(router);
    baseRoutes(router);
    studentRoutes(router);
    lecturerRoutes(router);
    // secretaryRoutes(router);
    testRoutes(router);
    gradeRoutes(router);
    goalRoutes(router);
    progressRoutes(router);
    funderRoutes(router);
    tutorialRoutes(router);
};