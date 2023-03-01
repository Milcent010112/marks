const adminController = require('../controllers/adminController');
const adminServices = require('../../services/Admin');

const middleware = require('../../middleware');

module.exports = (router) => {
    // router.get('/a/sign-in', adminController.renderSignIn);
    router.get('/a/modules', middleware.authAdmin, adminController.renderModules);

    router.get('/a/students', middleware.authAdmin, adminController.renderStudents);
    router.get('/a/lecturers', middleware.authAdmin, adminController.renderLecturers);
    // router.get('/a/secretaries', middleware.authAdmin, adminController.renderSecretaries);
    router.get('/a/funders', middleware.authAdmin, adminController.renderFunders);
    router.get('/a/tests', middleware.authAdmin, adminController.renderTests);
    router.get('/a/grades', middleware.authAdmin, adminController.renderGrades);
    router.get('/a/goals', middleware.authAdmin, adminController.renderGoals);

    router.get('/a/semester', middleware.authAdmin, (req, res) => {
        res.render('admin/semester', {
            page: {
                title: 'Semester'
            }
        })
    });

    router.get('/a/logout', (req, res) => {
        res.clearCookie('_admin');

        res.redirect('/sign-in');
    });

    router.post('/admin/sign-in', adminController.signIn(adminServices.signIn))
};