const testController = require('../controllers/testController');
const testServices = require('../../services/Test');

module.exports = (router) => {
    router.post('/tests/add', testController.addTest(testServices.addTest))
    router.post('/test/fetch/:testId', testController.getTest(testServices.getTest))
    router.post('/tests/fetch/module', testController.getModuleTests(testServices.getModuleTests))
    router.post('/tests/fetch/lecturer', testController.getLecturerTests(testServices.getLecturerTests))
    router.post('/tests/fetch/student', testController.getStudentTests(testServices.getStudentTests))
    router.post('/tests/fetch/secretary', testController.getSecretaryTests(testServices.getSecretaryTests))
    router.post('/tests/fetch/all', testController.getAll(testServices.getAll))
    router.post('/tests/search/admin', testController.searchAdminTests(testServices.searchAdminTests))
    router.post('/tests/search/lecturer', testController.searchLecturerTests(testServices.searchLecturerTests))
    router.post('/tests/search/student', testController.searchStudentTests(testServices.searchStudentTests))

    // router.post('/test/:testId/publish-request', testController.requestPublish(testServices.requestPublish))
    // router.post('/test/:testId/delete-request', testController.requestDeletion(testServices.requestDeletion))
    // router.post('/test/:testId/publish', testController.publishTest(testServices.publishTest))
    router.post('/test/:testId/delete', testController.deleteTest(testServices.deleteTest))
}