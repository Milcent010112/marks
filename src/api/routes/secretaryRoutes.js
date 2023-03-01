const secretaryController = require('../controllers/secretaryController');
const secretaryServices = require('../../services/Secretary');

const middleware = require('../../middleware');

module.exports = (router) => {
    // router.get('/d/sign-in', secretaryController.renderSignIn)
    router.get('/d/grades', middleware.authSecretary, secretaryController.renderGrades)

    router.get('/d/tests', middleware.authSecretary, secretaryController.renderTests);

    router.post('/secretary/sign-in', secretaryController.signIn(secretaryServices.signIn))
    router.post('/secretaries/add', secretaryController.addSecretary(secretaryServices.addSecretary))
    router.post('/secretaries/fetch', secretaryController.getSecretaries(secretaryServices.getSecretaries))
    router.post('/secretaries/search/admin', secretaryController.searchAdminSecretaries(secretaryServices.searchAdminSecretaries))

    router.get('/d/logout', (req, res) => {
        res.clearCookie('_secretary');

        res.redirect('/sign-in');
    });
}