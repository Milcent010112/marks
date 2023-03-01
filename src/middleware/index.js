const jwt = require('../helpers/Jwt');

class Middleware {
    constructor () {
        if (Middleware.instance == null)
            Middleware.instance = this;

        return Middleware.instance;
    };

    authAdmin = (req, res, next) => {
        if (!req.adminDetails)
            return res.redirect('/sign-in');

        next();
    }

    authStudent = (req, res, next) => {
        if (!req.studentDetails)
            return res.redirect('/sign-in');

        next();
    }

    authLecturer = (req, res, next) => {
        if (!req.lecturerDetails)
            return res.redirect('/sign-in');

        next();
    }

    authSecretary = (req, res, next) => {
        if (!req.secretaryDetails)
            return res.redirect('/sign-in');

        next();
    }

    loadAdminDetails = (req, res, next) => {
        if (!req.cookies || req.cookies && !req.cookies['_admin'])
            return next();

        jwt.verify(req.cookies['_admin'].jwtAccess, (adminDetails) => {
            req.adminDetails = adminDetails;
            res.locals.adminDetails = adminDetails;
        });

        next();
    }

    loadSecretaryDetails = (req, res, next) => {
        if (!req.cookies || req.cookies && !req.cookies['_secretary'])
            return next();

        jwt.verify(req.cookies['_secretary'].jwtAccess, (secretaryDetails) => {
            req.secretaryDetails = secretaryDetails;
            res.locals.secretaryDetails = secretaryDetails;
        });

        next();
    }

    loadLecturerDetails = (req, res, next) => {
        if (!req.cookies || req.cookies && !req.cookies['_lecturer'])
            return next();

        jwt.verify(req.cookies['_lecturer'].jwtAccess, (lecturerDetails) => {
            req.lecturerDetails = lecturerDetails;
            res.locals.lecturerDetails = lecturerDetails;
        });

        next();
    }

    loadStudentDetails = (req, res, next) => {
        if (!req.cookies || req.cookies && !req.cookies['_student'])
            return next();

        jwt.verify(req.cookies['_student'].jwtAccess, (studentDetails) => {
            req.studentDetails = studentDetails;
            res.locals.studentDetails = studentDetails;
        });

        next();
    }
};

module.exports = new Middleware();