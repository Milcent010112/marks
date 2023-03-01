const lecturerController = require('../controllers/lecturerController');
const lecturerServices = require('../../services/Lecturer');

const middleware = require('../../middleware');

module.exports = (router) => {
    // router.get('/l/sign-in', lecturerController.renderSignIn)

    router.get('/l/sign-up', lecturerController.renderSignUp)

    router.get('/l/modules', middleware.authLecturer, lecturerController.renderModules)
    router.get('/l/module/:moduleId/students', middleware.authLecturer, lecturerController.renderStudents)

    router.get('/l/tests-exams', middleware.authLecturer, lecturerController.renderTestsAndExams)
    router.get('/l/grades', middleware.authLecturer, lecturerController.renderGrades)
    router.get('/l/tutorials', middleware.authLecturer, lecturerController.renderTutorials)

    router.post('/lecturers/add', lecturerController.addLecturer(lecturerServices.addLecturer))
    router.post('/lecturers/fetch', lecturerController.getLecturers(lecturerServices.getLecturers))
    router.post('/lecturers/search/admin', lecturerController.searchAdminLecturers(lecturerServices.searchAdminLecturers))

    router.post('/lecturer/sign-in', lecturerController.signIn(lecturerServices.signIn))
    router.post('/lecturer/fetch/modules', lecturerController.getModules)

    router.post('/lecturer/:lecturerId/fetch', lecturerController.getLecturer(lecturerServices.getLecturer))
    router.post('/lecturer/:lecturerId/delete', lecturerController.deleteLecturer(lecturerServices.deleteLecturer))
    router.post('/lecturer/:lecturerId/edit', lecturerController.editLecturer(lecturerServices.editLecturer))

    router.get('/l/logout', (req, res) => {
        res.clearCookie('_lecturer');

        res.redirect('/sign-in');
    });
}