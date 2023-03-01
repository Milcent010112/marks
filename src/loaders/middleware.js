const middleware = require('../middleware');

const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.use(cookieParser());
    app.use(middleware.loadAdminDetails);
    app.use(middleware.loadSecretaryDetails);
    app.use(middleware.loadLecturerDetails);
    app.use(middleware.loadStudentDetails);
};