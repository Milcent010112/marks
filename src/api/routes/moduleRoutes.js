const moduleController = require('../controllers/moduleController');
const moduleServices = require('../../services/Module');

module.exports = (router) => {
    router.post('/modules/add', moduleController.addModule(moduleServices.addModule))
    router.post('/modules/fetch', moduleController.getModules(moduleServices.getModules))
    router.post('/modules/fetch/student', moduleController.getStudentModules(moduleServices.getStudentModules))
    router.post('/modules/search/admin', moduleController.searchAdminModules(moduleServices.searchAdminModules))
    router.post('/module/:moduleId/fetch', moduleController.getModule(moduleServices.getModule))
    router.post('/module/:moduleId/delete', moduleController.deleteModule(moduleServices.deleteModule))
    router.post('/module/:moduleId/edit', moduleController.editModule(moduleServices.editModule))
    router.post('/module/:moduleId/student/goal', moduleController.getStudentGoalReport(moduleServices.getStudentGoalReport))
}