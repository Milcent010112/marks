const gradeController = require('../controllers/gradeController');
const gradeServices = require('../../services/Grade');

module.exports = (router) => {
    router.post('/grades/add', gradeController.addGrade(gradeServices.addGrade))
    router.post('/grades/fetch', gradeController.getStudentsGrades(gradeServices.getStudentsGrades))
    router.post('/grades/fetch/student', gradeController.getGrades(gradeServices.getGrades))
    router.post('/grades/fetch/secretary', gradeController.getSecretaryGrades(gradeServices.getSecretaryGrades))
    router.post('/grades/fetch/all', gradeController.getAll(gradeServices.getAll))
    router.post('/grades/search/admin', gradeController.searchAdminGrades(gradeServices.searchAdminGrades))
    router.post('/grades/search/lecturer', gradeController.searchLecturerGrades(gradeServices.searchLecturerGrades))

    // router.post('/grade/:gradeId/delete-request', gradeController.requestDeletion(gradeServices.requestDeletion))
    router.post('/grade/:gradeId/edit', gradeController.editGrade(gradeServices.editGrade))
    // router.post('/grade/:gradeId/publish', gradeController.publishGrade(gradeServices.publishGrade))
    router.post('/grade/:gradeId/delete', gradeController.deleteGrade(gradeServices.deleteGrade))
}